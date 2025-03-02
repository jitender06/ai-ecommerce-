import React from "react";
import Header from "./components/Header/Header";
import { CartSidebar } from "./components/Cart/CartSidebar";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AdminRoute, PublicRoute } from "./Route";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Loader } from "./components/Loader";
import { AdminMiddleware, UserMiddleware } from "./Route/Middlewares";
import GeminiProvider from "./context/GeminiContext";
function App() {
  return (
    <Router>
      <GeminiProvider>
        <ThemeProvider>
          <CartProvider>
            <CartSidebar />
            <Suspense fallback={<Loader />}>
              <Routes>
                {/* Public Routes with Middleware */}
                {PublicRoute?.map((item, index) => (
                  <Route key={index} path={item.path} element={item.element} />
                ))}

                {/* User Routes with Middleware */}
                {AdminRoute?.map((item, index) => (
                  <Route
                    key={index}
                    path={item.path}
                    element={<AdminMiddleware>{item.element}</AdminMiddleware>}
                  />
                ))}

                {/* 404 - Not Found Route */}
                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </Suspense>
          </CartProvider>
        </ThemeProvider>
      </GeminiProvider>
    </Router>
  );
}

export default App;
