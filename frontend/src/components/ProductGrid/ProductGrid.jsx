import React from "react";
import { ProductCard } from "./ProductCard";
import ScrollFloat from "../../../animations/ScrollFloat/ScrollFloat";
import CircularText from "../../../animations/CircularText/CircularText";

export function ProductGrid({ products }) {
  const featuredProducts = products.filter((p) => p.featured);
  const regularProducts = products.filter((p) => !p.featured);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
        className="text-3xl font-bold mb-12 dark:text-white"
        >
        Featured Collection
        </ScrollFloat> */}
        <div>
          {/* <CircularText
            text="Featured*Collection"
            onHover="speedUp"
            spinDuration={20}
            className="text-5xl"
          /> */}
          <h2 className="text-4xl font-bold mb-12 dark:text-white">
            Featured Collection
          </h2>
        </div>

        {/* Featured Products Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>

        {/* Regular Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {regularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
