"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Interface para o cliente
interface Cliente {
  id: number;
  nome_cliente: string;
  cidade: string;
  bairro: string;
  forma_pagamento: string;
  observacao: string;
}

// Interface para os parâmetros da rota dinâmica
interface Params {
  info: string; // O parâmetro capturado da rota [info] será uma string (ID do cliente)
}

export default function ClienteInfo({ params }: { params: Params }) {
  const [cliente, setCliente] = useState<Cliente | null>(null); // Tipagem do cliente
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Cliente>>({}); // Tipagem correta do formData
  const { data: session } = useSession();
  const { toast } = useToast();

  // Função para buscar os dados do cliente, envolvida em useCallback
  const fetchCliente = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/clientes/cliente/${params.info}`); // Caminho correto
      const data = await response.json();
      setCliente(data); // Preenche o estado de cliente
      setFormData(data); // Preenche o formData com os dados atuais do cliente
    } catch {
      toast({
        title: "Erro",
        description: "Erro ao buscar os dados do cliente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [params.info, toast]);

  // Efeito para carregar os dados do cliente
  useEffect(() => {
    if (params.info) fetchCliente();
  }, [params.info, fetchCliente]); // Agora, `fetchCliente` está na lista de dependências

  // Função para atualizar os dados do cliente
  const handleUpdateCliente = async () => {
    try {
      const response = await fetch("/api/clientes/atualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: cliente?.id, ...formData }),
      });

      if (response.ok) {
        const updatedCliente = await response.json();
        setCliente(updatedCliente); // Atualiza o estado do cliente
        toast({
          title: "Sucesso",
          description: "Dados do cliente atualizados com sucesso",
          variant: "default",
        });
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast({
          title: "Erro",
          description: errorData.error || "Erro ao atualizar o cliente",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erro",
        description: "Erro ao atualizar os dados do cliente",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <p>Carregando...</p>; // Aqui que vai entrar o componente de loading

  // Verificação para garantir que o cliente não é null
  if (!cliente) return <p>Cliente não encontrado.</p>; // Aqui pode entrar alguma parte de código melhor quando o cliente não for encontrado

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing
              ? "Editar Cliente"
              : `Informações do Cliente: ${cliente.nome_cliente}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome_cliente">Nome do Cliente</Label>
                <Input
                  id="nome_cliente"
                  value={formData.nome_cliente || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nome_cliente: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={formData.cidade || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cidade: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={formData.bairro || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bairro: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="forma_pagamento">Forma de Pagamento</Label>
                <Input
                  id="forma_pagamento"
                  value={formData.forma_pagamento || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      forma_pagamento: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="observacao">Observações</Label>
                <Textarea
                  id="observacao"
                  value={formData.observacao || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      observacao: e.target.value,
                    }))
                  }
                />
              </div>
              <Button
                className="col-span-2 bg-green-500 text-white"
                onClick={handleUpdateCliente}
              >
                Salvar Alterações
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Nome do Cliente:</strong> {cliente.nome_cliente}
              </p>
              <p>
                <strong>Cidade:</strong> {cliente.cidade}
              </p>
              <p>
                <strong>Bairro:</strong> {cliente.bairro}
              </p>
              <p>
                <strong>Forma de Pagamento:</strong> {cliente.forma_pagamento}
              </p>
              <p>
                <strong>Observações:</strong>{" "}
                {cliente.observacao || "Nenhuma observação"}
              </p>
            </div>
          )}
        </CardContent>

        {/* Controle para edição */}
        {(session?.user?.role === "MODERATOR" ||
          session?.user?.role === "ADMIN") &&
          !isEditing && (
            <Button
              className="mt-4 bg-blue-500 text-white"
              onClick={() => setIsEditing(true)}
            >
              Editar Informações
            </Button>
          )}

        {isEditing && (
          <Button
            className="mt-4 bg-gray-500 text-white"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </Button>
        )}
      </Card>

      {/* Alerta de permissão */}
      {session?.user?.role !== "MODERATOR" &&
        session?.user?.role !== "ADMIN" && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Permissão Negada</AlertTitle>
            <AlertDescription>
              Somente moderadores ou administradores podem editar as informações
              do cliente.
            </AlertDescription>
          </Alert>
        )}
    </div>
  );
}
