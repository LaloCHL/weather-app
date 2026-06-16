import { useState } from 'react'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchByCoords(latitude, longitude, locationName, country) {
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    )
    const weatherData = await weatherRes.json()

    return {
      city: locationName,
      country,
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed,
      weathercode: weatherData.current_weather.weathercode,
      forecast: weatherData.daily.time.map((date, i) => ({
        date,
        max: weatherData.daily.temperature_2m_max[i],
        min: weatherData.daily.temperature_2m_min[i],
        code: weatherData.daily.weathercode[i],
      })).slice(1, 6)
    }
  }

  async function fetchWeather(city) {
    setLoading(true)
    setError(null)
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      )
      const geoData = await geoRes.json()
      if (!geoData.results || geoData.results.length === 0)
        throw new Error("City not found")
      const { latitude, longitude, name, country } = geoData.results[0]
      const data = await fetchByCoords(latitude, longitude, name, country)
      setWeather(data)
      saveRecent(name)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function fetchByLocation() {
    setLoading(true)
    setError(null)
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej)
      )
      const { latitude, longitude } = pos.coords
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=&latitude=${latitude}&longitude=${longitude}&count=1`
      )
      const data = await fetchByCoords(latitude, longitude, "My Location", "")
      setWeather(data)
    } catch (err) {
      setError("Could not get your location")
    } finally {
      setLoading(false)
    }
  }

  function saveRecent(city) {
    const prev = JSON.parse(localStorage.getItem('recent') || '[]')
    const updated = [city, ...prev.filter(c => c !== city)].slice(0, 5)
    localStorage.setItem('recent', JSON.stringify(updated))
  }

  function getRecent() {
    return JSON.parse(localStorage.getItem('recent') || '[]')
  }

  return { weather, loading, error, fetchWeather, fetchByLocation, getRecent }
}