import React from 'react';
import { Header } from './components/Header/Header';
import { Carousel } from './components/Carousel/Carousel';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { CartSidebar } from './components/Cart/CartSidebar';
import { Footer } from './components/Footer/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { carouselItems, products } from './data';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <CartSidebar />
          <main className="pt-20">
            <Carousel items={carouselItems} />
            <ProductGrid products={products} />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;