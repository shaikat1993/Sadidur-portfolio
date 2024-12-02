import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaAppStore } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const { name, description, tags, icon: Icon, source_code_link, app_store_link, isPersonalProject } = project;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div className="w-full h-full min-h-[300px] rounded-2xl bg-paper/30 backdrop-blur-xl border border-[var(--border-color)] p-5 sm:p-7 overflow-hidden group cursor-pointer relative flex flex-col">
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
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--text-accent)]/20 via-transparent to-[var(--text-accent)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-spin-slow bg-gradient-to-r from-transparent via-[var(--text-primary)]/5 to-transparent" />
        </div>

        <div className="relative flex flex-col flex-grow">
          {/* Icon and Title */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="relative flex-shrink-0"
              animate={{
                y: [0, -5, 0],
                rotateY: isHovered ? [0, 360] : 0
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 0.8, ease: "easeOut" }
              }}
            >
              {/* Animated Border Container */}
              <div className="relative p-[2px] rounded-xl overflow-hidden bg-gradient-to-r from-[var(--text-accent)] via-[var(--text-primary)] to-[var(--text-accent)] bg-[length:200%_100%] animate-border-flow">
                {/* Icon Container */}
                <div className="relative bg-[var(--bg-paper)] rounded-xl p-2">
                  {typeof Icon === 'function' ? (
                    <Icon className="w-10 h-10 text-[var(--text-accent)]" />
                  ) : Icon ? (
                    <img src={Icon} alt={name} className="w-10 h-10 object-contain" />
                  ) : (
                    <div className="w-10 h-10 bg-[var(--text-accent)]/10 rounded-xl flex items-center justify-center">
                      <span className="text-[var(--text-accent)] text-xl font-bold">
                        {name.charAt(0)}
                      </span>
                    </div>
                  )}

              
                </div>

                {/* Animated Corner Dots */}
                <motion.div
                  className="absolute w-1 h-1 bg-[var(--text-accent)] rounded-full top-0 left-0"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute w-1 h-1 bg-[var(--text-accent)] rounded-full top-0 right-0"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute w-1 h-1 bg-[var(--text-accent)] rounded-full bottom-0 left-0"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute w-1 h-1 bg-[var(--text-accent)] rounded-full bottom-0 right-0"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            <h3 className="text-[var(--text-primary)] font-bold text-[24px] line-clamp-2">{name}</h3>
          </div>

          {/* Description */}
          <p className="mt-2 text-[var(--text-secondary)] text-[14px] line-clamp-4 flex-grow">{description}</p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color} px-2 py-1 rounded-full bg-[var(--bg-paper)]/50 border border-[var(--border-color)] backdrop-blur-sm`}
              >
                #{tag.name}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-4 flex gap-4">
            {source_code_link && (
              <motion.a
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-accent)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </motion.a>
            )}
            {app_store_link && (
              <motion.a
                href={app_store_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-accent)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaAppStore className="w-4 h-4" />
                <span>App Store</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectSection = ({ projectType, projects }) => {
  const projectList = projects[projectType] || [];
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-8">
        {projectList.map((project, index) => (
          <div key={project.name} className="h-full">
            <ProjectCard
              index={index}
              project={project}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ToggleButton = ({ children, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-full text-sm font-medium overflow-hidden ${
        isActive ? 'text-white' : 'text-[var(--text-secondary)]'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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

const Works = () => {
  const [activeType, setActiveType] = useState("iOS Development");
  const projectTypes = ["iOS Development", "Web Development"];
  const { theme } = useTheme();

  return (
    <section id="works" className={`${styles.padding} max-w-7xl mx-auto relative z-0 overflow-hidden`}>
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-[var(--text-secondary)] font-medium mb-2`}>
          My work
        </p>
        <h2 className={`${styles.sectionHeadText} text-[var(--text-primary)] mb-10`}>
          Projects.
        </h2>
      </motion.div>

      {/* Category Toggle Buttons */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="flex flex-col items-center mb-16"
      >
        <div className="w-full max-w-4xl">
          <div 
            className="grid grid-cols-2 gap-3 p-3 rounded-[20px] bg-[var(--bg-paper)]/80 backdrop-blur-xl border border-[var(--border-color)] shadow-card"
          >
            {projectTypes.map((type) => (
              <ToggleButton
                key={type}
                isActive={activeType === type}
                onClick={() => setActiveType(type)}
              >
                {type}
              </ToggleButton>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Projects Display */}
      <AnimatePresence mode="wait">
        <ProjectSection 
          key={activeType}
          projectType={activeType} 
          projects={projects}
        />
      </AnimatePresence>

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
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-[var(--text-primary)]/20 filter blur-[150px] pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
};

export default Works;
