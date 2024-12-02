import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { technologies } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';

const TechCard = ({ icon: Icon, name, index, proficiency }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  
  // Updated proficiency map with theme-based colors
  const proficiencyMap = {
    'Beginner': { 
      value: 20, 
      color: `${theme.text.secondary}`, 
      label: "Beginner",
      gradient: `linear-gradient(135deg, ${theme.text.secondary}, ${theme.text.accent})`
    },
    'Intermediate': { 
      value: 60, 
      color: `${theme.text.primary}`, 
      label: "Intermediate",
      gradient: `linear-gradient(135deg, ${theme.text.primary}, ${theme.text.accent})`
    },
    'Advanced': { 
      value: 85, 
      color: `${theme.text.accent}`, 
      label: "Advanced",
      gradient: `linear-gradient(135deg, ${theme.text.accent}, ${theme.text.primary})`
    },
    'Expert': { 
      value: 100, 
      color: `${theme.text.accent}`, 
      label: "Expert",
      gradient: `linear-gradient(135deg, ${theme.text.accent}, ${theme.text.primary}, ${theme.text.accent})`
    }
  };

  const getProficiencyDetails = () => {
    return proficiencyMap[proficiency] || proficiencyMap['Beginner'];
  };

  const { value, color, label, gradient } = getProficiencyDetails();

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="relative w-[160px] sm:w-[180px] aspect-square"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-full h-full rounded-2xl bg-paper/30 backdrop-blur-xl border border-[var(--border-color)] overflow-hidden group cursor-pointer relative"
        style={{ boxShadow: `0 0 20px ${theme.shadow}` }}
      >
        {/* Hexagon Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 border border-[var(--text-secondary)]/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
              }}
            />
          ))}
        </div>

        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--text-accent)]/20 via-transparent to-[var(--text-accent)]/20 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-spin-slow bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent" />
        </div>

        {/* Main Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-4">
          {/* Icon Container */}
          <motion.div
            className="relative mb-4"
            animate={{
              y: [0, -5, 0],
              rotateY: isHovered ? [0, 360] : 0
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 0.8, ease: "easeOut" }
            }}
          >
            <div className="relative">
              <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-[var(--text-accent)] group-hover:text-[var(--text-primary)] transition-all duration-500" />
              {/* Glowing ring with gradient */}
              <div 
                className="absolute inset-0 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: gradient,
                  opacity: 0.2,
                  filter: 'blur(8px)',
                  transform: 'scale(1.2)'
                }} 
              />
            </div>
          </motion.div>

          {/* Name Container */}
          <motion.div className="text-center z-10">
            <p className="text-[var(--text-primary)] text-sm font-medium mb-2">{name}</p>
          </motion.div>

          {/* Proficiency Indicator */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-[var(--bg-paper)]/90 backdrop-blur-md"
                style={{ borderRadius: "1rem" }}
              >
                <div className="text-center">
                  <motion.div 
                    className="mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative inline-block">
                      {/* Background gradient ring */}
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{ 
                          background: gradient,
                          opacity: 0.15,
                          filter: 'blur(10px)',
                          transform: 'scale(1.2)'
                        }}
                      />
                      <svg className="w-24 h-24 relative z-10" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={theme.background.paper}
                          strokeWidth="8"
                          opacity="0.3"
                        />
                        {/* Progress circle with gradient */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={`url(#gradient-${index})`}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${value * 2.83} ${283 - value * 2.83}`}
                          transform="rotate(-90 50 50)"
                        >
                          <animate
                            attributeName="stroke-dasharray"
                            from="0 283"
                            to={`${value * 2.83} ${283 - value * 2.83}`}
                            dur="1.5s"
                            fill="freeze"
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1"
                          />
                        </circle>
                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={theme.text.accent} />
                            <stop offset="50%" stopColor={color} />
                            <stop offset="100%" stopColor={theme.text.accent} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-[var(--text-accent)] via-[var(--text-primary)] to-[var(--text-accent)] bg-clip-text text-transparent">{value}%</span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p 
                      className="text-sm font-medium relative z-10"
                      style={{ 
                        background: gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% 100%',
                      }}
                    >
                      {label}
                    </p>
                    {/* Text glow effect */}
                    <div 
                      className="absolute inset-0 filter blur-sm"
                      style={{ 
                        background: gradient,
                        opacity: 0.3,
                        transform: 'scale(1.2)'
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {isHovered && [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: gradient,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 0],
                  opacity: [1, 0],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CategorySection = ({ category, skills }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative w-full rounded-[40px] bg-[var(--bg-paper)]/90 backdrop-blur-xl border border-[var(--border-color)] shadow-card hover:shadow-glow overflow-hidden"
    >
      {/* Category Header */}
      <motion.div 
        variants={fadeIn("down", "spring", 0.2, 1)}
        className="text-center mb-12 relative z-10 p-8"
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-[var(--text-accent)] via-[var(--text-primary)] to-[var(--text-accent)] bg-clip-text text-transparent animate-gradient">
            {category.title}
          </span>
        </h3>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm sm:text-base">{category.description}</p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 p-8">
        {skills.map((skill, index) => (
          <TechCard key={skill.name} index={index} {...skill} />
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--text-accent)]/20 rounded-full filter blur-[100px] animate-pulse opacity-70" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--text-accent)]/10 rounded-full filter blur-[100px] animate-pulse delay-1000 opacity-70" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[var(--text-accent)]/5 rounded-full filter blur-[120px] animate-blob opacity-50" />
    </motion.div>
  );
};

const ToggleButton = ({ children, isActive, onClick }) => {
  const { theme } = useTheme();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative min-w-max px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-full font-medium text-xs sm:text-sm md:text-base transition-all duration-500 overflow-hidden ${
        isActive ? "text-[var(--text-primary)] shadow-glow" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      }`}
      onClick={onClick}
    >
      {/* Button Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[var(--text-accent)] via-[var(--text-primary)] to-[var(--text-accent)] bg-[length:200%_100%]"
        initial={{ x: "-100%" }}
        animate={{ x: isActive ? 0 : "-100%" }}
        transition={{ duration: 0.5 }}
      />

      {/* Button Content */}
      <span className="relative z-10">{children}</span>

      {/* Glow Effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-[var(--text-accent)] rounded-full filter blur-xl opacity-50"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
};

const Tech = () => {
  const techCategories = Object.entries(technologies);
  const [activeCategory, setActiveCategory] = useState(techCategories[0][0]);
  const { theme } = useTheme();

  return (
    <section id="tech" className={`${styles.padding} max-w-7xl mx-auto relative z-0 overflow-hidden`}>
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-[var(--text-secondary)] font-medium mb-2`}>
          My technical expertise
        </p>
        <h2 className={`${styles.sectionHeadText} text-[var(--text-primary)] mb-10`}>
          Technologies.
        </h2>
      </motion.div>

      {/* Category Toggle Buttons */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="flex flex-col items-center mb-16"
      >
        <div className="w-full max-w-4xl">
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3 rounded-[20px] bg-[var(--bg-paper)]/80 backdrop-blur-xl border border-[var(--border-color)] shadow-card"
          >
            {techCategories.map(([key, category]) => (
              <ToggleButton
                key={key}
                isActive={activeCategory === key}
                onClick={() => setActiveCategory(key)}
              >
                {category.title}
              </ToggleButton>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Content */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CategorySection 
              category={technologies[activeCategory]} 
              skills={technologies[activeCategory].skills}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background Elements */}
      <motion.div 
        className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-[var(--text-accent)]/20 filter blur-[150px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-[var(--text-accent)]/10 filter blur-[150px] pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
    </section>
  );
};

export default Tech;
