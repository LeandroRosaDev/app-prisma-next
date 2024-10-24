// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}
