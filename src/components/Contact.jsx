import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';

const Contact = () => {
  return (
    <div id="contact" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div>
        <p className={`${styles.sectionSubText} text-[var(--text-secondary)]`}>Get in touch</p>
        <h2 className={`${styles.sectionHeadText} text-[var(--text-primary)]`}>Contact.</h2>
      </motion.div>

      <div className='mt-12 flex flex-col gap-8'>
        <div className='flex flex-col'>
          <span className='text-[var(--text-primary)] font-medium mb-4'>Your Name</span>
          <input
            type='text'
            name='name'
            className='bg-[var(--bg-paper)] py-4 px-6 placeholder:text-[var(--text-secondary)] text-[var(--text-primary)] rounded-lg outlined-none border border-[var(--border-color)] font-medium'
            placeholder="What's your name?"
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-[var(--text-primary)] font-medium mb-4'>Your Email</span>
          <input
            type='email'
            name='email'
            className='bg-[var(--bg-paper)] py-4 px-6 placeholder:text-[var(--text-secondary)] text-[var(--text-primary)] rounded-lg outlined-none border border-[var(--border-color)] font-medium'
            placeholder="What's your email?"
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-[var(--text-primary)] font-medium mb-4'>Your Message</span>
          <textarea
            rows='7'
            name='message'
            className='bg-[var(--bg-paper)] py-4 px-6 placeholder:text-[var(--text-secondary)] text-[var(--text-primary)] rounded-lg outlined-none border border-[var(--border-color)] font-medium'
            placeholder='What do you want to say?'
          />
        </div>

        <button
          type='submit'
          className='bg-[var(--bg-accent)] hover:bg-[var(--text-accent)] py-3 px-8 outline-none w-fit text-[var(--text-primary)] hover:text-[var(--text-primary)] font-bold shadow-md hover:shadow-lg border border-[var(--border-color)] transition-all duration-300 rounded-xl'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Contact;
