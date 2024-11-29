import React from 'react';
import { motion } from 'framer-motion';

const IPhoneCanvas = () => {
  return (
    <div className="relative w-full h-full">
      {/* iPhone Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] p-3">
        {/* Screen */}
        <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-black">
          {/* App Interface Mockup */}
          <div className="absolute inset-0 flex flex-col">
            {/* Status Bar */}
            <div className="h-6 bg-black flex justify-between items-center px-4">
              <span className="text-white text-xs">9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 bg-white rounded-sm"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1 relative overflow-hidden">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-teal-500/20 animate-gradient bg-[length:200%_200%]"></div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl"
              />
              
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full"
              />

              {/* Code Snippets */}
              <div className="absolute top-1/4 right-1/4 w-32 p-3 bg-black/50 backdrop-blur-xl rounded-lg">
                <div className="h-2 w-20 bg-purple-500/50 rounded mb-2"></div>
                <div className="h-2 w-16 bg-blue-500/50 rounded mb-2"></div>
                <div className="h-2 w-24 bg-teal-500/50 rounded"></div>
              </div>

              {/* UI Elements */}
              <div className="absolute bottom-1/4 left-1/3 flex gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-8 h-8 bg-purple-500/50 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="w-8 h-8 bg-blue-500/50 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                  className="w-8 h-8 bg-teal-500/50 rounded-full"
                />
              </div>
            </div>

            {/* Home Indicator */}
            <div className="h-1 w-24 mx-auto mb-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Reflections */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default IPhoneCanvas;
