"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

export default function AddClientForm() {
  const [productCount, setProductCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  // Função para renderizar os campos de produto com base na quantidade selecionada
  const renderProductFields = () => {
    const fields = [];
    for (let i = 1; i <= productCount; i++) {
      fields.push(
        <div key={i} className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor={`nome_produto_${i}`}>Nome Produto {i}</Label>
            <Input
              type="text"
              id={`nome_produto_${i}`}
              placeholder={`Nome do Produto ${i}`}
              name={`nome_produto_${i}`}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor={`desc_produto_${i}`}>Desc Produto {i}</Label>
            <Input
              type="text"
              id={`desc_produto_${i}`}
              placeholder={`Descrição do Produto ${i}`}
              name={`desc_produto_${i}`}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor={`qtd_${i}`}>Qtd {i}</Label>
            <Select defaultValue="1" id={`qtd_${i}`} name={`qtd_${i}`}>
              <SelectTrigger>
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, idx) => (
                  <SelectItem key={idx + 1} value={String(idx + 1)}>
                    {idx + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor={`subtotal_${i}`}>Subtotal {i}</Label>
            <Input
              type="text"
              id={`subtotal_${i}`}
              placeholder="Subtotal"
              name={`subtotal_${i}`}
            />
          </div>
        </div>
      );
    }
    return fields;
  };

  // Função para enviar os dados para a API
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Coletando os dados do formulário
    const formData = new FormData(event.currentTarget);

    // Convertendo para objeto
    const data = Object.fromEntries(formData.entries());

    // Adicionando o campo de data corretamente
    data["data_entrega"] = selectedDate ? selectedDate.toISOString() : "";

    try {
      const response = await fetch("/api/clientes/adicionar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Cliente cadastrado com sucesso",
          variant: "default", // ou "success"
        });
      } else {
        toast({
          title: "Erro",
          description: "Erro ao cadastrar cliente",
          variant: "destructive", // ou "error"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar cliente",
        variant: "destructive", // ou "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col m-5 bg-white py-4 space-y-6"
    >
      <h1 className="text-3xl font-medium text-gray-700">Cadastrar Cliente</h1>

      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Nome do Cliente */}
        <div>
          <Label htmlFor="nome_cliente">Nome do Cliente</Label>
          <Input
            type="text"
            id="nome_cliente"
            name="nome_cliente"
            placeholder="Nome do Cliente"
            required
          />
        </div>

        {/* Data de Entrega */}
        <div>
          <Label htmlFor="data_entrega">Data de Entrega</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedDate
                  ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                  : "Selecionar Data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={ptBR}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Nome de quem vai receber a entrega */}
        <div>
          <Label htmlFor="nome_entrega">
            Nome de quem irá receber a entrega
          </Label>
          <Input
            type="text"
            id="nome_entrega"
            name="nome_entrega"
            placeholder="Nome de quem vai receber"
          />
        </div>

        {/* Logradouro */}
        <div>
          <Label htmlFor="logradouro">Logradouro</Label>
          <Input
            type="text"
            id="logradouro"
            name="logradouro"
            placeholder="Logradouro"
          />
        </div>

        {/* Número */}
        <div>
          <Label htmlFor="numero">Número</Label>
          <Input type="text" id="numero" name="numero" placeholder="Número" />
        </div>

        {/* Bairro */}
        <div>
          <Label htmlFor="bairro">Bairro</Label>
          <Input type="text" id="bairro" name="bairro" placeholder="Bairro" />
        </div>

        {/* CEP */}
        <div>
          <Label htmlFor="cep">CEP</Label>
          <Input type="text" id="cep" name="cep" placeholder="CEP" />
        </div>

        {/* Cidade */}
        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input type="text" id="cidade" name="cidade" placeholder="Cidade" />
        </div>

        {/* Ponto de Referência */}
        <div>
          <Label htmlFor="ponto_referencia">Ponto de Referência</Label>
          <Input
            type="text"
            id="ponto_referencia"
            name="ponto_referencia"
            placeholder="Ponto de Referência"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="ponto_referencia">Email</Label>
          <Input
            type="text"
            id="ponto_referencia"
            name="email"
            placeholder="Email"
          />
        </div>

        {/* Observações */}
        <div>
          <Label htmlFor="obs">Observação</Label>
          <Textarea id="obs" name="obs" placeholder="Observação" />
        </div>

        {/* Telefone 1 */}
        <div>
          <Label htmlFor="telefone_1">Telefone 1</Label>
          <Input
            type="text"
            id="telefone_1"
            name="telefone_1"
            placeholder="Telefone 1"
          />
        </div>

        {/* Telefone 2 */}
        <div>
          <Label htmlFor="telefone_2">Telefone 2</Label>
          <Input
            type="text"
            id="telefone_2"
            name="telefone_2"
            placeholder="Telefone 2"
          />
        </div>

        {/* Quantidade de Produtos */}
        <div>
          <Label htmlFor="product_count">Qtd de Produtos</Label>
          <Select
            defaultValue="1"
            onValueChange={(value) => setProductCount(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(5)].map((_, idx) => (
                <SelectItem key={idx + 1} value={String(idx + 1)}>
                  {idx + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CPF */}
        <div>
          <Label htmlFor="cpf">CPF</Label>
          <Input type="text" id="cpf" name="cpf" placeholder="CPF" />
        </div>

        {/* Forma de Pagamento */}
        <div>
          <Label htmlFor="forma_pagamento">Forma de Pagamento</Label>
          <Select
            defaultValue="selecionar"
            id="forma_pagamento"
            name="forma_pagamento"
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="boleto">Boleto</SelectItem>
              <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
              <SelectItem value="pix">Pix</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Número de Parcelas */}
        <div>
          <Label htmlFor="numero_parcelas">Nº de Parcelas</Label>
          <Select defaultValue="1" id="numero_parcelas" name="numero_parcelas">
            <SelectTrigger>
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(12)].map((_, idx) => (
                <SelectItem key={idx + 1} value={String(idx + 1)}>
                  {idx + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Renderizar os campos de produtos dinamicamente */}
      <div className="w-full space-y-4">{renderProductFields()}</div>

      {/* Botões de ação */}
      <div className="flex gap-4">
        <Button type="reset" className="bg-red-500 text-white">
          Resetar
        </Button>
        <Button type="submit" className="bg-green-500 text-white">
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}
