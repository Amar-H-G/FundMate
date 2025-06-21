import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";
import {
  FiUser,
  FiMail,
  FiLogOut,
  FiSettings,
  FiClock,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const { token, isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation configurations
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_FUNDMATE_BACKEND_URI}/api/user/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfileData(response.data);
        } catch (err) {
          setError("Failed to load profile data");
          console.error("Profile fetch error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    }
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <FiUser className="text-indigo-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Session Expired
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to access your profile
          </p>
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full max-w-xs mx-auto"
          >
            Sign In
          </button>
        </motion.div>
      </div>
    );
  }

  // Default data if API fails or is loading
  const defaultData = {
    fullName: "John Doe",
    email: "user@example.com",
    memberSince: "Jan 2023",
    lastLogin: "Today",
    accountType: token ? "Premium" : "Free",
    stats: {
      savedFunds: 24,
      activeAlerts: 12,
      unreadMessages: 5,
    },
  };

  const displayData = loading ? defaultData : profileData || defaultData;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          variants={item}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </motion.button>

        {error && (
          <motion.div
            variants={item}
            className="bg-red-50 text-red-700 p-4 rounded-lg mb-6"
          >
            {error} - Showing default profile information
          </motion.div>
        )}

        {/* Profile Header */}
        <motion.div
          variants={item}
          className="flex flex-col items-center mb-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1 mb-4 shadow-xl"
          >
            <div className="bg-white rounded-full p-1 h-full w-full">
              <div className="bg-gray-100 rounded-full h-full w-full flex items-center justify-center">
                <FiUser className="text-indigo-600 text-5xl" />
              </div>
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-lg text-gray-600 mt-2">
            {displayData.accountType} Member
          </p>
        </motion.div>

        {/* Main Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <motion.div variants={item} className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Personal Information
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-start mb-6">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <FiUser className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {displayData.name || user?.name || "Not available"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <FiMail className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Email Address
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {displayData.email || user?.email || "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <motion.div
              variants={item}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                  <FiCalendar className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Member Since
                </h3>
                <p className="text-gray-600">{displayData.memberSince}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                  <FiClock className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Last Login
                </h3>
                <p className="text-gray-600">{displayData.lastLogin}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                  <FiUser className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Account Type
                </h3>
                <p className="text-gray-600">{displayData.accountType}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Actions */}
          <motion.div variants={item} className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Account Actions
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <FiSettings className="text-indigo-600 mr-3" />
                    <span>Account Settings</span>
                  </div>
                  <span className="text-indigo-600">→</span>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <FiUser className="text-indigo-600 mr-3" />
                    <span>Edit Profile</span>
                  </div>
                  <span className="text-indigo-600">→</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-between px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <FiLogOut className="mr-3" />
                    <span>Logout</span>
                  </div>
                  <span>→</span>
                </button>
              </div>
            </div>

            {!token && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="mb-4 opacity-90">
                  Unlock exclusive features and benefits
                </p>
                <button className="w-full bg-white text-indigo-600 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                  Upgrade Now
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
