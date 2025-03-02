import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import aiCharacter from '../assets/animations/aiCharacter.json'; // Adjust path to your Lottie file

function AISection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const lottieVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center py-16"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left Side - Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            variants={textVariants}
          >
            Welcome to the Future of Shopping
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-200 mb-6"
            variants={textVariants}
          >
            Experience AI-powered e-commerce with personalized recommendations, smart search, and a seamless shopping journey. Your perfect style, powered by intelligence.
          </motion.p>
          <motion.div variants={textVariants}>
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => window.location.href = '/products'}
            >
              Shop Now
            </button>
          </motion.div>
        </div>

        {/* Right Side - Lottie Animation */}
        <motion.div
          className="lg:w-1/2 flex justify-center"
          variants={lottieVariants}
        >
          <Lottie
            animationData={aiCharacter}
            loop={true}
          />
        </motion.div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-blue-500/30 rounded-full"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/30 rounded-full"
        animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  );
}

export default AISection;