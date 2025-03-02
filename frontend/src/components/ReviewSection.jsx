import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Sun, Moon } from "lucide-react";

const reviews = [
  {
    name: "Alice Johnson",
    review: "This AI eCommerce platform is a game-changer! Highly recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "David Smith",
    review: "Seamless experience, great recommendations. Would buy again!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Sophia Lee",
    review: "AI-powered suggestions are spot on! Love the interface.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "James Wilson",
    review:
      "Very intuitive and easy to use. The best online shopping experience!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

export default function ReviewSection() {
  return (
    <div
      className={"dark:bg-gray-900 dark:text-white bg-white text-gray-900 py-10 flex flex-col items-center transition-all duration-500"}
    >
      <motion.h2
        className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        What Our Customers Say
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 dark:text-gray-300 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Discover how AI recommendations are transforming shopping experiences!
      </motion.p>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-4xl mt-8"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div
                className={"relative overflow-hidden p-6 shadow-lg rounded-2xl flex flex-col h-full dark:bg-gray-800 dark:text-white bg-gray-100 text-gray-900"}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl"></div>
                <div className="relative flex flex-col items-center text-center h-full">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold">{review.name}</h3>
                  <p className="text-sm mt-2 flex-grow">{review.review}</p>
                  <div className="flex mt-4 text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
