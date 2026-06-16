import SearchBar from './components/SearchBar'
import { useWeather } from './hooks/useWeather'
import Forecast from './components/Forecast'

function App() {
  const { weather, loading, error, fetchWeather } = useWeather()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex flex-col items-center justify-start pt-20 px-4">
      <h1 className="text-white text-5xl font-bold mb-2 tracking-tight">Weather</h1>
      <p className="text-blue-300 text-sm mb-10">Enter a city to get the current weather</p>

      <SearchBar onSearch={fetchWeather} />

      {loading && (
        <p className="text-blue-300 mt-10 animate-pulse">Loading...</p>
      )}

      {error && (
        <div className="mt-10 bg-red-500/20 border border-red-500/40 text-red-300 px-6 py-4 rounded-xl">
          {error}
        </div>
      )}

      {weather && (
        <div className="mt-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-white w-full max-w-sm text-center">
          <h2 className="text-3xl font-bold">{weather.city}</h2>
          <p className="text-blue-300 text-sm mb-6">{weather.country}</p>
          <p className="text-7xl font-thin mb-6">{weather.temperature}°</p>
          <div className="border-t border-white/20 pt-4 text-sm text-blue-200">
            Wind: {weather.windspeed} km/h
          </div><Forecast forecast={weather.forecast} />
        </div>
      )}
    </div>
  )
}

export default App