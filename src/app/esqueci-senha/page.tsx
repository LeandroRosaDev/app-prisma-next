"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/esqueci-senha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Um e-mail foi enviado para redefinir sua senha.");
    } else {
      setMessage(data.error || "Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">Esqueci Minha Senha</h1>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          required
          className="mb-4 "
        />
        <Button type="submit" className="bg-red-800 hover:bg-red-900 w-full">
          {" "}
          Enviar link de redefinição
        </Button>
      </form>
      <div className="flex gap-2 justify-between w-full max-w-sm mt-4">
        <Link href="/login">Login</Link>
        <Link href="/cadastro">Cadastrar-se</Link>
      </div>
    </div>
  );
}
