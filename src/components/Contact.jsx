import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';

const Contact = () => {
  return (
    <div id="contact" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>
      </motion.div>

      <div className='mt-12 flex flex-col gap-8'>
        <div className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your Name</span>
          <input
            type='text'
            name='name'
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            placeholder="What's your name?"
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your Email</span>
          <input
            type='email'
            name='email'
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            placeholder="What's your email?"
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your Message</span>
          <textarea
            rows='7'
            name='message'
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            placeholder='What do you want to say?'
          />
        </div>

        <button
          type='submit'
          className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Contact;
