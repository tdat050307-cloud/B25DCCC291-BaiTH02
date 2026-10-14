import { useState } from "react";
import { CITIES } from "./data/cities.js";
import { fetchWeather } from "./api/weatherApi.js";
import CityList from "./components/CityList.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Forecast from "./components/Forecast.jsx";
import UnitToggle from "./components/UnitToggle.jsx";

export default function App() {
  const [selectedId, setSelectedId] = useState(null); // null = chưa chọn thành phố
  const [unit, setUnit] = useState("C");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "error" | "success"
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // Hàm chạy khi bấm vào một thành phố (và khi bấm "Thử lại")
  async function handleSelect(id) {
    const city = CITIES.find((c) => c.id === id);

    setSelectedId(id);
    setStatus("loading");

    try {
      const result = await fetchWeather(city);
      setData(result);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  const city = CITIES.find((c) => c.id === selectedId);

  return (
    <div className="app">
      <header className="header">
        <h1>Thời tiết Việt Nam</h1>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <main className="layout">
        <CityList
          cities={CITIES}
          selectedId={selectedId}
          onSelect={handleSelect}
        />

        <div className="content">
          {status === "idle" && (
            <p className="message">Hãy chọn một thành phố để xem thời tiết.</p>
          )}

          {status === "loading" && <p className="message">Đang tải dữ liệu…</p>}

          {status === "error" && (
            <div className="message error" role="alert">
              <p>Không tải được dữ liệu: {error}</p>
              <button type="button" onClick={() => handleSelect(selectedId)}>
                Thử lại
              </button>
            </div>
          )}

          {status === "success" && (
            <>
              <CurrentWeather
                cityName={city.name}
                current={data.current}
                unit={unit}
              />
              <Forecast daily={data.daily} unit={unit} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
