// src/app/erro-acesso/page.tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ErroAcessoPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Alert className="max-w-lg">
        <AlertTitle>Acesso Negado</AlertTitle>
        <AlertDescription>
          Você não tem permissão para acessar esta página. Contate o
          administrador para mais detalhes.
        </AlertDescription>
      </Alert>
    </div>
  );
}
