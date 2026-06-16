const ICONS = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "🌨️", 73: "🌨️", 75: "❄️",
  80: "🌦️", 81: "🌧️", 82: "⛈️",
  95: "⛈️", 96: "⛈️", 99: "⛈️",
}

function getIcon(code) {
  return ICONS[code] || "🌡️"
}

function CurrentWeather({ weather, unit, onToggleUnit }) {
  const temp = unit === 'C'
    ? weather.temperature
    : Math.round(weather.temperature * 9 / 5 + 32)

  return (
    <div className="mt-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-white w-full max-w-sm text-center">
      <h2 className="text-3xl font-bold">{weather.city}</h2>
      <p className="text-blue-300 text-sm mb-4">{weather.country}</p>
      <p className="text-6xl mb-2">{getIcon(weather.weathercode)}</p>
      <p className="text-7xl font-thin mb-2">{temp}°</p>
      <button
        onClick={onToggleUnit}
        className="text-blue-300 hover:text-white text-sm mb-6 transition"
      >
        Switch to °{unit === 'C' ? 'F' : 'C'}
      </button>
      <div className="border-t border-white/20 pt-4 text-sm text-blue-200">
        💨 Wind: {weather.windspeed} km/h
      </div>
    </div>
  )
}

export default CurrentWeather