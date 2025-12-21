import { MedicationSchedule } from "@/app/types/medication";
import { mapWeekDayToNumber } from "@/constants/medication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const STORAGE_KEY = {
  MEDICATION_NOTIFICATION_MAP: "MEDICATION_NOTIFICATION_MAP",
};

type NotificationMap = Record<number, string[]>;
// scheduleId -> notificationId
// lấy danh sách id schedule của OS
async function getNotificationMap(): Promise<NotificationMap> {
  const raw = await AsyncStorage.getItem(
    STORAGE_KEY.MEDICATION_NOTIFICATION_MAP
  );
  return raw ? (JSON.parse(raw) as NotificationMap) : {};
}

// lưu danh sách id schedule của OS
async function saveNotificationMap(map: NotificationMap) {
  await AsyncStorage.setItem(
    STORAGE_KEY.MEDICATION_NOTIFICATION_MAP,
    JSON.stringify(map)
  );
}

export const addNotificationsForSchedule = async (
  scheduleId: number,
  notificationIds: string[]
) => {
  const map = await getNotificationMap();

  map[scheduleId] = notificationIds;

  await saveNotificationMap(map);
};

export const getNotificationsByScheduleId = async (
  scheduleId: number
): Promise<string[]> => {
  const map = await getNotificationMap();
  return map[scheduleId] ?? [];
};

// hàm lấy giờ
const getHour = (time: string): [number, number] => {
  const [hour, minute] = time.split(":").map(Number);
  return [hour, minute];
};

// hàm tạo nội dung
const createNotificationContent = (schedule: MedicationSchedule) => {
  const unit = schedule.unitName ?? "";
  const note = schedule.note ? `\nGhi chú: ${schedule.note}` : "";
  return `Bạn cần uống ${schedule.dosage} ${unit} ${schedule.drugName}${note}`;
};
// hàm tạo schedule nhắc hằng ngày
const createDailySchedule = async (
  schedule: MedicationSchedule,
  daysAhead = 30
): Promise<string[]> => {
  const [hour, minute] = getHour(schedule.time);
  const ids: string[] = [];
  const now = new Date();

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(hour, minute, 0, 0);

    if (date <= now) continue;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc uống thuốc",
        body: createNotificationContent(schedule),
        data: {
          scheduleId: schedule.scheduleId,
          date: date.toISOString(),
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
      },
    });

    ids.push(id);
  }

  return ids;
};

// hàm tạo schedule nhắc theo tuần
const createWeeklySchedule = async (
  schedule: MedicationSchedule,
  weeksAhead = 8
): Promise<string[]> => {
  const [hour, minute] = getHour(schedule.time);
  const ids: string[] = [];
  const now = new Date();

  for (const day of schedule.daysOfWeek) {
    const targetWeekday = mapWeekDayToNumber(day); // 1–7 (Mon–Sun)

    for (let w = 0; w < weeksAhead; w++) {
      const date = new Date();
      const currentWeekday = date.getDay() === 0 ? 7 : date.getDay();

      const diff = ((targetWeekday - currentWeekday + 7) % 7) + w * 7;

      date.setDate(date.getDate() + diff);
      date.setHours(hour, minute, 0, 0);

      if (date <= now) continue;

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Nhắc uống thuốc",
          body: createNotificationContent(schedule),
          data: {
            scheduleId: schedule.scheduleId,
            date: date.toISOString(),
            weekday: day,
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date,
        },
      });

      ids.push(id);
    }
  }

  return ids;
};

// hàm tạo schedule nhắc cách ngày
const addDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const createEveryXDaySchedule = async (
  schedule: MedicationSchedule,
  options?: { startDate?: Date; totalDays?: number }
): Promise<string[]> => {
  if (!schedule.intervalDays || schedule.intervalDays <= 0) return [];

  const [hour, minute] = getHour(schedule.time);
  const startDate = options?.startDate ?? new Date();
  const totalDays = options?.totalDays ?? 30;

  const ids: string[] = [];

  for (let offset = 0; offset < totalDays; offset += schedule.intervalDays) {
    const date = addDays(startDate, offset);
    date.setHours(hour, minute, 0, 0);

    if (date <= new Date()) continue;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc uống thuốc",
        body: createNotificationContent(schedule),
        data: {
          scheduleId: schedule.scheduleId,
          date: date.toISOString(),
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
      },
    });

    ids.push(id);
  }

  return ids;
};

export const cancelMedicationNotification = async (scheduleId: number) => {
  const map = await getNotificationMap();
  const ids = map[scheduleId];

  if (!ids?.length) return;

  for (const id of ids) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  delete map[scheduleId];
  await saveNotificationMap(map);
};

export const updateMedicationNotification = async (
  schedule: MedicationSchedule
) => {
  await cancelMedicationNotification(schedule.scheduleId);
  await scheduleMedicationNotification(schedule);
};

export const scheduleMedicationNotification = async (
  schedule: MedicationSchedule
) => {
  let ids: string[] = [];

  switch (schedule.frequencyType) {
    case "DAILY":
      ids = await createDailySchedule(schedule);
      break;

    case "WEEKLY":
      ids = await createWeeklySchedule(schedule);
      break;

    case "INTERVAL":
      ids = await createEveryXDaySchedule(schedule, { totalDays: 30 });
      break;
  }

  if (ids.length > 0) {
    await addNotificationsForSchedule(schedule.scheduleId, ids);
  }

  return ids;
};

export async function syncMedicationNotifications(
  schedules: MedicationSchedule[]
) {
  const map = await getNotificationMap();

  for (const schedule of schedules) {
    const hasLocal = !!map[schedule.scheduleId];

    // active
    if (schedule.status === 0) {
      if (!hasLocal || schedule.edited) {
        await updateMedicationNotification(schedule);
      }
    }

    // paused / stopped
    if (schedule.status !== 0 && hasLocal) {
      await cancelMedicationNotification(schedule.scheduleId);
    }
  }
}
