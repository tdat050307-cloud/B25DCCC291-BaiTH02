import { describeWeather } from "../utils/weatherCodes.js";
import { formatTemp, parseDay } from "../utils/format.js";

export default function Forecast({ daily, unit }) {
  return (
    <section className="card forecast">
      <h2>Dự báo 7 ngày</h2>
      <ul>
        {daily.map((day) => {
          const { weekday, label } = parseDay(day.date);
          const { icon, text } = describeWeather(day.code);
          return (
            <li key={day.date} className="day">
              <span className="day-name">{weekday}</span>
              <span className="day-date">{label}</span>
              <span className="day-icon" title={text} aria-label={text}>
                {icon}
              </span>
              <span className="day-temp">
                <strong>{formatTemp(day.max, unit)}</strong>
                <span className="low"> / {formatTemp(day.min, unit)}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
