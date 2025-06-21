import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import FundCard from "../components/FundCard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const searchFunds = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`https://api.mfapi.in/mf/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      setError("Failed to fetch funds. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={searchFunds} className="mb-8">
          <div className="flex shadow-md rounded-lg overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mutual funds..."
              className="flex-grow px-4 py-3 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {results.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-8">
            {query
              ? "No funds found. Try a different search."
              : "Enter a search term to find mutual funds"}
          </div>
        )}

        <div className="grid gap-6">
          {results.map((fund) => (
            <FundCard
              key={fund.schemeCode}
              fund={fund}
              isAuthenticated={!!user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
