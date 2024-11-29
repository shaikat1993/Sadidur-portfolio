import { motion } from "framer-motion";
import { styles } from "../styles";
import { iphone } from "../assets";

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
      <div className={`relative ${styles.paddingX} max-w-7xl mx-auto flex flex-row items-start gap-5 pt-[120px]`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex-1">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm <br />
              <span className="text-[#915eff]">Sadidur Rahman</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              Senior iOS Developer & Full Stack Engineer <br className="sm:block hidden" />
              with expertise in mobile and web development
            </p>
          </div>

          {/* Device Showcase */}
          <div className="relative w-[400px] h-[600px] hidden md:block">
            {/* Corner Decorations */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-500/50 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-500/50 rounded-bl-lg" />
            
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
            >
              {/* Glassmorphism Card */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl" />
              
              {/* Device Frame */}
              <div className="absolute inset-10 rounded-[2rem] p-2 shadow-2xl overflow-hidden">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-[2rem]">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-pink-500/20 animate-gradient rounded-[2rem]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-shimmer rounded-[2rem]" />
                </div>

                {/* Screen Content */}
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-black/90">
                  <img
                    src={iphone}
                    alt="iPhone Animation"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Screen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
