import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-neutral-200 py-3'
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110">
              E
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter text-neutral-900">
              EXCALIBUR
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">
              Shop All
            </Link>
            <Link to="/collections/new" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">
              New Arrivals
            </Link>
            <Link to="/collections/featured" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">
              Featured
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-5">
            <button className="p-2 text-neutral-600 hover:text-black transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-neutral-600 hover:text-black transition-colors">
              <User size={20} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-neutral-600 hover:text-black transition-colors"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 hover:text-black transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-neutral-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-neutral-900"
              >
                Shop All
              </Link>
              <Link
                to="/collections/new"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-neutral-900"
              >
                New Arrivals
              </Link>
              <Link
                to="/collections/featured"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-neutral-900"
              >
                Featured
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                E
              </div>
              <span className="font-display font-bold text-xl tracking-tighter text-neutral-900">
                EXCALIBUR
              </span>
            </Link>
            <p className="text-neutral-500 max-w-sm mb-6">
              Crafting premium experiences for the modern shopper. Our collection is curated with precision and care.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                <span className="text-xs font-bold">IG</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                <span className="text-xs font-bold">TW</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                <span className="text-xs font-bold">FB</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-neutral-600">
              <li><Link to="/" className="hover:text-black transition-colors">All Products</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Best Sellers</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-neutral-600">
              <li><Link to="/" className="hover:text-black transition-colors">Shipping Policy</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-neutral-400 mb-4 md:mb-0">
            © 2026 Excalibur Store. Powered by Shopify.
          </p>
          <div className="flex space-x-6">
            <div className="h-6 w-10 bg-neutral-200 rounded"></div>
            <div className="h-6 w-10 bg-neutral-200 rounded"></div>
            <div className="h-6 w-10 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
