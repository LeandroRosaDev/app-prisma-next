// src/app/api/admin/listar-usuarios/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Verifica se o usuário está autenticado e se é administrador
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Permissão negada" }, { status: 403 });
  }

  // Obtém todos os usuários do sistema
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return NextResponse.json(users);
}
