import React from 'react';
import { Heart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import { useNavigate } from 'react-router-dom';

export function ProductCard({ product, featured }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { token } = useSelector((state) => state.auth);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating to product page
    if (!token) {
      alert('Please log in to add items to your cart!');
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation(); // Prevent navigating to product page
    dispatch(removeFromCart(product._id));
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation(); // Prevent navigating to product page
    if (!token) {
      alert('Please log in to add items to your wishlist!');
      navigate('/login');
      return;
    }
    if (isInWishlist()) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const isInCart = () => {
    return cartItems && cartItems.some((item) => item.productId._id === product._id);
  };

  const isInWishlist = () => {
    return wishlistItems && wishlistItems.some((item) => item._id === product._id);
  };

  return (
    <div
      className={`group ${
        featured ? 'col-span-full lg:col-span-2' : 'col-span-1'
      }`}
      onClick={() => navigate(`/products/${product._id}`)} // Navigate to product detail page
    >
      <div className="relative overflow-hidden rounded-lg mb-3 border-gray-700 border-2">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full ${
            featured ? 'h-[400px] sm:h-[500px]' : 'h-64'
          } object-cover group-hover:scale-105 transition-transform duration-300`}
        />
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-1.5 bg-white dark:bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist() ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'
            }`}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          {isInCart() ? (
            <button
              onClick={handleRemoveFromCart}
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-1 dark:text-white">{product.name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${product.price}</span>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;