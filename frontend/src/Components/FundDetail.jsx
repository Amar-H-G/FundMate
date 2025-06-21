import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import FundPerformanceChart from "../Components/PerformanceChart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FundDetail() {
  const { schemeCode } = useParams();
  const navigate = useNavigate();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isCheckingSaved, setIsCheckingSaved] = useState(false);

  const { token, isAuthenticated } = useAuth();

  const backendBaseUrl = import.meta.env.VITE_FUNDMATE_BACKEND_URI;

  useEffect(() => {
    if (!backendBaseUrl) {
      console.error("Backend base URL is not configured!");
      toast.error("Server configuration error");
    }
  }, []);

  useEffect(() => {
    if (!schemeCode) {
      setError("Invalid Scheme Code");
      setLoading(false);
      return;
    }

    const fetchFundDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);
        setFund(res.data);

        if (token) {
          await checkIfSaved();
        }
      } catch (err) {
        setError("Failed to fetch fund details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundDetails();
  }, [schemeCode, token]);

  const checkIfSaved = async () => {
    if (!backendBaseUrl) return;

    try {
      setIsCheckingSaved(true);
      const res = await axios.get(
        `${backendBaseUrl}/api/funds/check-saved/${schemeCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSaved(res.data?.isSaved || false);
    } catch (err) {
      console.error("Failed to check saved status", err);
    } finally {
      setIsCheckingSaved(false);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to save funds");
      return navigate("/signin");
    }

    if (!backendBaseUrl) {
      toast.error("Server configuration error");
      return;
    }

    if (!fund?.meta?.scheme_code) {
      toast.error("Invalid fund data");
      return;
    }

    try {
      if (isSaved) {
        await axios.delete(`${backendBaseUrl}/api/funds/${schemeCode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsSaved(false);
        toast.success("Fund removed from your saved list");
      } else {
        await axios.post(
          `${backendBaseUrl}/api/funds`,
          {
            schemeCode: fund.meta.scheme_code,
            schemeName: fund.meta.scheme_name,
            fundHouse: fund.meta.fund_house,
            schemeCategory: fund.meta.scheme_category,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsSaved(true);
        toast.success("Fund added to your saved list");
      }
    } catch (err) {
      console.error("Failed to update saved status", err);
      toast.error(
        err.response?.data?.message || "Failed to update saved status"
      );
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !fund) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Fund
          </h2>
          <p className="text-gray-600 mb-6">{error || "Unknown error"}</p>
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={handleGoBack}
            className="text-indigo-600 hover:text-indigo-500 flex items-center"
          >
            ← Back
          </button>

          {isAuthenticated && (
            <button
              onClick={handleSave}
              disabled={isCheckingSaved}
              className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                isCheckingSaved
                  ? "bg-gray-100 text-gray-500"
                  : isSaved
                  ? "bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
              }`}
            >
              {isCheckingSaved
                ? "Checking..."
                : isSaved
                ? "Saved"
                : "Save Fund"}
            </button>
          )}
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b">
            <h1 className="text-2xl font-bold text-gray-900">
              {fund.meta.scheme_name}
            </h1>
            <p className="text-sm text-gray-600">
              {fund.meta.scheme_category} | {fund.meta.fund_house}
            </p>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Performance Chart</h2>
            <div className="h-96">
              <FundPerformanceChart data={fund.data} />
            </div>

            <h2 className="text-lg font-semibold mt-8 mb-4">NAV History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NAV (₹)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fund.data.slice(0, 10).map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 font-medium">
                        {parseFloat(item.nav).toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
