function SearchBar({ onSearch }) {
  function handleSubmit(e) {
    e.preventDefault()
    const city = e.target.city.value.trim()
    if (city) onSearch(city)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="city"
        type="text"
        placeholder="Enter a city..."
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar