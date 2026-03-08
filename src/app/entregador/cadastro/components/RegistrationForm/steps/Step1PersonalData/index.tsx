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
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { ArrowRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

type Step1PersonalDataProps = {
  nextStep: () => void;
};

const Step1PersonalData = ({ nextStep }: Step1PersonalDataProps) => {
  const { register, formState, trigger, setValue } = useFormContext();

  const handleNext = async () => {
    const valid = await trigger(["name", "phone"]);
    if (valid) nextStep();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Dados Pessoais</CardTitle>
        <CardDescription>Digite seus dados pessoais</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <FieldGroup>
          <Field>
            <FieldLabel>Nome Completo</FieldLabel>
            <Input {...register("name")} />
            {formState.errors.name && (
              <span className="text-xs text-red-500">
                {formState.errors.name.message as string}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel>Telefone</FieldLabel>
            <Input
              {...register("phone")}
              onChange={(e) => {
                const formattedValue = formatPhoneNumber(e.target.value);

                setValue("phone", formattedValue, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            {formState.errors.phone && (
              <span className="text-xs text-red-500">
                {formState.errors.phone.message as string}
              </span>
            )}
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={handleNext}>
          Próximo
          <ArrowRight className=" h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step1PersonalData;
