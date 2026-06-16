import SearchBar from './components/SearchBar'
import { useWeather } from './hooks/useWeather'

function App() {
  const { weather, loading, error, fetchWeather } = useWeather()

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div>
          <h2>{weather.city}, {weather.country}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  )
}

export default App