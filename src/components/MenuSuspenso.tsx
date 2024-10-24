"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import InfoUser from "./user/infoUser";

export default function MenuSuspenso() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("pt-BR");
      setCurrentTime(formattedTime);
    };

    // Atualiza a cada segundo
    const timer = setInterval(updateTime, 1000);

    // Chama a função imediatamente para não esperar 1 segundo para mostrar o tempo correto
    updateTime();

    return () => clearInterval(timer);
  }, []);

  const hideMenu =
    pathname === "/login" ||
    pathname === "/cadastro" ||
    pathname === "/esqueci-senha" ||
    pathname === "/erro-acesso";

  // Define o título da página baseado no pathname
  const getPageTitle = () => {
    if (pathname === "/cliente/listar") return "Lista de Clientes";
    if (pathname === "/cliente/adicionar") return "Adicionar Clientes";
    if (pathname === "/admin") return "Área do Administrador";
    return "Painel";
  };

  const formattedDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      {!hideMenu && (
        <div className="flex justify-between items-center m-6 mt-10">
          <div>
            <h1 className="text-gray-800 font-bold text-3xl">
              {getPageTitle()}
            </h1>
            <span className="text-gray-600 font-bold text-xs">
              {formattedDate}{" "}
              {currentTime && (
                <span className="text-gray-600 font-bold text-xs">
                  {currentTime}
                </span>
              )}
            </span>
          </div>
          <InfoUser />
        </div>
      )}
    </div>
  );
}
