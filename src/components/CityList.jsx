export default function CityList({ cities, selectedId, onSelect }) {
  return (
    <nav className="city-list" aria-label="Danh sách thành phố">
      <h2>Thành phố</h2>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            <button
              type="button"
              className={
                city.id === selectedId ? "city-btn active" : "city-btn"
              }
              aria-pressed={city.id === selectedId}
              onClick={() => onSelect(city.id)}
            >
              {city.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
