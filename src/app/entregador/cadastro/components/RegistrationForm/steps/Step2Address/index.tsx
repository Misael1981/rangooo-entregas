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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

type Step2AddressProps = {
  nextStep: () => void;
  prevStep: () => void;
};

const Step2Address = ({ nextStep, prevStep }: Step2AddressProps) => {
  const { register, formState, trigger } = useFormContext();

  const handleNext = async () => {
    const valid = await trigger([
      "street",
      "number",
      "neighborhood",
      "complement",
      "state",
      "city",
    ]);
    if (valid) nextStep();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Endereço</CardTitle>
        <CardDescription>Digite seu endereço</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <div className="flex gap-2">
            <Field className="w-2/3">
              <FieldLabel>Rua</FieldLabel>
              <Input {...register("street")} />
              {formState.errors.street && (
                <span className="text-xs text-red-500">
                  {formState.errors.street.message as string}
                </span>
              )}
            </Field>
            <Field className="w-1/3">
              <FieldLabel>Número</FieldLabel>
              <Input {...register("number")} />
              {formState.errors.number && (
                <span className="text-xs text-red-500">
                  {formState.errors.number.message as string}
                </span>
              )}
            </Field>
          </div>
          <Field>
            <FieldLabel>Bairro</FieldLabel>
            <Input {...register("neighborhood")} />
            {formState.errors.neighborhood && (
              <span className="text-xs text-red-500">
                {formState.errors.neighborhood.message as string}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel>Complemento</FieldLabel>
            <Input {...register("complement")} />
            {formState.errors.complement && (
              <span className="text-xs text-red-500">
                {formState.errors.complement.message as string}
              </span>
            )}
          </Field>
          <div className="flex gap-2">
            <Field className="w-2/3">
              <FieldLabel>Cidade</FieldLabel>
              <Input {...register("city")} />
              {formState.errors.city && (
                <span className="text-xs text-red-500">
                  {formState.errors.city.message as string}
                </span>
              )}
            </Field>
            <Field className="w-1/3">
              <FieldLabel>Estado</FieldLabel>
              <Input {...register("state")} />
              {formState.errors.state && (
                <span className="text-xs text-red-500">
                  {formState.errors.state.message as string}
                </span>
              )}
            </Field>
          </div>
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

export default Step2Address;
