import z from "zod";

export const VehicleTypeEnum = ["MOTORCYCLE", "CAR", "BIKE"] as const;

export const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),

  document: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .pipe(
      z
        .string()
        .length(11, "CNH deve ter 11 dígitos")
        .refine((val) => !/^(\d)\1+$/.test(val), {
          message: "CNH inválida",
        }),
    ),
  documentImageUrl: z
    .union([z.string(), z.any()])
    .refine((val) => val, "Imagem de CNH é obrigatória"),
  vehiclePlate: z.string().min(1, "Placa do veículo é obrigatória"),
  vehicleType: z.enum(VehicleTypeEnum, {
    message: "Selecione uma categoria válida",
  }),
  notes: z.string().optional(),
});

export type FormValues = z.infer<typeof registerSchema>;
