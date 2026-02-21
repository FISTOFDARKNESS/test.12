import React, { useEffect, useState } from 'react';
import { getProducts, ShopifyProduct } from '../services/shopify';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';

export function ProductGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-neutral-100 rounded-2xl mb-4"></div>
            <div className="h-4 bg-neutral-100 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-neutral-100 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Connection Error</h2>
        <p className="text-neutral-500 mb-6">{error}</p>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          Please ensure your Shopify Storefront Token is correctly set in the environment variables.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
