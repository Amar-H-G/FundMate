import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FundMateLoader = ({ message = "Loading your funds..." }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="text-center max-w-xs w-full"
      >
        {/* Animated Logo/Icon */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className="mx-auto w-16 h-16 mb-6"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#6366F1"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M12 6V12L16 14"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                opacity: [0.3, 1, 0.3],
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                times: [0, 0.5, 1],
              }}
            />
          </svg>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Animated Text */}
        <motion.h3
          animate={{
            opacity: [0.7, 1, 0.7],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-lg font-medium text-gray-800 mb-1"
        >
          FundMate
        </motion.h3>

        <motion.p
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-sm text-gray-500"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FundMateLoader;
