import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Login from "./Login";
import {
  FaArrowRight,
  FaChartLine,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";
import { motion } from "framer-motion";

const PreLoginHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          initial={{ y: 40, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 4,
                    }}
                  >
                    <FaChartLine className="text-white text-lg sm:text-xl" />
                  </motion.div>
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-semibold bg-blue-100 text-blue-600 px-2 sm:px-3 py-1 rounded-full">
                    PREMIUM EDITION
                  </span>
                </div>

                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Next-Gen
                  </span>{" "}
                  Financial Analytics
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Institutional-grade tools for professional investors.
                  Real-time insights with unmatched precision.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <button
                    onClick={handleGetStarted}
                    className="flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
                  >
                    <span>Get Started</span>
                    <FaArrowRight className="ml-1 sm:ml-2" />
                  </button>
                  <button className="px-6 sm:px-8 py-2.5 sm:py-3.5 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition text-sm sm:text-base">
                    Live Demo
                  </button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Graphic - Changes on mobile */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden min-h-[300px] sm:min-h-[400px]">
              {/* Background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-20 sm:w-32 h-20 sm:h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/4 w-24 sm:w-40 h-24 sm:h-40 bg-white rounded-full"></div>
              </div>

              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Mobile: Simplified floating cards */}
                <motion.div
                  className="hidden sm:block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-lg absolute -top-8 sm:-top-16 left-0 w-48 sm:w-64"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaShieldAlt className="text-white text-sm sm:text-base" />
                    </div>
                    <span className="ml-2 text-white font-medium text-sm sm:text-base">
                      Security
                    </span>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm">
                    Bank-level encryption for all your data
                  </p>
                </motion.div>

                <motion.div
                  className="hidden sm:block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-lg absolute -bottom-8 sm:-bottom-16 right-0 w-48 sm:w-64"
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaRocket className="text-white text-sm sm:text-base" />
                    </div>
                    <span className="ml-2 text-white font-medium text-sm sm:text-base">
                      Performance
                    </span>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm">
                    Real-time updates with no latency
                  </p>
                </motion.div>

                {/* Main Card - Responsive sizing */}
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl w-full max-w-[280px] sm:w-80 h-64 sm:h-80 flex flex-col justify-center">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white/30 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
                      <FaChartLine className="text-white text-xl sm:text-2xl" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                      $1.2M+
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm md:text-base">
                      Assets Under Tracking
                    </p>
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden mb-2 sm:mb-3">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "72%" }}
                      transition={{ delay: 1, duration: 1.5 }}
                    />
                  </div>
                  <p className="text-center text-white/80 text-xs sm:text-sm">
                    Monthly growth: 12.4%
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Background floating elements - Hidden on smallest screens */}
        <motion.div
          className="hidden sm:block absolute top-1/4 left-4 sm:left-10 w-4 sm:w-6 h-4 sm:h-6 bg-blue-400/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="hidden sm:block absolute bottom-1/4 right-4 sm:right-16 w-5 sm:w-8 h-5 sm:h-8 bg-blue-600/20 rounded-full"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    </div>
  );
};

export default PreLoginHome;
