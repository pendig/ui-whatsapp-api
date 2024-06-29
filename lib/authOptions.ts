import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, {
            method: 'POST',
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (!res.ok) {
            return null;
          }

          const user = await res.json();

          const updatedUser = {
            ...user,
            access_token: user.token,
          };

          if (updatedUser) {
            return Promise.resolve(updatedUser);
          }
          return null;
        } catch (error) {
          console.error('Error in authorize:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (account) {
        token.account = {
          ...account,
          access_token: user.access_token,
        };
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account.provider === 'google') {
      }
      return true;
    },
    async session({ session, user, token }: any) {
      session.accessToken = token.account.access_token;
      const provider = token.account.provider;
      if (provider === 'google') {
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}`;
    },
  },
};
