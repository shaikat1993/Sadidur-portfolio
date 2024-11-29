import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { technologies } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const TechCard = ({ icon: Icon, name, index }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className='w-28 h-28 flex flex-col items-center justify-center gap-2 rounded-xl bg-paper border border-border shadow-lg hover:shadow-xl transition-all duration-300'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className='w-16 h-16 text-accent' />
      <p className='text-primary text-sm font-medium'>{name}</p>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <section id="tech" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-secondary`}>
          My technical expertise
        </p>
        <h2 className={`${styles.sectionHeadText} text-primary`}>
          Technologies.
        </h2>
      </motion.div>

      <motion.div 
        className='mt-20 flex flex-wrap gap-10 justify-center'
        variants={fadeIn("", "", 0.1, 1)}
      >
        {technologies.map((technology, index) => (
          <TechCard key={technology.name} index={index} {...technology} />
        ))}
      </motion.div>
    </section>
  );
};

export default Tech;
