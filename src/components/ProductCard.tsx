import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../lib/types';
import { useCart } from '../lib/cart';
import { useWishlist } from '../lib/wishlist';
import { useToast } from './ui/Toast';
import { formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { showToast } = useToast();

  const isInWishlist = wishlistState.items.some(item => item.id === product.id);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cartDispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: 1,
        size: product.sizes[0]
      }
    });
    showToast('Added to cart', 'success');
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      wishlistDispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: product.id
      });
      showToast('Removed from wishlist', 'info');
    } else {
      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        payload: product
      });
      showToast('Added to wishlist', 'success');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <motion.div 
          className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-end justify-center p-4"
          >
            <motion.button
              onClick={addToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-black py-2 rounded-full flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={toggleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-black'
          } shadow-md transition-colors`}
        >
          <Heart size={18} fill={isInWishlist ? 'white' : 'none'} />
        </motion.button>

        <div className="mt-4 space-y-1">
          <motion.h3 
            className="text-sm font-medium text-gray-900"
            whileHover={{ x: 4 }}
          >
            {product.name}
          </motion.h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <p className="text-sm font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}