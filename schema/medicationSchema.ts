import { z } from "zod";

export const medicationSchema = z.object({
  medicineName: z
    .string()
    .min(1, "Tên thuốc là bắt buộc"),
  prescription: z.string().optional(),
  unit: z.string().min(1, "Đơn vị không được để trống"),
  startDate: z.date({
    required_error: "Vui lòng chọn ngày bắt đầu uống",
  }),
  frequency: z.string().min(1, "Tần suất không được để trống"),
  time: z.date({
    required_error: "Vui lòng chọn thời gian uống",
  }),
  note: z.string().optional(),
});

export type MedicationFormValues = z.infer<typeof medicationSchema>;
