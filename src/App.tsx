import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { Navbar, Footer } from './components/Layout';
import { Cart } from './components/Cart';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetails } from './components/ProductDetails';
import { CartProvider } from './context/CartContext';

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/luxury/1920/1080?blur=2"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
              New Collection 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter mb-8 leading-[0.9]">
              ELEVATE YOUR <br />
              <span className="text-neutral-400">EVERYDAY.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 font-medium">
              Discover the intersection of premium craftsmanship and modern design. 
              Our latest collection is now available for early access.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-neutral-200 transition-all flex items-center group"
              >
                Shop Collection
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="px-10 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Our Story
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 right-0 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm font-bold tracking-widest text-neutral-400 uppercase">
            <div className="flex items-center space-x-2">
              <Sparkles size={16} />
              <span>Premium Materials</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap size={16} />
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span>Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-4xl font-bold font-display tracking-tight mb-4">Featured Products</h2>
              <p className="text-neutral-500 max-w-md">
                Explore our hand-picked selection of the season's most sought-after pieces.
              </p>
            </div>
            <Link to="/" className="text-black font-bold border-b-2 border-black pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-all">
              View All Products
            </Link>
          </div>

          <ProductGrid />
        </div>
      </section>

      {/* Brand Story / Bento Grid */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
            <div className="md:col-span-8 relative rounded-3xl overflow-hidden group">
              <img
                src="https://picsum.photos/seed/craft/1200/800"
                alt="Craftsmanship"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="text-3xl font-bold mb-2">The Art of Craft</h3>
                <p className="max-w-sm text-neutral-200">Every piece is meticulously crafted by master artisans with decades of experience.</p>
              </div>
            </div>
            <div className="md:col-span-4 relative rounded-3xl overflow-hidden group bg-black text-white p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-4">Sustainability First</h3>
                <p className="text-neutral-400">We believe in quality over quantity. Our materials are ethically sourced and built to last generations.</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <Shield size={32} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-display tracking-tight mb-6">Join the Inner Circle</h2>
          <p className="text-neutral-500 mb-10 text-lg">
            Subscribe to receive updates on new collections, exclusive events, and more.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-neutral-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black transition-all"
              required
            />
            <button
              type="submit"
              className="px-10 py-4 bg-black text-white rounded-full font-bold hover:bg-neutral-800 transition-all"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-xs text-neutral-400">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-black selection:text-white">
          <Navbar />
          <Cart />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:handle" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
