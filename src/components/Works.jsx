import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { projects } from '../constants';

const Works = () => {
  return (
    <div id="work" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <div key={`project-${index}`} className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'>
            <div className='relative w-full h-[230px]'>
              <h3 className='text-white font-bold text-[24px]'>{project.name}</h3>
            </div>

            <div className='mt-5'>
              <p className='mt-2 text-secondary text-[14px]'>{project.description}</p>
            </div>

            <div className='mt-4 flex flex-wrap gap-2'>
              {project.tags.map((tag) => (
                <p
                  key={`${project.name}-${tag.name}`}
                  className={`text-[14px] ${tag.color}`}
                >
                  #{tag.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
