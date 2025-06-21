import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FundCard({ fund }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="space-y-2">
          <motion.h3
            className="text-xl font-semibold text-gray-900"
            whileHover={{ color: "#4f46e5" }}
          >
            {fund.schemeName}
          </motion.h3>
          <p className="text-sm text-gray-500">
            Scheme Code: <span className="font-mono">{fund.schemeCode}</span>
          </p>

          <div className="flex space-x-4 pt-2">
            <div className="text-sm">
              <p className="text-gray-500">Category</p>
              <p className="font-medium">{fund.category || "Equity"}</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-500">Risk</p>
              <p className="font-medium">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    fund.risk === "High"
                      ? "bg-red-100 text-red-800"
                      : fund.risk === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {fund.risk || "Moderate"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <motion.div
          className="mt-6 flex justify-between items-center"
          animate={{
            opacity: isHovered ? 1 : 0.9,
            y: isHovered ? 0 : 2,
          }}
        >
          <div className="text-sm">
            <p className="text-gray-500">1Y Returns</p>
            <p
              className={`text-lg font-bold ${
                (fund.returns || 0) >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {fund.returns ? `${fund.returns}%` : "12.5%"}
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`details/${fund.schemeCode}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              View Details
              <svg
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="h-1 bg-gray-100"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="h-full bg-indigo-500" style={{ width: "85%" }}></div>
      </motion.div>
    </motion.div>
  );
}
