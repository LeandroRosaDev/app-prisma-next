"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

// Tipagem do produto
type ProductData = {
  nome: string;
  nome_long: string;
  produto_cod: string;
  situacao: string;
  categoria: string;
  sub_categoria: string;
  descricao: string;
  profundidade_aberto: string;
  rangedevalor: string;
  preco: number;
  preco_original: string;
  preco_parcelado: string;
  altura: string;
  largura: string;
  cor: string;
  link_1: string;
  link_2: string;
  disponibilidade: string;
  imagens: File[];
  assento?: string;
  encosto?: string;
  braco?: string;
  revestimento?: string;
  profundidade_fechado?: string;
};

// Função auxiliar para formatar preços
const formatPrice = (value: number) =>
  `R$ ${value.toFixed(2).replace(".", ",")}`;

export default function PostProduto() {
  const { register, handleSubmit, reset } = useForm<ProductData>();
  const [situacao, setSituacao] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [subcategoriaSelecionada, setSubCategoriaSelecionada] = useState("");
  const [preco] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Cálculo do preço parcelado e original
  const precoParcelado = preco > 0 ? (preco * 1.0269 * 1.05) / 12 : 0;
  const precoOriginal = preco > 0 ? preco * 1.1 : 0;
  const precoFormatted = formatPrice(preco);

  // Função para manipular o upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
      // Pré-visualização das imagens
      const imageUrls = selectedImages.map((file) => URL.createObjectURL(file));
      setImagePreviews(imageUrls);
    }
  };

  // Função para enviar o formulário
  const onSubmit = async (data: ProductData) => {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Dados adicionais de preço e links
    formData.append("preco", precoFormatted);
    formData.append("preco_original", formatPrice(precoOriginal));
    formData.append("preco_parcelado", formatPrice(precoParcelado));

    // Envio para API
    try {
      // Exemplo: chamada da API com os dados
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Produto adicionado com sucesso!");
        reset();
        setImagePreviews([]);
      } else {
        alert("Erro ao adicionar produto.");
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center flex-col m-5 bg-white py-4"
    >
      <h1 className="text-3xl font-medium m-6 text-gray-700">
        Adicionar Produtos
      </h1>
      <div className="flex flex-wrap gap-6 items-center p-6 justify-center">
        {/* Nome do Produto */}
        <Input
          type="text"
          id="nome"
          placeholder="Nome do Produto"
          {...register("nome")}
        />

        {/* Nome Longo */}
        <Input
          type="text"
          id="nome_long"
          placeholder="Nome Longo do Produto"
          {...register("nome_long")}
        />

        {/* Código do Produto */}
        <Input
          type="text"
          id="produto_cod"
          placeholder="Código do Produto"
          {...register("produto_cod")}
        />

        {/* Situação */}
        <Select
          value={situacao}
          onValueChange={setSituacao}
          {...register("situacao")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Situação do Produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="destaque">Produto em Destaque</SelectItem>
            <SelectItem value="promocao">Produto em Promoção</SelectItem>
            <SelectItem value="queima">Produto em Queima de estoque</SelectItem>
          </SelectContent>
        </Select>

        {/* Categoria */}
        <Select
          value={categoriaSelecionada}
          onValueChange={setCategoriaSelecionada}
          {...register("categoria")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sala de estar">Sala de Estar</SelectItem>
            <SelectItem value="Cozinha">Cozinha</SelectItem>
            <SelectItem value="Banheiro">Banheiro</SelectItem>
            <SelectItem value="Quarto de casal">Quarto de Casal</SelectItem>
            <SelectItem value="Escritório">Escritório</SelectItem>
            {/* Add other categories */}
          </SelectContent>
        </Select>

        {/* Subcategoria */}
        <Select
          value={subcategoriaSelecionada}
          onValueChange={setSubCategoriaSelecionada}
          {...register("sub_categoria")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sub-Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categoriaSelecionada === "Sala de estar" && (
              <>
                <SelectItem value="Sofa Retratil">Sofá Retrátil</SelectItem>
                <SelectItem value="Sofa Canto">Sofá de Canto</SelectItem>
                {/* Add other options */}
              </>
            )}
          </SelectContent>
        </Select>

        {/* Descrição */}
        <Textarea
          id="descricao"
          placeholder="Descrição do Produto"
          {...register("descricao")}
        />

        {/* Profundidade Aberto */}
        <Input
          type="text"
          id="profundidade_aberto"
          placeholder="Profundidade Aberto (Retrátil)"
          {...register("profundidade_aberto")}
        />

        {/* Range de Valor */}
        <Select
          value={""}
          onValueChange={setCategoriaSelecionada}
          {...register("rangedevalor")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Range de Valor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="499">Menor de R$500,00</SelectItem>
            <SelectItem value="999">Menor de R$1000,00</SelectItem>
            <SelectItem value="1499">Menor de R$1500,00</SelectItem>
            <SelectItem value="1999">Menor de R$2000,00</SelectItem>
          </SelectContent>
        </Select>

        {/* Preço */}
        {/* <Input
          type="number"
          id="preco"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(parseFloat(e.target.value) || 0)}
          {...register("preco")}
        /> */}

        {/* Altura */}
        <Input
          type="text"
          id="altura"
          placeholder="Altura"
          {...register("altura")}
        />

        {/* Largura */}
        <Input
          type="text"
          id="largura"
          placeholder="Largura"
          {...register("largura")}
        />

        {/* Cor */}
        <Select
          value={""}
          onValueChange={setCategoriaSelecionada}
          {...register("cor")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Cor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Azul">Azul</SelectItem>
            <SelectItem value="Vermelho">Vermelho</SelectItem>
            {/* Add more colors */}
          </SelectContent>
        </Select>

        {/* Imagens */}
        <Input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Pré-visualização das Imagens */}
        {imagePreviews.length > 0 && (
          <div className="mt-4">
            <h3>Pré-visualização:</h3>
            <div className="flex space-x-2">
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  className="w-20 h-20 object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="mt-4">
        Adicionar Produto
      </Button>
    </form>
  );
}
