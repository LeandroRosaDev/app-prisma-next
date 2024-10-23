import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/login/LogoutButton";
import TrocaSenhaButton from "@/components/login/TrocaSenhaButton";
import Link from "next/link";

export default async function HomePage() {
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
