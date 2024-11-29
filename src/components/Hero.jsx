import { motion } from "framer-motion";
import { styles } from "../styles";
import { iphone } from "../assets";
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden bg-hero-pattern">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-yellow-600/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 right-1/2 w-96 h-96 bg-pink-600/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[var(--text-accent)]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="flex flex-row justify-between items-center w-full">
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
            <p className="mt-2 text-[var(--text-secondary)] text-[17px]">
              with expertise in mobile and web development
            </p>
          </div>

          {/* Device Showcase */}
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
              
              {/* Device Frame */}
              <div className="absolute inset-10 bg-black/80 rounded-[2rem] p-2 shadow-2xl">
                {/* Screen Content */}
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                  <img
                    src={iphone}
                    alt="iPhone Animation"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Screen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--text-primary)]/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
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
  );
};

export default Hero;
