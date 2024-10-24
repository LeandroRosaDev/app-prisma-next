import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import img from "@/PerfilImg.svg";

export default async function MenuSuspenso() {
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
    <div className="flex m-10">
      <div>
        <h1 className="text-gray-600 font-bold text-3xl ">Painel</h1>
        <span className="text-gray-600 font-bold text-xs">24/10/2024</span>
      </div>
      <div className="flex gap-2 w-full justify-end items-center">
        <div>
          <h1 className="text-gray-600 font-bold text-xl">
            {session.user?.name}
          </h1>
          <h1 className="text-gray-600 font-bold text-xs">
            {session.user?.email}
          </h1>
        </div>
        <Image src={img} width={50} height={50} alt="Imagem logo" />
      </div>
    </div>
  );
}
