// Đổi đơn vị chỉ ở tầng hiển thị: dữ liệu gốc luôn là °C, không gọi lại API.
export function formatTemp(celsius, unit) {
  const value = unit === "F" ? (celsius * 9) / 5 + 32 : celsius;
  return `${Math.round(value)}°${unit}`;
}

const WEEKDAYS = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

// dateStr dạng "2026-10-14". Tách chuỗi thủ công để tránh lệch múi giờ của new Date(string).
export function parseDay(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return {
    weekday: WEEKDAYS[date.getDay()],
    label: `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`,
  };
}

// current.time dạng "2026-10-14T08:15" -> "08:15 14/10/2026"
export function formatUpdateTime(iso) {
  const [date, time] = iso.split("T");
  const [y, m, d] = date.split("-");
  return `${time} ${d}/${m}/${y}`;
}
