-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_cliente" TEXT NOT NULL,
    "nome_entrega" TEXT NOT NULL,
    "data_entrega" DATETIME NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "ponto_referencia" TEXT,
    "obs" TEXT,
    "email" TEXT NOT NULL,
    "telefone_1" TEXT NOT NULL,
    "telefone_2" TEXT,
    "nome_produto_1" TEXT NOT NULL,
    "nome_produto_2" TEXT,
    "nome_produto_3" TEXT,
    "nome_produto_4" TEXT,
    "nome_produto_5" TEXT,
    "desc_produto_1" TEXT NOT NULL,
    "desc_produto_2" TEXT,
    "desc_produto_3" TEXT,
    "desc_produto_4" TEXT,
    "desc_produto_5" TEXT,
    "qtd_1" TEXT NOT NULL,
    "qtd_2" TEXT,
    "qtd_3" TEXT,
    "qtd_4" TEXT,
    "qtd_5" TEXT,
    "forma_pagamento" TEXT NOT NULL,
    "numero_parcelas" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Cliente" ("bairro", "cep", "cidade", "cpf", "createdAt", "data_entrega", "desc_produto_1", "desc_produto_2", "desc_produto_3", "desc_produto_4", "desc_produto_5", "email", "forma_pagamento", "id", "logradouro", "nome_cliente", "nome_entrega", "nome_produto_1", "nome_produto_2", "nome_produto_3", "nome_produto_4", "nome_produto_5", "numero", "numero_parcelas", "obs", "ponto_referencia", "qtd_1", "qtd_2", "qtd_3", "qtd_4", "qtd_5", "telefone_1", "telefone_2", "updatedAt") SELECT "bairro", "cep", "cidade", "cpf", "createdAt", "data_entrega", "desc_produto_1", "desc_produto_2", "desc_produto_3", "desc_produto_4", "desc_produto_5", "email", "forma_pagamento", "id", "logradouro", "nome_cliente", "nome_entrega", "nome_produto_1", "nome_produto_2", "nome_produto_3", "nome_produto_4", "nome_produto_5", "numero", "numero_parcelas", "obs", "ponto_referencia", "qtd_1", "qtd_2", "qtd_3", "qtd_4", "qtd_5", "telefone_1", "telefone_2", "updatedAt" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
