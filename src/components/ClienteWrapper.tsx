"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useSession, SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation"; // Importa usePathname para verificar a rota atual

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionContent>{children}</SessionContent>
    </SessionProvider>
  );
}

function SessionContent({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname(); // Obtem a rota atual

  // Não mostrar o sidebar em rotas de login ou cadastro
  const hideSidebar =
    pathname === "/login" ||
    pathname === "/cadastro" ||
    pathname === "/esqueci-senha";

  return (
    <div className="flex">
      {!hideSidebar && (
        <SidebarProvider className="w-auto">
          <AppSidebar userRole={session?.user?.role} />
        </SidebarProvider>
      )}
      <main className="w-full">{children}</main>
    </div>
  );
}
