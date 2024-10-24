import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Package,
  Settings,
  ClipboardList,
  Shield,
  LogOutIcon,
  PackageSearch,
  UserPlus2,
  UserSearch,
  MessageSquareWarning,
  ListRestart,
} from "lucide-react";
import Link from "next/link";
import LogoutButton from "./login/LogoutButton";

interface SidebarProps {
  userRole: string | undefined;
}

// Menu items comuns a todos os usuários
const produtos = [
  {
    title: "Adicionar Produtos",
    url: "/",
    icon: Package,
  },
  {
    title: "Visualizar Estoque",
    url: "/",
    icon: PackageSearch,
  },
];

const clientes = [
  {
    title: "Visualizar Clientes",
    url: "/cliente/listar",
    icon: UserSearch,
  },
  {
    title: "Adicionar Clientes",
    url: "/cliente/adicionar",
    icon: UserPlus2,
  },
  {
    title: "Reclamações",
    url: "/",
    icon: MessageSquareWarning,
  },
];

// Menu items para moderadores e administradores
const moderatorAdminItems = [
  {
    title: "Ver Relatórios",
    url: "/",
    icon: ClipboardList,
  },
  {
    title: "Atualizar Status Pedidos",
    url: "/",
    icon: ListRestart,
  },
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
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Home />
              <Link href="/">Home</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Produtos */}
        <SidebarGroup>
          <SidebarGroupLabel>Produtos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {produtos.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      <span className="border rounded-sm bg-black text-white p-[2px] ">
                        Breve
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Clientes */}
        <SidebarGroup>
          <SidebarGroupLabel>Clientes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clientes.map((item) => (
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
                        <span className="border rounded-sm bg-black text-white ">
                          Breve
                        </span>
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
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              <Link href="/">Configurações</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOutIcon />
              <LogoutButton />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
