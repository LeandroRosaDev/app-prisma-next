import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Email não encontrado.");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Verifique a sua senha e tente novamente.");
        }

        // Retornar o id como string e incluir o role do usuário
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role, // Inclua o role como parte do retorno do user
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Atualizar o JWT com o role do banco de dados
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        token.role = dbUser?.role || "USER"; // Atualizar o JWT com o role do banco de dados
      }
      return token;
    },
    // Adicionar o role à sessão
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string; // Certifique-se de fazer o cast corretamente
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
