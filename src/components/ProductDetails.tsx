import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { getProductByHandle, ShopifyProduct } from '../services/shopify';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export function ProductDetails() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      if (!handle) return;
      try {
        const data = await getProductByHandle(handle);
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
    window.scrollTo(0, 0);
  }, [handle]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-neutral-100 rounded-3xl"></div>
          <div className="space-y-6">
            <div className="h-10 bg-neutral-100 rounded w-3/4"></div>
            <div className="h-6 bg-neutral-100 rounded w-1/4"></div>
            <div className="h-32 bg-neutral-100 rounded"></div>
            <div className="h-14 bg-neutral-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="text-black underline">Back to shop</Link>
      </div>
    );
  }

  const firstVariant = product.variants.edges[0].node;
  const images = product.images.edges.map(e => e.node);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      variantId: firstVariant.id,
      title: product.title,
      variantTitle: firstVariant.title === 'Default Title' ? '' : firstVariant.title,
      price: firstVariant.price.amount,
      currencyCode: firstVariant.price.currencyCode,
      image: images[0]?.url || 'https://picsum.photos/800/800',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-black mb-8 transition-colors group">
        <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-neutral-100 rounded-3xl overflow-hidden"
          >
            <img
              src={images[selectedImage]?.url || 'https://picsum.photos/800/800'}
              alt={images[selectedImage]?.altText || product.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                  selectedImage === idx ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm text-neutral-500 font-medium">(4.9 • 128 Reviews)</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
              {product.title}
            </h1>
            <p className="text-2xl font-bold text-neutral-900">
              {firstVariant.price.currencyCode} {parseFloat(firstVariant.price.amount).toFixed(2)}
            </p>
          </div>

          <div className="prose prose-neutral mb-10">
            <p className="text-neutral-600 leading-relaxed">
              {product.description || "No description available for this premium product."}
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <button
              onClick={handleAddToCart}
              className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:bg-neutral-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag size={22} />
              <span>Add to Shopping Bag</span>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-neutral-100">
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Truck size={20} className="text-neutral-400" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <RefreshCcw size={20} className="text-neutral-400" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <ShieldCheck size={20} className="text-neutral-400" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Additional Details Accordion Placeholder */}
          <div className="border-t border-neutral-100">
            <details className="group py-4">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none">
                <span>Product Specifications</span>
                <span className="transition-transform group-open:rotate-180">+</span>
              </summary>
              <div className="pt-4 text-sm text-neutral-600 space-y-2">
                <p>• Premium materials sourced sustainably</p>
                <p>• Handcrafted with attention to detail</p>
                <p>• Designed for longevity and style</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
