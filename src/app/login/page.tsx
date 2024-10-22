// src/app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      // Redirecionar para a página inicial
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mb-4">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mb-4"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mb-6"
        />
        <Button type="submit" className="w-full bg-red-800 hover:bg-red-900">
          Login
        </Button>
      </form>
      <div className="flex gap-2 justify-between w-full max-w-sm">
        <Link href="/cadastro">Cadastrar-se</Link>
        <Link href="/esqueci-senha">Esqueceu a senha?</Link>
      </div>
    </div>
  );
}
