import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function CartSidebar() {
  const { isOpen, toggleCart, cartItems, removeFromCart, total } = useCart();

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold dark:text-white">Shopping Cart</h2>
            <button 
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-20 w-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t dark:border-gray-700 px-4 py-6">
          <div className="flex justify-between text-base font-medium dark:text-white">
            <p>Subtotal</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <button
            className="mt-6 w-full bg-blue-600 px-6 py-3 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}