import { useState } from "react"
import { Brain, ShoppingBag, Sparkles, Target, Zap, ChevronRight, Star, Menu, X } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-violet-600" />
              <span className="font-bold text-xl">SmartShop AI</span>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-violet-600">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-violet-600">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-violet-600">
                Testimonials
              </a>
              <button className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-600 hover:text-violet-600">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-violet-600">
                  How it Works
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-violet-600">
                  Testimonials
                </a>
                <button className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-100 px-4 py-2 rounded-full text-violet-700 mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Shopping Experience</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
            Shop Smarter with AI Recommendations
          </h1>
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Discover products you'll love with our intelligent AI recommendation engine. Personalized shopping
            experience tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-violet-600 text-white px-8 py-3 rounded-full hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
              Start Shopping
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="border border-violet-600 text-violet-600 px-8 py-3 rounded-full hover:bg-violet-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Intelligent Features for Smart Shopping</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-violet-50 hover:bg-violet-100 transition-colors">
              <Brain className="h-12 w-12 text-violet-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
              <p className="text-gray-600">Our advanced AI learns your preferences to suggest products you'll love.</p>
            </div>
            <div className="p-6 rounded-2xl bg-violet-50 hover:bg-violet-100 transition-colors">
              <Target className="h-12 w-12 text-violet-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
              <p className="text-gray-600">Get a shopping experience that's uniquely tailored to your taste.</p>
            </div>
            <div className="p-6 rounded-2xl bg-violet-50 hover:bg-violet-100 transition-colors">
              <Zap className="h-12 w-12 text-violet-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Discovery</h3>
              <p className="text-gray-600">Find exactly what you're looking for with intelligent search.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Loved by Shoppers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border shadow-sm">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The AI recommendations are spot-on! I've discovered so many great products I wouldn't have found
                  otherwise. Shopping has never been easier."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
                    <span className="font-semibold text-violet-600">{String.fromCharCode(64 + i)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">Happy Customer {i}</p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-violet-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Shopping Experience?</h2>
          <p className="text-violet-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy shoppers who have discovered their perfect products through our AI recommendations.
          </p>
          <button className="bg-white text-violet-600 px-8 py-3 rounded-full hover:bg-violet-50 transition-colors inline-flex items-center gap-2">
            Get Started Now
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-violet-600" />
              <span className="font-bold">SmartShop AI</span>
            </div>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} SmartShop AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

