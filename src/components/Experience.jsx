import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { experiences } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ExperienceCard = ({ experience, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    className="p-6 bg-paper rounded-2xl border border-border shadow-lg"
  >
    <div>
      <h3 className="text-[24px] font-bold text-primary">{experience.title}</h3>
      <p className="text-[16px] text-accent font-semibold">{experience.company_name}</p>
      <p className="text-[14px] text-secondary mt-1">{experience.date}</p>
    </div>

    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((point, pointIndex) => (
        <li
          key={`experience-point-${index}-${pointIndex}`}
          className="text-secondary text-[14px] pl-1 tracking-wider"
        >
          {point}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Experience = () => {
  return (
    <section id="experience" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-secondary`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-primary`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col gap-10">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
