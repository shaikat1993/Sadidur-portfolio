import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { experiences } from '../constants';

const Experience = () => {
  return (
    <section id="experience" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        {experiences.map((experience, index) => (
          <div key={index} className='mb-8'>
            <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
            <p className='text-secondary text-[16px]'>{experience.company_name}</p>
            <p className='text-secondary text-[14px]'>{experience.date}</p>
            <ul className='mt-5 list-disc ml-5 space-y-2'>
              {experience.points.map((point, index) => (
                <li key={`experience-point-${index}`} className='text-white-100 text-[14px] pl-1 tracking-wider'>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
