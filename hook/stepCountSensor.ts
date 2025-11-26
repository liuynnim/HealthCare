import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";

export function useStepCounter() {
  const [stepsToday, setStepsToday] = useState(0);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    // Kiểm tra cảm biến có hoạt động không (Android + iOS)
    Pedometer.isAvailableAsync().then(setIsAvailable);

    // --- Lấy số bước từ đầu ngày ---
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();

    Pedometer.getStepCountAsync(start, end)
      .then(result => setStepsToday(result.steps))
      .catch(e => console.log("Error getStepCount", e));

    // --- Lắng nghe real-time khi người dùng di chuyển ---
    const sub = Pedometer.watchStepCount(result => {
      setStepsToday(prev => prev + result.steps);
    });

    return () => sub && sub.remove();
  }, []);

  return { stepsToday, isAvailable };
}