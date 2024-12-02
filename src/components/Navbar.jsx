import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { sadidur } from "../assets";
import { HiSun, HiMoon, HiMenu, HiX } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      id: "work",
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
    <>
      <nav
        className={`${
          styles.paddingX
        } w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
          scrolled
            ? "bg-paper/80 backdrop-blur-md border-b border-border"
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
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/50 shadow-lg"
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
              <p className="text-[18px] font-bold cursor-pointer flex text-primary">
                Sadidur &nbsp;
                <span className="hidden sm:block">Rahman</span>
              </p>
              <p className="text-[12px] text-secondary">
                iOS Developer
              </p>
            </motion.div>
          </motion.button>

          <div className="flex items-center gap-6">
            {/* Desktop Menu */}
            <ul className="list-none hidden sm:flex flex-row gap-6 items-center">
              {navLinks.map((nav) => (
                <motion.li
                  key={nav.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${
                    active === nav.id
                      ? "text-primary"
                      : "text-secondary"
                  } hover:text-primary text-[18px] font-medium cursor-pointer transition-colors`}
                  onClick={() => scrollTo(nav)}
                >
                  {nav.title}
                </motion.li>
              ))}
            </ul>

            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {isDarkMode ? (
                <HiSun className="w-6 h-6 text-yellow-400" />
              ) : (
                <HiMoon className="w-6 h-6 text-accent" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors z-50"
            >
              {isOpen ? (
                <HiX className="w-6 h-6 text-primary" />
              ) : (
                <HiMenu className="w-6 h-6 text-primary" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 sm:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-[min(75%,300px)] bg-paper border-l border-border z-40 sm:hidden"
            >
              <div className="flex flex-col h-full pt-24 pb-6">
                {/* Navigation Links */}
                <ul className="flex-1 flex flex-col">
                  {navLinks.map((nav) => (
                    <motion.li
                      key={nav.id}
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${
                        active === nav.id
                          ? "text-primary bg-accent/10"
                          : "text-secondary"
                      } hover:text-primary text-[18px] font-medium cursor-pointer transition-colors px-8 py-4`}
                      onClick={() => {
                        scrollTo(nav);
                        setIsOpen(false);
                      }}
                    >
                      {nav.title}
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom Section */}
                <div className="px-8 pt-4 border-t border-border mt-auto">
                  <p className="text-secondary text-sm mb-2">Theme</p>
                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                  >
                    {isDarkMode ? (
                      <>
                        <HiSun className="w-5 h-5 text-yellow-400" />
                        <span className="text-primary">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <HiMoon className="w-5 h-5 text-accent" />
                        <span className="text-primary">Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
