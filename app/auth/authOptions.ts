import {PrismaAdapter} from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import GoogleProvider from 'next-auth/providers/google';
import {DefaultUser, NextAuthOptions} from 'next-auth';
import {Role} from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      oid: string;
      role?: Role;
    };
  }
}

const authOptions: NextAuthOptions = {
  callbacks: {
    async session({session, token}) {
      if (session.user && token) {
        // Assign user id from token
        session.user.id = token.sub!;

        // Assuming roles are fetched from the database
        const user = await prisma.user.findUnique({where: {id: token.sub}});
        if (user && user.role) {
          session.user.role = user.role;
        }
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;
