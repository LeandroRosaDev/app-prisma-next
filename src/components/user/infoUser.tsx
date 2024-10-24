import Image from "next/image";
import img from "@/PerfilImg.svg";
import { useSession } from "next-auth/react";

export default function InfoUser() {
  const { data: session } = useSession();

  return (
    <div className="flex gap-2 items-center">
      <div>
        <h1 className="text-gray-600 font-bold text-xl">
          {session?.user?.name}
        </h1>
        <h1 className="text-gray-600 font-bold text-xs">
          {session?.user?.email}
        </h1>
      </div>
      <Image
        src={img}
        width={50}
        height={50}
        alt="Imagem logo"
        className="rounded-full"
      />
    </div>
  );
}
