import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';

const About = () => {
  return (
    <div id="about" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a skilled software developer with experience in iOS development and various web technologies.
        I specialize in building mobile applications and full-stack web solutions using React, Node.js,
        and other modern frameworks.
      </motion.p>
    </div>
  );
};

export default About;
