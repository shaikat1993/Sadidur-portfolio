import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

const ExperienceCard = ({ experience }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: isDarkMode ? "var(--bg-paper)" : "#fff",
        color: "var(--text-primary)",
        boxShadow: "0 3px 0 var(--shadow-color)",
        border: "1px solid var(--border-color)",
      }}
      contentArrowStyle={{ borderRight: "7px solid var(--border-color)" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-[24px] font-bold text-[var(--text-primary)]">
          {experience.title}
        </h3>
        <a
          href={experience.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[16px] font-semibold text-[var(--text-accent)] hover:underline"
        >
          {experience.company_name}
        </a>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-[14px] pl-1 tracking-wider text-[var(--text-secondary)]"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { isDarkMode } = useTheme();
  return (
    <section className="relative w-full h-full mx-auto">
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <span className="hash-span" id="work">
          &nbsp;
        </span>

        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-[var(--text-secondary)]`}>
            What I have done so far
          </p>
          <h2 className={`${styles.sectionHeadText} text-[var(--text-primary)]`}>
            Work Experience.
          </h2>
        </motion.div>

        <div className="mt-20 flex flex-col">
          <VerticalTimeline
            lineColor="color-mix(in srgb, var(--text-primary) 10%, transparent)"
          >
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "work");
