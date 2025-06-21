import { useState, useEffect, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import FundCard from "./FundCard";
import FundMateLoader from "./LoadingSpinner";

export default function Dashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [funds, setFunds] = useState([]);
  const [randomFunds, setRandomFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedFunds, setSavedFunds] = useState([]);
  const debounceRef = useRef(null);

  const fetchRandomFunds = async () => {
    const min = 100027;
    const max = 153618;
    const targetCount = 10;
    const maxAttempts = 25;

    const randomSchemeCodes = new Set();
    while (randomSchemeCodes.size < maxAttempts) {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      randomSchemeCodes.add(rand);
    }

    const fetches = Array.from(randomSchemeCodes).map((code) =>
      axios.get(`https://api.mfapi.in/mf/${code}`).catch(() => null)
    );

    const results = await Promise.allSettled(fetches);
    const validFunds = [];

    for (const result of results) {
      if (result.status === "fulfilled" && result.value?.data?.meta) {
        const meta = result.value.data.meta;
        const latestData = result.value.data.data?.[0];

        if (meta && latestData) {
          validFunds.push({
            schemeCode: meta.scheme_code,
            schemeName: meta.scheme_name,
            schemeCategory: meta.scheme_category,
            schemeType: meta.scheme_type,
            latestNav: latestData.nav,
            latestDate: latestData.date,
          });
        }
      }
      if (validFunds.length === targetCount) break;
    }

    setRandomFunds(validFunds);
  };

  useEffect(() => {
    fetchRandomFunds();
  }, []);

  const handleSearch = async (searchValue = searchQuery) => {
    if (!searchValue.trim()) {
      setFunds([]);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFunds([]);
      setRandomFunds([]);

      const res = await axios.get(
        `https://api.mfapi.in/mf/search?q=${searchValue}`
      );
      setFunds(res.data);
    } catch (err) {
      setError("Failed to fetch funds. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    clearTimeout(debounceRef.current);

    if (value.trim()) {
      debounceRef.current = setTimeout(() => {
        handleSearch(value);
      }, 500);
    } else {
      setFunds([]);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    handleSearch();
  };

  const handleShowRecommended = async () => {
    setSearchQuery("");
    setFunds([]);
    setError("");
    setLoading(true);
    try {
      await fetchRandomFunds();
    } catch (err) {
      console.error("Failed to fetch random funds", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back,{" "}
                <span className="text-indigo-600">{user?.name}</span>
              </h1>
              <p className="mt-1 text-gray-600">
                Discover and analyze the best mutual funds for your portfolio
              </p>
            </div>
            <Link
              to="saved"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <span>View Saved Funds</span>
              <svg
                className="w-4 h-4 ml-2 -mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <label
                htmlFor="search"
                className="text-lg font-medium text-gray-700"
              >
                Find Mutual Funds
              </label>
              <div className="flex shadow-sm rounded-lg overflow-hidden">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search by fund name or category..."
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-r-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {loading && <FundMateLoader />}

        {funds.length > 0 && !loading && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Search Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {funds.map((fund) => (
                <FundCard
                  key={fund.schemeCode}
                  fund={fund}
                  isSaved={savedFunds.some(
                    (f) => f.schemeCode === fund.schemeCode
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {randomFunds.length > 0 && !loading && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Recommended Funds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {randomFunds.map((fund) => (
                <FundCard
                  key={fund.schemeCode}
                  fund={fund}
                  isSaved={savedFunds.some(
                    (f) => f.schemeCode === fund.schemeCode
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {funds.length === 0 && !loading && searchQuery && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-3 text-lg font-medium text-gray-900">
              No funds found
            </h3>
            <p className="mt-2 text-gray-500">
              We couldn't find any funds matching "
              <span className="font-medium">{searchQuery}</span>". Try a
              different keyword.
            </p>
            <button
              onClick={handleShowRecommended}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Show Recommended Funds
            </button>
          </div>
        )}

        {savedFunds.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Saved Funds
              </h2>
              <Link
                to="/saved"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <span>View All</span>
                <svg
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedFunds.slice(0, 3).map((fund) => (
                <FundCard key={fund.schemeCode} fund={fund} isSaved={true} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
