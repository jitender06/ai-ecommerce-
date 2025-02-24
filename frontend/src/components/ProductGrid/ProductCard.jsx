import React from 'react';
import { Heart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function ProductCard({ product, featured }) {
  const { addToCart } = useCart();

  return (
    <div 
      className={`group ${
        featured ? 'col-span-full lg:col-span-2' : 'col-span-1'
      }`}
    >
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full ${
            featured ? 'h-[400px] sm:h-[500px]' : 'h-64'
          } object-cover group-hover:scale-105 transition-transform duration-300`}
        />
        <button className="absolute top-3 right-3 p-1.5 bg-white dark:bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-1 dark:text-white">{product.name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{product.price}</span>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}