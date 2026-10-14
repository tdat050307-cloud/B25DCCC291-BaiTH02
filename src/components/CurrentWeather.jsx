import { describeWeather } from "../utils/weatherCodes.js";
import { formatTemp, formatUpdateTime } from "../utils/format.js";

export default function CurrentWeather({ cityName, current, unit }) {
  const { icon, text } = describeWeather(current.code);

  return (
    <section className="card current">
      <h2>{cityName}</h2>
      <div className="current-main">
        <span className="big-icon" aria-hidden="true">
          {icon}
        </span>
        <div>
          <div className="temp">{formatTemp(current.temp, unit)}</div>
          <div className="desc">{text}</div>
        </div>
      </div>
      <ul className="details">
        <li>
          Độ ẩm: <strong>{current.humidity}%</strong>
        </li>
        <li>
          Gió: <strong>{current.wind} km/h</strong>
        </li>
        <li>
          Cập nhật: <strong>{formatUpdateTime(current.time)}</strong>
        </li>
      </ul>
    </section>
  );
}
