import {
  FaSignInAlt,
  FaUserPlus,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // ✅ simple context

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout, isAuthenticated } = useAuth(); // ✅ simplified auth
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.2 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: {
      opacity: 1,
      backdropFilter: "blur(8px)",
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <motion.header
        className="bg-white shadow-sm sticky top-0 z-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2 z-[60]"
            variants={itemVariants}
          >
            <FaChartLine className="text-indigo-600 text-2xl" />
            <span className="text-xl font-bold text-indigo-700">Fundmate</span>
          </motion.div>

          <motion.nav
            className="hidden md:flex space-x-8"
            variants={containerVariants}
          >
            {["features", "about", "contact"].map((section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                className="text-gray-700 hover:text-indigo-600"
                variants={itemVariants}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.a>
            ))}
          </motion.nav>

          <motion.button
            className="md:hidden text-gray-700 z-[60]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variants={itemVariants}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>

          <motion.div
            className="hidden md:flex space-x-4"
            variants={containerVariants}
          >
            {isAuthenticated ? (
              <>
                <motion.button
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                  variants={itemVariants}
                >
                  <FaUserCircle />
                  <span>Profile</span>
                </motion.button>
                <motion.button
                  onClick={logout}
                  className="flex items-center space-x-2 border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
                  variants={itemVariants}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  onClick={() => navigate("/signin")}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  variants={itemVariants}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </motion.button>
                <motion.button
                  onClick={() => navigate("/signup")}
                  className="flex items-center space-x-2 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50"
                  variants={itemVariants}
                >
                  <FaUserPlus />
                  <span>Register</span>
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <>
            <motion.div
              className="fixed inset-0 bg-opacity-30 backdrop-blur-md z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-2xl"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="h-full flex flex-col pt-6 px-6">
                <nav className="flex-1 flex flex-col space-y-8 mt-16">
                  {["features", "about", "contact"].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item}`}
                      className="text-2xl text-gray-700 hover:text-indigo-600"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-auto space-y-4 pt-6 border-t border-gray-200 pb-8">
                  {isAuthenticated ? (
                    <>
                      <motion.button
                        onClick={() => {
                          navigate("/profile");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <FaUserCircle />
                        <span>Profile</span>
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 border border-red-600 text-red-600 px-4 py-3 rounded-lg hover:bg-red-50"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => {
                          navigate("/signin");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <FaSignInAlt />
                        <span>Login</span>
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          navigate("/signup");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 border border-indigo-600 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-50"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <FaUserPlus />
                        <span>Register</span>
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
