
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../lib/types';
import { useCart } from '../lib/cart';
import { useWishlist } from '../lib/wishlist';
import { formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  const isInWishlist = wishlistState.items.some(item => item.id === product.id);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cartDispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: 1,
        size: product.sizes[0].ml
      }
    });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      wishlistDispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: product.id
      });
    } else {
      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        payload: product
      });
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
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={addToCart}
              className="w-full bg-white text-black py-2 rounded-full flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          </div>
        </div>

        <button
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-black'
          } shadow-md hover:scale-110 transition-all`}
        >
          <Heart size={18} fill={isInWishlist ? 'white' : 'none'} />
        </button>

        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <p className="text-sm font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}