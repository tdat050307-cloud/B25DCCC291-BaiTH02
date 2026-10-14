export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit-toggle" role="group" aria-label="Đơn vị nhiệt độ">
      {["C", "F"].map((u) => (
        <button
          key={u}
          type="button"
          className={u === unit ? "active" : ""}
          aria-pressed={u === unit}
          onClick={() => onChange(u)}
        >
          °{u}
        </button>
      ))}
    </div>
  );
}
