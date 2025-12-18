import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MedicationSchedule } from "@/app/types/medication";
import { mapWeekDayToNumber } from "@/constants/medication";
import { Platform } from "react-native";

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

type ScheduleMedicationParams = {
  scheduleId: number;
  drugName: string;
  time: string; // "08:00"
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
const secondsUntilNextTime = (hour: number, minute: number) => {
  const now = new Date();
  const target = new Date();

  target.setHours(hour, minute, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  return Math.floor((target.getTime() - now.getTime()) / 1000);
};

const SECONDS_IN_WEEK = 7 * 24 * 60 * 60;
// hàm tạo schedule nhắc hằng ngày
const createDailySchedule = async (
  schedule: MedicationSchedule
): Promise<string[]> => {
  const [hour, minute] = getHour(schedule.time);

  // 🟢 iOS
  if (Platform.OS === "ios") {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc uống thuốc",
        body: createNotificationContent(schedule),
        data: { scheduleId: schedule.scheduleId },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour,
        minute,
        repeats: true,
      },
    });

    return [id];
  }

  // 🟡 Android
  const seconds = secondsUntilNextTime(hour, minute);

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nhắc uống thuốc",
      body: createNotificationContent(schedule),
      data: { scheduleId: schedule.scheduleId },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: true, // Android OK với TIME_INTERVAL
    },
  });

  return [id];
};

// hàm tạo schedule nhắc theo tuần
const createWeeklySchedule = async (
  schedule: MedicationSchedule
): Promise<string[]> => {
  const [hour, minute] = getHour(schedule.time);
  const ids: string[] = [];

  for (const day of schedule.daysOfWeek) {
    const weekday = mapWeekDayToNumber(day);

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc uống thuốc",
        body: createNotificationContent(schedule),
        data: {
          scheduleId: schedule.scheduleId,
          weekday: day,
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        weekday,
        hour,
        minute,
        repeats: true,
      },
    });

    ids.push(id);
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

    if (date.getTime() <= Date.now()) continue;

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
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour,
        minute,
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
