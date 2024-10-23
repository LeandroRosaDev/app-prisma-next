"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideTrash2, LucideEye } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    cidade: "",
    bairro: "",
    forma_pagamento: "",
  });
  const { data: session } = useSession();
  const { toast } = useToast();

  // Função para buscar clientes com filtros e paginação
  const fetchClientes = async (page = 1) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        cidade: filters.cidade || "",
        bairro: filters.bairro || "",
        forma_pagamento:
          filters.forma_pagamento === "all" ? "" : filters.forma_pagamento, // Se for "all", não aplicamos o filtro
      });
      const response = await fetch(`/api/clientes/buscar?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setClientes(data.clientes);
        setTotalPages(data.totalPages);
        setCurrentPage(page);
      } else {
        toast({
          title: "Erro",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar clientes",
        variant: "destructive",
      });
    }
  };

  // Função para deletar um cliente
  const deleteCliente = async (id: number) => {
    if (session?.user?.role !== "ADMIN") return;

    if (!confirm("Tem certeza que deseja deletar este cliente?")) return;

    try {
      const response = await fetch("/api/clientes/deletar", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Cliente deletado com sucesso",
          variant: "default",
        });
        fetchClientes(currentPage); // Atualizar a lista de clientes
      } else {
        toast({
          title: "Erro",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar cliente",
        variant: "destructive",
      });
    }
  };

  // Efeito para buscar clientes quando o filtro ou a página mudar
  useEffect(() => {
    fetchClientes(currentPage);
    // Somente atualiza quando os filtros ou a página mudam
  }, [filters, currentPage]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Clientes</h1>

      {/* Filtros */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Cidade"
          value={filters.cidade}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, cidade: e.target.value }))
          }
        />
        <Input
          placeholder="Bairro"
          value={filters.bairro}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, bairro: e.target.value }))
          }
        />
        <Select
          value={filters.forma_pagamento}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, forma_pagamento: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Forma de Pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>{" "}
            {/* Aqui substitui "" por "all" */}
            <SelectItem value="boleto">Boleto</SelectItem>
            <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
            <SelectItem value="pix">Pix</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() => fetchClientes(1)}
          className="bg-blue-500 text-white"
        >
          Filtrar
        </Button>
      </div>

      {/* Tabela de Clientes */}
      <Table>
        <thead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Forma de Pagamento</TableCell>
            <TableCell>Cidade</TableCell>
            <TableCell>Bairro</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </thead>
        <tbody>
          {clientes && clientes.length > 0 ? (
            clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.nome_cliente}</TableCell>
                <TableCell>{cliente.forma_pagamento}</TableCell>
                <TableCell>{cliente.cidade}</TableCell>
                <TableCell>{cliente.bairro}</TableCell>
                <TableCell>{`R$ ${cliente.subtotal || "0.00"}`}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost">
                      <LucideEye size={20} />
                    </Button>
                    {session?.user?.role === "ADMIN" && (
                      <Button
                        variant="ghost"
                        onClick={() => deleteCliente(cliente.id)}
                        className="text-red-500"
                      >
                        <LucideTrash2 size={20} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Nenhum cliente encontrado.
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>

      {/* Paginação */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
