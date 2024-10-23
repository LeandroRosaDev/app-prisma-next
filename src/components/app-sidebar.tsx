import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  Package,
  Users,
  Settings,
  ClipboardList,
  Shield,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import LogoutButton from "./login/LogoutButton";

interface SidebarProps {
  userRole: string | undefined;
}

// Menu items comuns a todos os usuários
const commonItems = [
  {
    title: "Início",
    url: "/",
    icon: Home,
  },
  //   {
  //     title: "Adicionar Produtos",
  //     url: "/produtos/adicionar",
  //     icon: Package,
  //   },
  //   {
  //     title: "Visualizar Estoque",
  //     url: "/produtos/estoque",
  //     icon: Package,
  //   },
  //   {
  //     title: "Visualizar Clientes",
  //     url: "/clientes",
  //     icon: Users,
  //   },
  //   {
  //     title: "Adicionar Clientes",
  //     url: "/clientes/adicionar",
  //     icon: Users,
  //   },
  //   {
  //     title: "Reclamações",
  //     url: "/clientes/reclamacoes",
  //     icon: LogOutIcon,
  //   },
  //   {
  //     title: "Configurações",
  //     url: "/configuracoes",
  //     icon: Settings,
  //   },
];

// Menu items para moderadores e administradores
const moderatorAdminItems = [
  {
    title: "Ver Relatórios",
    url: "/pedidos/entregas",
    icon: ClipboardList,
  },
  //   {
  //     title: "Atualizar Status",
  //     url: "/pedidos/status",
  //     icon: ClipboardList,
  //   },
];

// Menu items exclusivos para administradores
const adminItems = [
  {
    title: "Admin",
    url: "/admin",
    icon: Shield,
  },
];

export function AppSidebar({ userRole }: SidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Common Menu Items */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {commonItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Menu Items for Moderators and Admins */}
        {(userRole === "MODERATOR" || userRole === "ADMIN") && (
          <SidebarGroup>
            <SidebarGroupLabel>Relatórios</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {moderatorAdminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Menu Items for Admins Only */}
        {userRole === "ADMIN" && (
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOutIcon />
                  <LogoutButton />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
