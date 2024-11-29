import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { styles } from '../styles';

const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2, y: -5 }}
    whileTap={{ scale: 0.9 }}
    className="text-[var(--text-primary)] hover:text-[var(--text-accent)] transition-colors"
  >
    <Icon className="w-6 h-6" />
    <span className="sr-only">{label}</span>
  </motion.a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-paper)] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--text-accent)] to-[var(--text-primary)] opacity-5" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            backgroundSize: ['100% 100%', '200% 200%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            background: 'radial-gradient(circle, var(--text-accent) 0%, transparent 60%)',
            opacity: 0.1,
          }}
        />
      </div>

      {/* Main Content */}
      <div className={`${styles.paddingX} relative z-10`}>
        <div className="max-w-7xl mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left space-y-4"
            >
              <motion.h3
                className="text-2xl font-bold bg-gradient-to-r from-[var(--text-accent)] to-[var(--text-primary)] inline-block text-transparent bg-clip-text"
                whileHover={{ scale: 1.05 }}
              >
                Sadidur Rahman
              </motion.h3>
              <p className="text-[var(--text-primary)] opacity-80">
                Senior iOS Developer | Full Stack Developer
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <SocialLink
                  href="https://github.com/shaikat1993"
                  icon={FaGithub}
                  label="GitHub"
                />
                <SocialLink
                  href="https://www.linkedin.com/in/md-sadidur-rahman-39a1b5146/"
                  icon={FaLinkedin}
                  label="LinkedIn"
                />
                <SocialLink
                  href="mailto:mdsadidurrahman74@gmail.com"
                  icon={FaEnvelope}
                  label="Email"
                />
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Contact</h3>
              <motion.div
                className="space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center justify-center gap-2 text-[var(--text-primary)]"
                >
                  <FaMapMarkerAlt className="text-[var(--text-accent)]" />
                  <span>Hervanta, Tampere</span>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center justify-center gap-2 text-[var(--text-primary)]"
                >
                  <FaPhone className="text-[var(--text-accent)]" />
                  <span>+358 415833593</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center lg:text-right space-y-4"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Quick Links</h3>
              <motion.div className="flex flex-col space-y-2">
                {[
                  { name: 'About', id: 'about' },
                  { name: 'Projects', id: 'projects' },
                  { name: 'Experience', id: 'work' },
                  { name: 'Contact', id: 'contact' }
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    whileHover={{ x: 5, color: 'var(--text-accent)' }}
                    className="text-[var(--text-primary)] hover:text-[var(--text-accent)] transition-colors cursor-pointer font-medium"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-[var(--border-color)] text-center"
          >
            <p className="text-[var(--text-primary)] opacity-80">
              {currentYear} Sadidur Rahman. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--text-accent)] to-transparent"
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </footer>
  );
};

export default Footer;
