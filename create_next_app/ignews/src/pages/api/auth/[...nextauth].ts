import { query as q } from 'faunadb';
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from '../../../services/fauna';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user,user:email',
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(data) {

      try {

        // Cria usuário apenas se não encontrar na tabela
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(data.user.email)
                )
              )
            ),
            q.Create(q.Collection('users'), {
              data: { email: data.user.email },
            }),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(data.user.email)
              )
            )
          ),
        );

        // await fauna.query(q.Create(q.Collection('users'), {
        //   data: { email: data.user.email },
        // }));
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }

    },
  }
})