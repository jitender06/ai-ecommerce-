import React from "react";
import Header  from "./components/Header/Header";
import { CartSidebar } from "./components/Cart/CartSidebar";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { PublicRoute, UserRoute } from "./Route";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Loader } from "./components/Loader"
function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <Header />
          <CartSidebar />
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

              {/* User Routes with Middleware */}
              {UserRoute?.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  element={
                    // <UserMiddleware>
                    item.element
                    // </UserMiddleware>
                  }
                />
              ))}


              {/* 404 - Not Found Route */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Suspense>
          {/* <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <CartSidebar />
          <main className="pt-20">
            <Carousel items={carouselItems} />
            <ProductGrid products={products} />
          </main>
          <Footer />
          <Login/>
          </div> */}
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
