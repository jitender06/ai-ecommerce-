import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import BlurText from "../../../animations/BlurText/BlurText";
import { Link } from "react-router-dom";

export function Carousel({ items }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {items &&
          items?.map((item, index) => (
            <div key={index} className="min-w-full h-full relative">
              {item.image.endsWith(".mp4") ? (
                <video
                  src={item.image}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                <div className="max-w-7xl mx-auto px-8">
                  {/* <h1 className="text-white text-5xl font-bold mb-4">
                  {item.title}
                </h1> */}
                  <BlurText
                    text={item.title}
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-white text-7xl font-bold mb-4"
                  />
                  <p className="text-white text-xl mb-8">{item.description}</p>
                  <Link to={"/ai-tools"}>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
