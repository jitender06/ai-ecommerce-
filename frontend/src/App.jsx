// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// // import Header from './components/Header';
// // import Footer from './components/Footer';
// // import Home from './pages/Home';
// // import ProductList from './pages/ProductList';
// // import Cart from './pages/Cart';

// function App() {
//   return (
//     <Router>
//       {/* <Header /> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/products" element={<ProductList />} />
//         <Route path="/cart" element={<Cart />} /> */}
//       </Routes>
//       {/* <Footer /> */}
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  User, 
  Heart,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Star,
} from 'lucide-react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
      title: "AI-Powered Fashion Picks",
      description: "Discover your perfect style with our smart recommendations"
    },
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
      title: "Personalized Shopping",
      description: "Shop smarter with AI-curated selections just for you"
    },
    {
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070",
      title: "Trending Collections",
      description: "Stay ahead with AI-predicted fashion trends"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Smart Casual Blazer",
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800",
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      name: "Premium Denim Jeans",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800",
      rating: 4.9
    },
    {
      id: 3,
      name: "Leather Weekend Bag",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800",
      rating: 4.7
    },
    {
      id: 4,
      name: "Classic White Sneakers",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800",
      rating: 4.6
    },
    {
      id: 5,
      name: "Designer Sunglasses",
      price: "$159.99",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800",
      rating: 4.5,
      featured: true
    },
    {
      id: 6,
      name: "Minimalist Watch",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800",
      rating: 4.9
    },
    {
      id: 7,
      name: "Summer Dress",
      price: "$69.99",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800",
      rating: 4.7
    },
    {
      id: 8,
      name: "Leather Boots",
      price: "$189.99",
      image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800",
      rating: 4.8
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Shop</span>
            </div>
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-600 hover:text-gray-900">
                <Heart className="h-6 w-6" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Carousel */}
        <div className="relative h-[600px] overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className="min-w-full h-full relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="max-w-7xl mx-auto px-8">
                    <h1 className="text-white text-5xl font-bold mb-4">{item.title}</h1>
                    <p className="text-white text-xl mb-8">{item.description}</p>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-12">Featured Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className={`group ${
                  product.featured 
                    ? 'sm:col-span-2 lg:col-span-2' 
                    : ''
                }`}
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={`w-full ${
                      product.featured 
                        ? 'h-[400px] sm:h-[500px]' 
                        : 'h-64'
                    } object-cover group-hover:scale-105 transition-transform duration-300`}
                  />
                  <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">{product.price}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Revolutionizing shopping with AI-powered recommendations and personalized experiences.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Shop</a></li>
                <li><a href="#" className="hover:text-white">Categories</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;