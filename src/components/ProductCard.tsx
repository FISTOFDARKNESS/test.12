import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Eye } from 'lucide-react';
import { ShopifyProduct } from '../services/shopify';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const firstVariant = product.variants.edges[0].node;
  const firstImage = product.images.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      variantId: firstVariant.id,
      title: product.title,
      variantTitle: firstVariant.title === 'Default Title' ? '' : firstVariant.title,
      price: firstVariant.price.amount,
      currencyCode: firstVariant.price.currencyCode,
      image: firstImage?.url || 'https://picsum.photos/400/600',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/products/${product.handle}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-2xl mb-4">
          <img
            src={firstImage?.url || 'https://picsum.photos/400/600'}
            alt={firstImage?.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
            <div className="flex space-x-2 w-full">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white text-black py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
              >
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>
              <div className="bg-white text-black p-3 rounded-xl hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                <Eye size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm font-medium text-neutral-500">
            {firstVariant.price.currencyCode} {parseFloat(firstVariant.price.amount).toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
