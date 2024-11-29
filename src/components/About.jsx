import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <section className="relative w-full h-full mx-auto">
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <span className="hash-span" id="about">
          &nbsp;
        </span>

        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-[var(--text-secondary)]`}>
            Introduction
          </p>
          <h2 className={`${styles.sectionHeadText} text-[var(--text-primary)]`}>
            Overview.
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-4 text-[var(--text-secondary)] text-[17px] max-w-3xl leading-[30px]'
        >
          I'm a skilled software developer with experience in iOS development and various web technologies.
          I specialize in building mobile applications and full-stack web solutions using React, Node.js,
          and other modern frameworks.
        </motion.p>
      </div>
    </section>
  );
};

export default SectionWrapper(About, "about");
