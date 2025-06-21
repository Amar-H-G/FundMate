import { FaSignInAlt, FaUserPlus, FaChartLine } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.2,
      },
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
      {/* Main Header - Always visible */}
      <motion.header
        className="bg-white shadow-sm sticky top-0 z-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2 z-[60]" // Higher z-index than sidebar
            variants={itemVariants}
          >
            <FaChartLine className="text-indigo-600 text-2xl" />
            <span className="text-xl font-bold text-indigo-700">Fundmate</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex space-x-8"
            variants={containerVariants}
          >
            <motion.a
              href="#features"
              className="text-gray-700 hover:text-indigo-600 transition"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.a>
            <motion.a
              href="#about"
              className="text-gray-700 hover:text-indigo-600 transition"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.a>
            <motion.a
              href="#contact"
              className="text-gray-700 hover:text-indigo-600 transition"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.a>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-700 z-[60]" // Higher z-index than sidebar
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>

          {/* Auth Buttons - Desktop */}
          <motion.div
            className="hidden md:flex space-x-4"
            variants={containerVariants}
          >
            <motion.button
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignInAlt />
              <span>Login</span>
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserPlus />
              <span>Register</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay and Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <>
            {/* Blur Overlay */}
            <motion.div
              className="fixed inset-0  bg-opacity-30 backdrop-blur-md z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-2xl"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="h-full flex flex-col pt-6 px-6">
                {/* Menu Items */}
                <nav className="flex-1 flex flex-col space-y-8 mt-16">
                  <motion.a
                    href="#features"
                    className="text-2xl text-gray-700 hover:text-indigo-600 transition py-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </motion.a>
                  <motion.a
                    href="#about"
                    className="text-2xl text-gray-700 hover:text-indigo-600 transition py-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="text-2xl text-gray-700 hover:text-indigo-600 transition py-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </motion.a>
                </nav>

                {/* Auth Buttons */}
                <div className="mt-auto space-y-4 pt-6 border-t border-gray-200 pb-8">
                  <motion.button
                    className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </motion.button>
                  <motion.button
                    className="w-full flex items-center justify-center space-x-2 border border-indigo-600 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-50 transition"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaUserPlus />
                    <span>Register</span>
                  </motion.button>
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
