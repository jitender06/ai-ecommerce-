import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import footerCharacter from '../assets/animations/footer.json'; // Adjust path to your Lottie file
import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, ShoppingBag } from 'lucide-react';

function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const lottieVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <footer className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left: Brand & Tagline */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-8 w-8 text-white mr-2" />
              <h3 className="text-2xl font-bold">FashionFusion</h3>
            </div>
            <p className="text-sm text-gray-200 dark:text-gray-300 mb-6">
              Your AI-powered shopping companion—smart, stylish, and seamless.
            </p>
            <motion.div
              className="w-16 h-16 bg-white/20 rounded-full absolute -top-10 -left-10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Center: Navigation Links */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/products" className="text-gray-200 hover:text-white transition-colors">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/category/mens-shirts" className="text-gray-200 hover:text-white transition-colors">
                  Men’s Clothing
                </NavLink>
              </li>
              <li>
                <NavLink to="/category/womens-dresses" className="text-gray-200 hover:text-white transition-colors">
                  Women’s Clothing
                </NavLink>
              </li>
              <li>
                <NavLink to="/category/electronics" className="text-gray-200 hover:text-white transition-colors">
                  Electronics
                </NavLink>
              </li>
            </ul>
          </motion.div>

          {/* Right: Lottie Animation & Social Links */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-end">
            <motion.div variants={lottieVariants}>
              <Lottie
                animationData={footerCharacter}
                loop={true}
                // style={{ width: '150px', height: '150px' }}
              />
            </motion.div>
            <div className="flex space-x-4 mt-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-gray-200 hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                className="text-gray-200 hover:text-white"
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-gray-200 hover:text-white"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-6 border-t border-gray-200/30 dark:border-gray-700/30 text-center text-sm text-gray-200 dark:text-gray-300"
        //   variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} FashionFusion. All rights reserved.</p>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </footer>
  );
}

export default Footer;