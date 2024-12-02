import { motion } from "framer-motion";
import { styles } from "../styles";
import { profile, resume } from "../assets";
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { HiDownload } from 'react-icons/hi';
import { useState } from 'react';
import PDFViewer from './PDFViewer';

const Hero = () => {
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  return (
    <>
      <PDFViewer
        isOpen={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
        pdfUrl={resume}
      />
      <section className="relative w-full min-h-screen mx-auto overflow-hidden bg-hero-pattern">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-yellow-600/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 right-1/2 w-96 h-96 bg-pink-600/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Main Content */}
        <div className={`${styles.paddingX} relative pt-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[var(--text-accent)]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <div className="flex-1 z-20">
              <h1 className={`${styles.heroHeadText} text-[var(--text-primary)]`}>
                Hi, I'm <br />
                <span className="text-[var(--text-accent)]">Sadidur Rahman</span>
              </h1>
              <div className={`${styles.heroSubText} mt-2 text-[var(--text-secondary)] flex items-center gap-2`}>
                <span>I am a</span>
                <TypeAnimation
                  sequence={[
                    'Senior iOS Developer',
                    2000,
                    'Full Stack Engineer',
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  wrapper="span"
                  cursor={true}
                  deletionSpeed={65}
                />
              </div>
              <p className="mt-2 text-[var(--text-secondary)] text-[17px] max-w-3xl">
                Crafting elegant iOS experiences for 6+ years, now expanding horizons with Full Stack Development while pursuing Masters at Tampere University
              </p>

              {/* Social Links and Resume Button */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/shaikat1993"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[var(--bg-paper)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--bg-accent)] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub className="w-6 h-6 text-[var(--text-primary)]" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/md-sadidur-rahman-39a1b5146/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[var(--bg-paper)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--bg-accent)] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaLinkedin className="w-6 h-6 text-[var(--text-primary)]" />
                  </motion.a>
                  <motion.a
                    href="https://leetcode.com/u/Sadidur_rahman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[var(--bg-paper)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--bg-accent)] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SiLeetcode className="w-6 h-6 text-[var(--text-primary)]" />
                  </motion.a>
                </div>
                
                <motion.button
                  onClick={() => setIsPDFOpen(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--text-accent)] text-white rounded-full hover:bg-[var(--text-accent)]/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View Resume</span>
                  <HiDownload className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* iPhone Animation - Mobile */}
            <div className="mt-8 md:hidden">
              <div className="relative w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] perspective-[2000px] mx-auto">
                {/* Corner Decorations */}
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-[var(--text-accent)]/50 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-[var(--text-accent)]/50 rounded-bl-lg" />
                
                {/* Device Container */}
                <motion.div
                  className="preserve-3d absolute inset-0"
                  initial={{ rotateY: 25, rotateX: -10 }}
                  animate={{
                    rotateY: [-5, 15],
                    rotateX: [-5, 5],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  {/* Glass Effect Container */}
                  <div className="absolute inset-0 bg-[var(--text-primary)]/10 backdrop-blur-lg rounded-2xl border border-[var(--text-primary)]/20 shadow-xl" />
                  
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-6 sm:inset-8 rounded-[2rem] sm:rounded-[2.5rem] p-[2px] shadow-2xl bg-gradient-to-br from-[var(--text-accent)] via-purple-500 to-pink-500 animate-gradient-xy overflow-hidden">
                    {/* Device Frame */}
                    <div className="relative w-full h-full bg-[var(--bg-paper)] rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-2.5 shadow-inner overflow-hidden">
                      {/* iPhone Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] sm:w-[120px] h-[20px] sm:h-[25px] bg-black rounded-b-[15px] sm:rounded-b-[18px] z-20 flex items-center justify-center">
                        <div className="w-[35px] sm:w-[42px] h-[3px] sm:h-[3.5px] bg-[#222] rounded-full mx-2" />
                        <div className="w-[6px] sm:w-[7px] h-[6px] sm:h-[7px] bg-[#222] rounded-full ml-2" />
                      </div>
                      
                      {/* Side Buttons */}
                      <div className="absolute top-[80px] sm:top-[100px] -left-[2px] sm:-left-[2.5px] w-[2px] sm:w-[2.5px] h-[40px] sm:h-[50px] bg-[#222]" />
                      <div className="absolute top-[130px] sm:top-[160px] -left-[2px] sm:-left-[2.5px] w-[2px] sm:w-[2.5px] h-[40px] sm:h-[50px] bg-[#222]" />
                      <div className="absolute top-[100px] sm:top-[125px] -right-[2px] sm:-right-[2.5px] w-[2px] sm:w-[2.5px] h-[60px] sm:h-[70px] bg-[#222]" />
                      
                      {/* Screen Content */}
                      <div className="relative w-full h-full rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden bg-white">
                        <img
                          src={profile}
                          alt="Profile Picture"
                          className="w-full h-full object-cover" />
                      </div>

                      {/* Home Indicator */}
                      <div className="absolute bottom-[8px] sm:bottom-[10px] left-1/2 transform -translate-x-1/2 w-[80px] sm:w-[100px] h-[3px] sm:h-[3.5px] bg-black rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Desktop iPhone Animation */}
            <div className="relative w-[400px] h-[600px] hidden md:block perspective-[2000px]">
              {/* Corner Decorations */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[var(--text-accent)]/50 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[var(--text-accent)]/50 rounded-bl-lg" />
              
              {/* Device Container */}
              <motion.div
                initial={{ rotateY: 15 }}
                animate={{
                  rotateY: [-5, 5, -5],
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glassmorphism Card */}
                <div className="absolute inset-0 bg-[var(--text-primary)]/10 backdrop-blur-lg rounded-2xl border border-[var(--text-primary)]/20 shadow-xl" />
                
                {/* Animated Gradient Border */}
                <div className="absolute inset-10 rounded-[3rem] p-[2px] shadow-2xl bg-gradient-to-br from-[var(--text-accent)] via-purple-500 to-pink-500 animate-gradient-xy overflow-hidden">
                  {/* Device Frame */}
                  <div className="relative w-full h-full bg-[var(--bg-paper)] rounded-[3rem] p-3 shadow-inner overflow-hidden">
                    {/* iPhone Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[20px] z-20 flex items-center justify-center">
                      <div className="w-[50px] h-[4px] bg-[#222] rounded-full mx-2" />
                      <div className="w-[8px] h-[8px] bg-[#222] rounded-full ml-2" />
                    </div>
                    
                    {/* Side Buttons */}
                    <div className="absolute top-[120px] -left-[3px] w-[3px] h-[60px] bg-[#222]" />
                    <div className="absolute top-[190px] -left-[3px] w-[3px] h-[60px] bg-[#222]" />
                    <div className="absolute top-[150px] -right-[3px] w-[3px] h-[80px] bg-[#222]" />
                    
                    {/* Screen Content */}
                    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-white">
                      <img
                        src={profile}
                        alt="Profile Picture"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-[12px] left-1/2 transform -translate-x-1/2 w-[120px] h-[4px] bg-black rounded-full" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Button */}
        <div className="relative w-full flex justify-center items-center mt-10 mb-8">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[var(--text-secondary)] flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-[var(--text-secondary)] mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
