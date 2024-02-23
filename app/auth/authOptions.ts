import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import GoogleProvider from "next-auth/providers/google";
import {NextAuthOptions} from "next-auth";
import type { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & { oid: string };
  }
}


const authOptions: NextAuthOptions = {
  callbacks: {
    async session({session, token}) {
      session.user && (session.user.id = token.sub!)
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: 'jwt'
  }
}

export default authOptions;