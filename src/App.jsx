import { useState } from "react";
import { CITIES } from "./data/cities.js";
import { useWeather } from "./hooks/useWeather.js";
import CityList from "./components/CityList.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Forecast from "./components/Forecast.jsx";
import UnitToggle from "./components/UnitToggle.jsx";

export default function App() {
  const [selectedId, setSelectedId] = useState(null); // null = chưa chọn thành phố
  const [unit, setUnit] = useState("C");

  const city = CITIES.find((c) => c.id === selectedId) ?? null;
  const { status, data, error, retry } = useWeather(city);

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
          onSelect={setSelectedId}
        />

        <div className="content">
          {status === "idle" && (
            <p className="message">Hãy chọn một thành phố để xem thời tiết.</p>
          )}

          {status === "loading" && <p className="message">Đang tải dữ liệu…</p>}

          {status === "error" && (
            <div className="message error" role="alert">
              <p>Không tải được dữ liệu: {error}</p>
              <button type="button" onClick={retry}>
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
