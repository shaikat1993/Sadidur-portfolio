import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaAppStore, FaGlobe, FaApple, FaReact, FaArrowRight } from "react-icons/fa";
import { styles } from "../styles";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ project, index, projectType }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, description, tags, icon, source_code_link, app_store_link, live_link, isPersonalProject } = project;

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="w-full sm:w-[360px]"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="bg-[var(--bg-paper)] p-5 rounded-2xl w-full border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-all duration-300 h-full backdrop-blur-sm bg-opacity-80 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[var(--text-accent)] to-transparent opacity-0"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative w-full h-[230px] flex items-center justify-center group">
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered && projectType === 'web' ? 360 : 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            className="relative z-10"
          >
            {isPersonalProject ? (
              projectType === 'ios' ? (
                <FaApple className="w-32 h-32 text-[var(--text-primary)] transition-all duration-300 group-hover:text-[var(--text-accent)]" />
              ) : (
                project.icon && <project.icon className="w-32 h-32 text-[var(--text-primary)] transition-all duration-300 group-hover:text-[var(--text-accent)]" />
              )
            ) : (
              <img
                src={icon}
                alt={name}
                className="w-full h-full object-contain rounded-2xl p-2 transition-all duration-300 group-hover:scale-110"
              />
            )}
          </motion.div>

          <div className="absolute inset-0 flex justify-end m-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {source_code_link && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-[var(--bg-accent)] hover:bg-[var(--text-accent)] transition-colors duration-300"
              >
                <FaGithub className="w-1/2 h-1/2 object-contain" />
              </motion.div>
            )}
            {app_store_link && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(app_store_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-[var(--bg-accent)] hover:bg-[var(--text-accent)] transition-colors duration-300"
              >
                <FaAppStore className="w-1/2 h-1/2 object-contain" />
              </motion.div>
            )}
            {live_link && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(live_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-[var(--bg-accent)] hover:bg-[var(--text-accent)] transition-colors duration-300"
              >
                <FaGlobe className="w-1/2 h-1/2 object-contain" />
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5"
        >
          <motion.div
            className="flex items-center gap-2 cursor-pointer group/title"
            whileHover={{ x: 10 }}
          >
            <h3 className="text-[var(--text-primary)] font-bold text-[24px] transition-colors duration-300 group-hover/title:text-[var(--text-accent)]">
              {name}
            </h3>
            <FaArrowRight className="w-5 h-5 opacity-0 group-hover/title:opacity-100 transition-all duration-300 text-[var(--text-accent)]" />
          </motion.div>
          <p className="mt-2 text-[var(--text-secondary)] text-[14px]">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {tags.map((tag, index) => (
            <motion.div
              key={tag.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="relative group/tag"
            >
              <span className="absolute -inset-2 bg-[var(--text-accent)] opacity-0 group-hover/tag:opacity-10 rounded-full transition-opacity duration-300" />
              <p className="text-[14px] text-[var(--text-accent)] bg-[var(--bg-accent)] bg-opacity-10 px-3 py-1 rounded-full relative z-10">
                #{tag.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectSection = ({ projectType, projects }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex flex-wrap gap-7 justify-center"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.name}
          index={index}
          project={project}
          projectType={projectType}
        />
      ))}
    </motion.div>
  );
};

const ToggleButton = ({ isActive, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 relative group ${
      isActive
        ? "bg-[var(--text-accent)] text-white shadow-lg"
        : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
    }`}
    onClick={onClick}
  >
    <span className="relative z-10">{children}</span>
    <motion.span
      className="absolute inset-0 rounded-full bg-[var(--text-accent)]"
      initial={{ scale: 0 }}
      animate={{ scale: isActive ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  </motion.button>
);

const Works = () => {
  const [active, setActive] = useState("ios");

  return (
    <section id="works" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-[var(--text-secondary)]`}>
          My work
        </p>
        <h2 className={`${styles.sectionHeadText} text-[var(--text-primary)]`}>
          Projects.
        </h2>
      </motion.div>

      <motion.div 
        className="w-full flex justify-center mt-10 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-4 p-1 rounded-full bg-[var(--bg-paper)] border border-[var(--border-color)] shadow-lg backdrop-blur-sm">
          <ToggleButton
            isActive={active === "ios"}
            onClick={() => setActive("ios")}
          >
            iOS Development
          </ToggleButton>
          <ToggleButton
            isActive={active === "web"}
            onClick={() => setActive("web")}
          >
            Web Development
          </ToggleButton>
        </div>
      </motion.div>

      <div className="mt-20">
        <AnimatePresence mode="wait">
          {active === "ios" && (
            <ProjectSection key="ios" projectType="ios" projects={projects.ios} />
          )}
          {active === "web" && (
            <ProjectSection key="web" projectType="web" projects={projects.web} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "projects");
