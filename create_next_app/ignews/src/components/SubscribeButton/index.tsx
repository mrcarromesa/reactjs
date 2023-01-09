import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';
import styles from './styles.module.scss';

const SubscribeButton: React.FC = () => {

  const { status, data } = useSession();
  const router = useRouter();

  const handleSubscribe = useCallback(async () => {
    console.log(status);
    if (String(status) !== 'authenticated') {
      // comentar?
      signIn('github');
      return;
    }
    console.log('status',status)

    if (data?.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      const { data } = await api.post(`/subscribe`);

      const { sessionId } = data;
      
      console.log('sessionId',sessionId);


      setTimeout(async () => {
        const stripe = await getStripeJS();
  
        await stripe.redirectToCheckout({
          sessionId
        });
        alert('Foi');
      }, 1000);


    } catch (err) {
      alert(err.message);
    }

  }, [status]);

  return (
    <button 
      type="button" 
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}

export default SubscribeButton;