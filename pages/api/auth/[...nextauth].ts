import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    theme: {
        logo: "/next.svg",
    },
    pages: {
        signIn: "/authentication",
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!existingUser) return null;
                const passwordMatch = compare(
                    credentials.password,
                    existingUser.password
                );

                if (!passwordMatch) return null;

                return {
                    ...existingUser,
                    name: existingUser.username,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },

    // callbacks: {
    //     async session({ session, user }) {
    //         session.user.id = user.id;
    //         session.user.image = user.image;
    //         return session;
    //     },
    // },
    secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
