import { FREQUENCY, WEEK_DAYS } from "@/constants/medication";

export interface MedicationSchedule {
  scheduleId: number;
  drugName: string;
  dosage: number;
  time: string; // "HH:mm"
  status: number; // 0 = active, 1 = paused, 2 = stopped (tuỳ BE)
  edited: boolean;
  prescriptionName: string | null;
  unitName: string | null;
  note: string | null;
  frequencyType: FREQUENCY;
  daysOfWeek: WEEK_DAYS[];
  intervalDays: number | null;
}
