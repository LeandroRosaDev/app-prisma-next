// src/app/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Perfil() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1>Você não está autenticado</h1>
        <p>Redirecionando para a página de login...</p>
        <meta httpEquiv="refresh" content="2; url=/login" />
      </div>
    );
  }

  return (
    <div className="flex justify-between m-4">
      <div>
        <h1>Bem-vindo, {session.user?.name}!</h1>
        <h1>{session.user?.email}</h1>
      </div>
    </div>
  );
}
