"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return <div onClick={() => signOut({ callbackUrl: "/login" })}>Sair</div>;
}
