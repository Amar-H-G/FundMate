import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAuth } from "../Context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const FundDetail = () => {
  const { schemeCode } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFundDetails = async () => {
      try {
        const [detailRes, navRes] = await Promise.all([
          axios.get(`https://api.mfapi.in/mf/${schemeCode}`),
          user && axios.get(`/api/funds/check-saved/${schemeCode}`),
        ]);

        setFund(detailRes.data);
        if (user && navRes.data.isSaved) {
          setIsSaved(true);
        }
      } catch (err) {
        setError("Failed to fetch fund details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundDetails();
  }, [schemeCode, user]);

  const handleSaveFund = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setSaving(true);
    try {
      if (isSaved) {
        await axios.delete(`/api/funds/${schemeCode}`);
        setIsSaved(false);
      } else {
        await axios.post("/api/funds", {
          schemeCode,
          schemeName: fund.meta.scheme_name,
        });
        setIsSaved(true);
      }
    } catch (err) {
      setError("Failed to update saved funds");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!fund) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {fund.meta.scheme_name}
              </h1>
              <p className="text-gray-600 mt-2">Scheme Code: {schemeCode}</p>
            </div>
            <button
              onClick={handleSaveFund}
              disabled={saving}
              className={`px-4 py-2 rounded-md ${
                isSaved
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition`}
            >
              {saving ? "Processing..." : isSaved ? "Saved" : "Save Fund"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Fund Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Fund House:</span>{" "}
                  {fund.meta.fund_house}
                </p>
                <p>
                  <span className="font-medium">Scheme Category:</span>{" "}
                  {fund.meta.scheme_category}
                </p>
                <p>
                  <span className="font-medium">Scheme Type:</span>{" "}
                  {fund.meta.scheme_type}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Performance</h2>
              {fund.data.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">NAV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fund.data.slice(0, 5).map((item, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">{item.date}</td>
                          <td className="py-2 px-4 border-b">{item.nav}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No NAV data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetail;
