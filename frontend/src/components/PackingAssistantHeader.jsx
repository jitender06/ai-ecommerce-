import React from "react";
import { motion } from "framer-motion";
import { Typography, Button, Stack } from "@mui/material";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Animation variants
const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.6, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

function PackingAssistantHeader() {
  return (
    <motion.div
      className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1521335629791-ce4aad8e9171?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
      }}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />

      {/* Content */}
      <Stack direction="column" spacing={3} alignItems="center" className="relative z-10 text-center px-6">
        <motion.div
          className="flex items-center gap-3"
          variants={textVariants}
        >
          <Sparkles className="h-10 w-10 text-blue-400 animate-pulse" />
          <Typography
            variant="h3"
            className="text-white font-extrabold drop-shadow-lg"
            sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
          >
            FashionFusion Packing Assistant
          </Typography>
          <Sparkles className="h-10 w-10 text-blue-400 animate-pulse" />
        </motion.div>

        <motion.div variants={textVariants}>
          <Typography
            className="text-gray-200 font-medium drop-shadow-md"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, maxWidth: "600px" }}
          >
            Discover personalized packing and dressing tips for every occasion with our AI-powered assistant.
          </Typography>
        </motion.div>

        <motion.div variants={buttonVariants} whileHover="hover">
          <Button
            component={Link}
            to="/packing-assistant"
            variant="contained"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-3 shadow-lg"
          >
            Try It Now
          </Button>
        </motion.div>
      </Stack>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1, transition: { duration: 1.5, ease: "easeInOut" } }}
      />
    </motion.div>
  );
}

export default PackingAssistantHeader;