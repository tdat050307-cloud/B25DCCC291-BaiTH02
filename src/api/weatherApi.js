const BASE_URL = "https://api.open-meteo.com/v1/forecast";

// Gọi API cho một thành phố, trả về dữ liệu đã gom gọn (nhiệt độ luôn là °C).
export async function fetchWeather(city) {
  const url =
    BASE_URL +
    "?latitude=" +
    city.lat +
    "&longitude=" +
    city.lon +
    "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
    "&timezone=Asia%2FHo_Chi_Minh" +
    "&forecast_days=7";

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Máy chủ trả về lỗi " + res.status);
  }
  const json = await res.json();

  // 4 mảng daily có cùng độ dài, phần tử thứ i thuộc cùng một ngày
  // -> ghép lại thành mảng 7 đối tượng, mỗi đối tượng là 1 ngày.
  const daily = json.daily.time.map((date, i) => ({
    date: date,
    code: json.daily.weather_code[i],
    max: json.daily.temperature_2m_max[i],
    min: json.daily.temperature_2m_min[i],
  }));

  return {
    current: {
      temp: json.current.temperature_2m,
      humidity: json.current.relative_humidity_2m,
      wind: json.current.wind_speed_10m,
      code: json.current.weather_code,
      time: json.current.time,
    },
    daily: daily,
  };
}
