import { useEffect, useState, useCallback } from "react";
import { fetchWeather } from "../api/weatherApi.js";

// Hook quản lý trạng thái: idle (chưa chọn) | loading | error | success
export function useWeather(city) {
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
  });
  const [attempt, setAttempt] = useState(0); // tăng lên để gọi lại khi bấm "Thử lại"

  useEffect(() => {
    if (!city) {
      setState({ status: "idle", data: null, error: null });
      return;
    }

    // AbortController hủy request cũ khi đổi thành phố nhanh -> tránh dữ liệu cũ ghi đè dữ liệu mới.
    const controller = new AbortController();
    setState({ status: "loading", data: null, error: null });

    fetchWeather(city, controller.signal)
      .then((data) => setState({ status: "success", data, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ status: "error", data: null, error: err.message });
      });

    return () => controller.abort();
  }, [city, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
}
