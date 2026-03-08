"use client";

import { useState } from "react";
import Step1PersonalData from "./steps/Step1PersonalData";
import Step2Address from "./steps/Step2Address";
import Step3Documents from "./steps/Step3Documents";
import Step4Confirmation from "./steps/Step4Confirmation";
import { FormValues, registerSchema } from "@/schemas/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { registerDeliveryPerson } from "@/app/actions/register-delivery-person";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

const RegistrationForm = () => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      street: "",
      number: "",
      neighborhood: "",
      complement: "",
      city: "",
      state: "",
      document: "",
      documentImageUrl: "",
      vehiclePlate: "",
      vehicleType: "MOTORCYCLE",
      notes: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const uploadToCloudinaryClient = async (file: File) => {
    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } catch (error) {
      console.error("Erro na compressão ou upload:", error);
      throw error;
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsPending(true);

    try {
      const toastId = toast.loading("Enviando seu cadastro...");
      let imageUrl = data.documentImageUrl;

      if (data.documentImageUrl instanceof File) {
        try {
          const uploadResult = await uploadToCloudinaryClient(
            data.documentImageUrl,
          );
          imageUrl = uploadResult.url;
        } catch (err) {
          toast.error("Falha ao subir a imagem para a nuvem.");
          setIsPending(false);
          console.error("Erro ao subir a imagem:", err);
          return;
        }
      }

      const result = await registerDeliveryPerson({
        ...data,
        documentImageUrl: imageUrl,
      });

      if (result?.error) {
        toast.error(result.error, { id: toastId });
        setIsPending(false);
        return;
      }

      toast.success("Cadastro enviado com sucesso! Aguarde nossa análise.", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
      console.error("Erro ao enviar o cadastro:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="flex justify-between  w-full max-w-md px-4">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-2 w-full mx-1 rounded-full transition-colors duration-300 ${s <= currentStep ? "bg-blue-500" : "bg-gray-200"}`}
          />
        ))}
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          {currentStep === 1 && <Step1PersonalData nextStep={nextStep} />}

          {currentStep === 2 && (
            <Step2Address nextStep={nextStep} prevStep={prevStep} />
          )}

          {currentStep === 3 && (
            <Step3Documents nextStep={nextStep} prevStep={prevStep} />
          )}

          {currentStep === 4 && (
            <Step4Confirmation prevStep={prevStep} isPending={isPending} />
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default RegistrationForm;
