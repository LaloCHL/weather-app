function SearchBar({ onSearch }) {
  function handleSubmit(e) {
    e.preventDefault()
    const city = e.target.city.value.trim()
    if (city) onSearch(city)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
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
  )
}

export default SearchBar