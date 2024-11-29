import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { technologies } from '../constants';

const TechCard = ({ icon: Icon, name }) => {
  return (
    <motion.div
      className='w-28 h-28 flex flex-col items-center justify-center gap-2 rounded-xl bg-tertiary p-4 hover:shadow-card cursor-pointer'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className='w-16 h-16 text-[#915eff]' />
      <p className='text-white text-sm'>{name}</p>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <section id="tech" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div>
        <p className={styles.sectionSubText}>My technical expertise</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>
      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {technologies.map((technology, index) => (
          <TechCard key={technology.name} {...technology} />
        ))}
      </div>
    </section>
  );
};

export default Tech;
