export const UNIT_OPTIONS = [
  { id: 1, label: "Viên" },
  { id: 2, label: "Gói" },
  { id: 3, label: "Ống" },
  { id: 4, label: "Thể tích (ml)" },
];

export const FREQUENCY_OPTIONS = [
  { value: "DAILY", label: "Hàng ngày" },
  { value: "WEEKLY", label: "Hằng tuần" },
  { value: "INTERVAL", label: "Cách ngày" },
];

export const WEEK_DAYS = [
  { value: "MONDAY", label: "Thứ Hai" },
  { value: "TUESDAY", label: "Thứ Ba" },
  { value: "WEDNESDAY", label: "Thứ Tư" },
  { value: "THURSDAY", label: "Thứ Năm" },
  { value: "FRIDAY", label: "Thứ Sáu" },
  { value: "SATURDAY", label: "Thứ Bảy" },
  { value: "SUNDAY", label: "Chủ nhật" },
];

export const WEEK_DAYS_DISPLAY: Record<string, string>= {
  MONDAY: "Thứ Hai",
  TUESDAY: "Thứ Ba",
  WEDNESDAY: "Thứ Tư",
  THURSDAY: "Thứ Năm",
  FRIDAY: "Thứ Sáu",
  SATURDAY: "Thứ Bảy",
  SUNDAY: "Chủ nhật",
}

export const WEEK_ORDER = WEEK_DAYS.map(d => d.value);
