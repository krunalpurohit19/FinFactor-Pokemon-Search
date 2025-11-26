import { useEffect, useState } from "react";
import PokemonCard from "./Components/PokemonCard";

export default function App() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allPokemon, setAllPokemon] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showHistory, setShowHistory] = useState(false);

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  // Load Pokémon list
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
      .then((res) => res.json())
      .then((data) => setAllPokemon(data.results.map((p) => p.name)));
  }, []);

  // Suggestion logic
  const handleInputChange = (value) => {
    setName(value);
    if (!value.trim()) return setSuggestions([]);

    const matches = allPokemon.filter((p) =>
      p.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestions(matches.slice(0, 5));
  };

  // Save to history
  const addToHistory = (pokemonName) => {
    const updated = [
      pokemonName,
      ...history.filter((h) => h !== pokemonName),
    ].slice(0, 5);

    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  const searchPokemon = async (selectedName) => {
    const query = selectedName || name;
    if (!query) return;

    setLoading(true);
    setError("");
    setPokemon(null);
    setSuggestions([]);

    try {
      const res = await fetch(
        `http://localhost:8080/api/pokemon/${query.toLowerCase()}`
      );

      if (!res.ok) throw new Error("Pokémon not found");

      const data = await res.json();
      setPokemon(data);
      addToHistory(query);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setName("");
      setActiveIndex(-1);
    }
  };

  // Close history dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".history-area")) setShowHistory(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-100 px-6 py-6 items-center">

      {/* ● TOP BAR */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-8">

        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight text-gray-800">Pokédex</h1>

        {/* Search Area */}
        <div className="relative flex-1 max-w-xl mx-6">
          <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-300 px-4 py-2">

            <input
              className="flex-1 bg-transparent outline-none px-1 text-gray-700"
              placeholder="Search Pokémon…"
              value={name}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  setActiveIndex((prev) =>
                    Math.min(prev + 1, suggestions.length - 1)
                  );
                }
                if (e.key === "ArrowUp") {
                  setActiveIndex((prev) => Math.max(prev - 1, 0));
                }
                if (e.key === "Enter") {
                  if (activeIndex >= 0) searchPokemon(suggestions[activeIndex]);
                  else searchPokemon();
                }
              }}
            />

            <button
              onClick={() => searchPokemon()}
              className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-5 py-2 ml-2 transition"
            >
              Search
            </button>
          </div>

          {/* Suggestion dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-md border border-gray-200 p-2 z-50">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg cursor-pointer capitalize transition 
                    ${activeIndex === i ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  onClick={() => {
                    searchPokemon(s);
                    setActiveIndex(-1);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Button */}
        <div className="relative history-area">
          <button
            onClick={() => setShowHistory((s) => !s)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 transition"
          >
            Recent Search ▼
          </button>

          {showHistory && (
            <div className="absolute right-0 mt-3 w-40 bg-white shadow-md border border-gray-200 rounded-xl p-2 z-40">
              {history.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-2">
                  No history
                </p>
              )}

              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    searchPokemon(h);
                    setShowHistory(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 capitalize text-sm"
                >
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ● MAIN OUTPUT */}
      <div className="flex-1 w-full flex justify-center overflow-auto no-scrollbar">
        {loading && (
          <div className="w-80 h-60 bg-gray-300 rounded-2xl animate-pulse shadow"></div>
        )}

        {error && <p className="text-red-600">{error}</p>}

        {pokemon && <PokemonCard pokemon={pokemon} />}
      </div>
    </div>
  );
}
