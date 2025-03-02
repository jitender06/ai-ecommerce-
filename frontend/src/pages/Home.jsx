import { Carousel } from "../components/Carousel/Carousel";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import AISection from "../components/AISection";
import { carouselItems, products } from "../data/index";
import ReviewSection from "../components/ReviewSection";
import Footer from "../components/Footer";
import AboutUsSection from "../components/AboutUsSection";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { IconButton } from "@mui/material";
import { Assistant } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import PackingAssistantHeader from "../components/PackingAssistantHeader";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-800">
      <Header />
      <Carousel items={carouselItems} />
      <CategorySection />
      <AISection />
      <ReviewSection />
      <PackingAssistantHeader/>
      <ProductGrid />
      <AboutUsSection />
      <Footer />
      <Link to="/ai-tools">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-xl flex items-center justify-center overflow-hidden transition-all duration-300"
        >
          {/* Animated Sparkle Effect */}
          <div className="absolute inset-0 bg-white opacity-10 blur-md animate-pulse"></div>

          {/* Glowing Sparks Around Button */}
          <div className="absolute -inset-3 rounded-full bg-transparent before:absolute before:content-[''] before:w-10 before:h-10 before:bg-white before:rounded-full before:blur-lg before:opacity-50 before:animate-ping after:absolute after:content-[''] after:w-5 after:h-5 after:bg-white after:rounded-full after:blur-md after:opacity-30 after:animate-ping"></div>

          {/* AI Bot Icon */}
          <Bot size={58} className="relative z-10" />

          {/* Extra floating sparkles */}
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-bounce left-3 top-3"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full opacity-40 animate-bounce right-3 bottom-3"></div>
          <div className="absolute w-2.5 h-2.5 bg-white rounded-full opacity-30 animate-bounce top-5 right-5"></div>
        </motion.button>
      </Link>
    </div>
  );
}
