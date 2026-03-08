import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { VEHICLES_LABEL } from "@/constants/maps-labels";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

const vehicleTypeList = ["MOTORCYCLE", "CAR", "BIKE"] as const;

type Step3DocumentsProps = {
  nextStep: () => void;
  prevStep: () => void;
};

const Step3Documents = ({ nextStep, prevStep }: Step3DocumentsProps) => {
  const form = useFormContext();
  const { register, formState, trigger } = form;

  const handleNext = async () => {
    const valid = await trigger([
      "document",
      "documentImageUrl",
      "vehiclePlate",
      "vehicleType",
      "notes",
    ]);
    if (valid) nextStep();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Documentação</CardTitle>
        <CardDescription>
          Para garantir a segurança da plataforma, precisamos validar alguns
          documentos. Essas informações são confidenciais e utilizadas apenas
          para o cadastro e verificação dos entregadores.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel>CNH</FieldLabel>
            <Input
              {...register("document")}
              inputMode="numeric"
              maxLength={11}
            />
            {formState.errors.document && (
              <span className="text-xs text-red-500">
                {formState.errors.document.message as string}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel>Foto do Documento</FieldLabel>
            <ImageUpload form={form} name="documentImageUrl" />
            {formState.errors.documentImageUrl && (
              <span className="text-xs text-red-500">
                {formState.errors.documentImageUrl.message as string}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel>Placa do Veículo</FieldLabel>
            <Input {...register("vehiclePlate")} />
            {formState.errors.vehiclePlate && (
              <span className="text-xs text-red-500">
                {formState.errors.vehiclePlate.message as string}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel>Tipo do Veículo</FieldLabel>
            <Controller
              name="vehicleType"
              control={form.control}
              defaultValue="MOTORCYCLE"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypeList.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {VEHICLES_LABEL[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field>
            <FieldLabel>Observações Adicionais (Opcional)</FieldLabel>
            <Textarea {...register("notes")} />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button onClick={prevStep} className="border-none">
          <ArrowLeft className=" h-4 w-4" />
          Voltar
        </Button>
        <Button variant="outline" onClick={handleNext}>
          Próximo
          <ArrowRight className=" h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step3Documents;
