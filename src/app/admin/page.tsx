"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Função para buscar os usuários
  const fetchUsers = async () => {
    const res = await fetch("/api/admin/listar-usuarios");
    const data = await res.json();

    if (res.ok) {
      setUsers(data);
    } else {
      setMessage(data.error || "Erro ao carregar usuários");
    }
  };

  // Chama a função para buscar os usuários na montagem do componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para alterar o nível de acesso
  const changeUserRole = async (userId: number, newRole: string) => {
    const res = await fetch("/api/admin/alterar-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newRole }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Nível de acesso atualizado com sucesso");
      fetchUsers(); // Recarrega os usuários após a atualização
    } else {
      setMessage(data.error || "Erro ao alterar nível de acesso");
    }
  };

  return (
    <div>
      <h1>Painel do Administrador</h1>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Nível de Acesso</th>
            <th className="px-4 py-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {users.map(
            (user: {
              id: number;
              name: string;
              email: string;
              role: string;
            }) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name || "Sem Nome"}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <Select
                    value={user.role}
                    onValueChange={(newRole) =>
                      changeUserRole(user.id, newRole)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Usuário</SelectItem>
                      <SelectItem value="MODERATOR">Moderador</SelectItem>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="border px-4 py-2">
                  <Button onClick={() => changeUserRole(user.id, "MODERATOR")}>
                    Promover a Moderador
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
