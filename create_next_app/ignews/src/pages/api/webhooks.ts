import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks: Buffer[] = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "checkout.session.completed",
  // "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const buf = await buffer(req);
  const secret = req.headers["stripe-signature"]; // conforme documentação do stripe recebemos um header com o nome stripe-signature para previnir de alguém chamar essa rota para outros fins

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      secret,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  const { type } = event;

  if (relevantEvents.has(type)) {
    try {
      switch (type) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = event.data.object as Stripe.Subscription;

          await saveSubscription(
            subscription.id, 
            subscription.customer.toString(),
            false
          );

          break;
        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          await saveSubscription(
            checkoutSession.subscription.toString(), 
            checkoutSession.customer.toString(),
            true);

          break;
        default:
          throw new Error(`Unexpected event type: ${type}`);
      }
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  return res.json({ received: true });
};
