import { z } from "zod";

export const medicationSchema = z
  .object({
    drug_id: z.number().optional(),
    drugName: z.string().optional(),

    unit_id: z.number(),

    start_date: z.date(),
    end_date: z.date().optional(),
    note: z.string().optional(),

    frequency_type: z.enum(["DAILY", "INTERVAL", "WEEKLY"]),
    interval_days: z.number().optional(),
    days_of_week: z.array(z.string()),

    schedules: z
      .array(
        z.object({
          time: z.string().regex(/^\d{2}:\d{2}$/),
          dosage: z.number().min(0.25),
        })
      )
      .min(1),
  })
  .refine(
    (d) => {
      if (d.frequency_type === "INTERVAL") {
        return !!d.interval_days;
      }
      return true;
    },
    {
      message: "interval_days là bắt buộc khi tần suất là INTERVAL",
      path: ["interval_days"],
    }
  )
  .refine(
    (d) => {
      if (d.frequency_type === "WEEKLY") {
        return d.days_of_week && d.days_of_week.length > 0;
      }
      return true;
    },
    {
      message: "Chọn ít nhất 1 ngày trong tuần",
      path: ["days_of_week"],
    }
  );

export type AddReminderMedicationForm = z.infer<typeof medicationSchema>;
