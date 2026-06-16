import { useState } from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import { useWeather } from './hooks/useWeather'

function App() {
  const { weather, loading, error, fetchWeather, fetchByLocation, getRecent } = useWeather()
  const [unit, setUnit] = useState('C')
  const [recent, setRecent] = useState(getRecent())

  function handleSearch(city) {
    fetchWeather(city)
    setTimeout(() => setRecent(getRecent()), 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex flex-col items-center justify-start pt-20 px-4 pb-20">
      <h1 className="text-white text-5xl font-bold mb-2 tracking-tight">Weather</h1>
      <p className="text-blue-300 text-sm mb-10">Enter a city to get the current weather</p>

      <SearchBar
        onSearch={handleSearch}
        onLocate={fetchByLocation}
        recent={recent}
      />

      {loading && (
        <div className="mt-10 w-full max-w-sm">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 animate-pulse">
            <div className="h-8 bg-white/20 rounded mb-3 w-1/2 mx-auto"></div>
            <div className="h-4 bg-white/10 rounded mb-6 w-1/3 mx-auto"></div>
            <div className="h-20 bg-white/10 rounded mb-4 w-1/3 mx-auto"></div>
            <div className="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-10 bg-red-500/20 border border-red-500/40 text-red-300 px-6 py-4 rounded-xl">
          {error}
        </div>
      )}

      {weather && !loading && (
        <>
          <CurrentWeather
            weather={weather}
            unit={unit}
            onToggleUnit={() => setUnit(u => u === 'C' ? 'F' : 'C')}
          />
          <Forecast forecast={weather.forecast} unit={unit} />
        </>
      )}
    </div>
  )
}

export default App