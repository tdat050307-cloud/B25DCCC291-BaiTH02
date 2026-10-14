// Chuyển mã thời tiết WMO của Open-Meteo thành biểu tượng + mô tả tiếng Việt.
export function describeWeather(code) {
  if (code === 0) return { icon: "☀️", text: "Trời quang" };
  if (code === 1) return { icon: "🌤️", text: "Ít mây" };
  if (code === 2) return { icon: "⛅", text: "Có mây" };
  if (code === 3) return { icon: "☁️", text: "Nhiều mây" };
  if (code === 45 || code === 48) return { icon: "🌫️", text: "Sương mù" };
  if (code >= 51 && code <= 57) return { icon: "🌦️", text: "Mưa phùn" };
  if (code >= 61 && code <= 67) return { icon: "🌧️", text: "Mưa" };
  if (code >= 71 && code <= 77) return { icon: "❄️", text: "Tuyết" };
  if (code >= 80 && code <= 82) return { icon: "🌧️", text: "Mưa rào" };
  if (code === 85 || code === 86) return { icon: "❄️", text: "Mưa tuyết" };
  if (code >= 95) return { icon: "⛈️", text: "Dông" };
  return { icon: "❓", text: "Không xác định" };
}
