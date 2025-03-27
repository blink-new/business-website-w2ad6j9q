
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../lib/types';
import { formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to favorites
          }}
        >
          <Heart className="w-5 h-5" />
        </button>
      </Link>
      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <h3 className="font-serif text-xl">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          <button 
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-secondary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to cart
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}