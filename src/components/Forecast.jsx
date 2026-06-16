const ICONS = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "🌨️", 73: "🌨️", 75: "❄️",
  80: "🌦️", 81: "🌧️", 82: "⛈️",
  95: "⛈️", 96: "⛈️", 99: "⛈️",
}

function getIcon(code) { return ICONS[code] || "🌡️" }

function formatDay(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
}

function Forecast({ forecast, unit }) {
  function convert(temp) {
    return unit === 'C' ? Math.round(temp) : Math.round(temp * 9 / 5 + 32)
  }

  return (
    <div className="mt-4 w-full max-w-sm grid grid-cols-5 gap-2">
      {forecast.map((day) => (
        <div
          key={day.date}
          className="bg-white/10 border border-white/20 rounded-xl p-2 text-center text-white"
        >
          <p className="text-xs text-blue-300 mb-1">{formatDay(day.date)}</p>
          <p className="text-xl mb-1">{getIcon(day.code)}</p>
          <p className="text-xs font-semibold">{convert(day.max)}°</p>
          <p className="text-xs text-blue-300">{convert(day.min)}°</p>
        </div>
      ))}
    </div>
  )
}

export default Forecast