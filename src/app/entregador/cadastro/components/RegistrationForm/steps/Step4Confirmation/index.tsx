"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VEHICLES_LABEL } from "@/constants/maps-labels";
import { VehicleType } from "@/generated/prisma/enums";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

type Step4ConfirmationProps = {
  prevStep: () => void;
  isPending: boolean;
};

const Step4Confirmation = ({ prevStep, isPending }: Step4ConfirmationProps) => {
  const { getValues } = useFormContext();
  const data = getValues();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Confirmar cadastro</CardTitle>
        <CardDescription>
          Revise as informações antes de finalizar seu cadastro como entregador.
          Após o envio, nossa equipe fará a análise dos seus dados e documentos.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        {/* Dados pessoais */}
        <div>
          <h3 className="font-semibold">Dados pessoais</h3>
          <p>Nome: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Telefone: {data.phone}</p>
        </div>

        {/* Endereço */}
        <div>
          <h3 className="font-semibold">Endereço</h3>
          <p>
            {data.street}, {data.number}
          </p>
          <p>{data.neighborhood}</p>
          <p>
            {data.city} - {data.state}
          </p>
        </div>

        {/* Documentos */}
        <div>
          <h3 className="font-semibold">Documentação</h3>
          <p>CNH: {data.document}</p>
        </div>

        {/* Veículo */}
        <div>
          <h3 className="font-semibold">Veículo</h3>
          <p>Placa: {data.vehiclePlate}</p>
          <p>Tipo: {VEHICLES_LABEL[data.vehicleType as VehicleType]}</p>
        </div>

        <div className="w-full px-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 text-white"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Finalizar Cadastro"
            )}
          </Button>
        </div>
      </CardContent>

      <CardFooter className="">
        <Button onClick={prevStep} className="border-none">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step4Confirmation;
