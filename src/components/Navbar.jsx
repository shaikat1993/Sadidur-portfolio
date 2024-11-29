import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { sadidur } from "../assets";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      // Check if we're at the top of the page
      if (scrollTop < 100) {
        setActive("home");
        return;
      }

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          setActive(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "about",
      title: "About",
    },
    {
      id: "experience",
      title: "Experience",
    },
    {
      id: "tech",
      title: "Tech",
    },
    {
      id: "works",
      title: "Projects",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  const scrollTo = (nav) => {
    if (nav.id === "home") {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActive("home");
      return;
    }

    const element = document.getElementById(nav.id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActive(nav.id);
    }
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-primary/80 dark:bg-gray-900/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <motion.button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActive("home");
          }}
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg"
          >
            <img
              src={sadidur}
              alt="Sadidur Rahman"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[18px] font-bold cursor-pointer flex dark:text-white">
              Sadidur &nbsp;
              <span className="hidden sm:block">Rahman</span>
            </p>
            <p className="text-[12px] text-secondary dark:text-gray-400">
              iOS Developer
            </p>
          </motion.div>
        </motion.button>

        <div className="flex items-center gap-6">
          <ul className="list-none hidden sm:flex flex-row gap-6 items-center">
            {navLinks.map((nav) => (
              <motion.li
                key={nav.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  active === nav.id
                    ? "text-white"
                    : "text-secondary dark:text-gray-400"
                } hover:text-white dark:hover:text-white text-[18px] font-medium cursor-pointer transition-colors`}
                onClick={() => scrollTo(nav)}
              >
                {nav.title}
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {isDarkMode ? (
              <HiSun className="w-6 h-6 text-yellow-400" />
            ) : (
              <HiMoon className="w-6 h-6 text-purple-600" />
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
