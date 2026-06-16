import { useState } from 'react'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchWeather(city) {
    setLoading(true)
    setError(null)

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      )
      const geoData = await geoRes.json()

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found")
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      )
      const weatherData = await weatherRes.json()

      setWeather({
        city: name,
        country,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
        forecast: weatherData.daily.time.map((date, i) => ({
          date,
          max: weatherData.daily.temperature_2m_max[i],
          min: weatherData.daily.temperature_2m_min[i],
          code: weatherData.daily.weathercode[i],
        })).slice(1, 6) // next 5 days, skip today
      })

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { weather, loading, error, fetchWeather }
}