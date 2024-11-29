import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import emailjs from 'emailjs-com';
import { fadeIn, textVariant } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    emailjs.sendForm(
      'service_69t5edt', // You'll need to replace this
      'template_vxbcv89', // You'll need to replace this
      formRef.current,
      'jYaxTe1AcCd-pNNYX' // You'll need to replace this
    )
      .then(() => {
        setLoading(false);
        setSuccess('Thank you. I will get back to you as soon as possible.');
        setForm({
          name: '',
          email: '',
          message: '',
        });
      })
      .catch((error) => {
        setLoading(false);
        setError('Something went wrong. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <div id="contact" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-[var(--text-secondary)]`}>Get in touch</p>
        <h2 className={`${styles.sectionHeadText} text-[var(--text-primary)]`}>Contact.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-12 flex flex-col gap-8'
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex flex-col gap-8'
        >
          <div className='flex flex-col'>
            <span className='text-[var(--text-primary)] font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              className='bg-[var(--bg-paper)] py-4 px-6 placeholder:text-[var(--text-secondary)] text-[var(--text-primary)] rounded-lg outlined-none border border-[var(--border-color)] font-medium'
              placeholder="What's your name?"
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-[var(--text-primary)] font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              className='bg-[var(--bg-paper)] py-4 px-6 placeholder:text-[var(--text-secondary)] text-[var(--text-primary)] rounded-lg outlined-none border border-[var(--border-color)] font-medium'
              placeholder="What's your email?"
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-[var(--text-primary)] font-medium mb-4'>Your Message</span>
            <textarea
              rows='7'
              name='message'
              value={form.message}
              onChange={handleChange}
              required
              className='bg-[var(--bg-paper)] py-4 px-6 placeholder:text-[var(--text-secondary)] text-[var(--text-primary)] rounded-lg outlined-none border border-[var(--border-color)] font-medium'
              placeholder='What do you want to say?'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='bg-[var(--bg-accent)] hover:bg-[var(--text-accent)] py-3 px-8 outline-none w-fit text-[var(--text-primary)] hover:text-[var(--text-primary)] font-bold shadow-md hover:shadow-lg border border-[var(--border-color)] transition-all duration-300 rounded-xl disabled:opacity-50'
          >
            {loading ? 'Sending...' : 'Send'}
          </button>

          {error && (
            <p className="text-red-500 mt-2">{error}</p>
          )}
          {success && (
            <p className="text-green-500 mt-2">{success}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
