import React from "react";
import { Header } from "./components/Header/Header";
import { Carousel } from "./components/Carousel/Carousel";
import { ProductGrid } from "./components/ProductGrid/ProductGrid";
import { CartSidebar } from "./components/Cart/CartSidebar";
import { Footer } from "./components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { carouselItems, products } from "./data";
import Login from "./pages/Login";
import { PublicRoute } from "./Route";
function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Header />
        <CartSidebar />
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public Routes with Middleware */}
              {PublicRoute?.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  element={item.element}
                />
              ))}

              {/* 404 - Not Found Route */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Suspense>
        </Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <CartSidebar />
          <main className="pt-20">
            <Carousel items={carouselItems} />
            <ProductGrid products={products} />
          </main>
          <Footer />
          {/* <Login/> */}
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
