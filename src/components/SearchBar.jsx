function SearchBar({ onSearch, onLocate, recent }) {
  function handleSubmit(e) {
    e.preventDefault()
    const city = e.target.city.value.trim()
    if (city) onSearch(city)
  }

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          name="city"
          type="text"
          placeholder="Enter a city..."
          className="flex-1 bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:border-blue-400 transition"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-5 py-3 rounded-xl transition"
        >
          Search
        </button>
      </form>

      <button
        onClick={onLocate}
        className="mt-2 w-full text-blue-300 hover:text-white text-sm py-2 transition flex items-center justify-center gap-2"
      >
        📍 Use my location
      </button>

      {recent.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {recent.map(city => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              className="bg-white/10 hover:bg-white/20 text-blue-200 text-xs px-3 py-1 rounded-full transition"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar