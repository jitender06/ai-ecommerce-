import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import aboutUsCharacter from '../assets/animations/aboutUsCharacter.json'; // Adjust path to your Lottie file

function AboutUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
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
      className="py-16 bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80')`, // Beautiful team/tech image
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
             {/* Right: Lottie Animation */}
          <motion.div
            variants={lottieVariants}
            className="flex justify-center md:justify-end"
          >
            <Lottie
              animationData={aboutUsCharacter}
              loop={true}
            //   style={{ width: '80%', maxWidth: '400px', height: 'auto' }}
            />
          </motion.div>
          {/* Left: Text Content */}
          <motion.div variants={textVariants}>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: 'Orbitron, sans-serif' }} // Cool custom font
            >
              About Us
            </h2>
            <p className="text-lg text-gray-200 dark:text-gray-300 mb-6 max-w-lg">
              At FashionFusion, we’re revolutionizing e-commerce with cutting-edge artificial intelligence. Our mission is to make shopping smarter, faster, and more personalized. From AI-driven recommendations to seamless navigation, we’re here to elevate your experience.
            </p>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/products'}
            >
              Discover More
            </motion.button>
          </motion.div>

         
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-blue-500/30 rounded-full"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 bg-purple-500/30 rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  );
}

export default AboutUsSection;