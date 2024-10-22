"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      setError(data.error || "Failed to create account");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">Cadastrar-se</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="mb-4"
        />
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
          Cadastrar
        </Button>
      </form>
      <div className="flex gap-2 justify-between w-full max-w-sm mt-4">
        <Link href="/login">Login</Link>
        <Link href="/esqueci-senha">Esqueceu a senha?</Link>
      </div>
    </div>
  );
}
