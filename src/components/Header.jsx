import React from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const links = ["Home", "About", "Skills", "Projects", "Achievements", "Contact"];

  return (
    <header className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          John Doe
        </motion.h1>
        <motion.div
          className="hidden md:flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {links.map((link, index) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ scale: 1.1 }}
              className="hover:text-blue-500 dark:hover:text-blue-300 transition"
            >
              {link}
            </motion.a>
          ))}
        </motion.div>
        <motion.button
          onClick={toggleTheme}
          className="ml-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </motion.button>
      </nav>
    </header>
  );
};

export default Header;
