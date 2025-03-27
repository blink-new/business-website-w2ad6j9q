import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { mockPerfumes } from '../lib/utils';
import { formatPrice } from '../lib/utils';
import { useCart } from '../lib/cart';
import { useWishlist } from '../lib/wishlist';
import { useToast } from '../components/ui/Toast';
import { ProductSize } from '../lib/types';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { showToast } = useToast();

  const product = mockPerfumes.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const isInWishlist = product ? wishlistState.items.some(item => item.id === product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const addToCart = () => {
    if (!selectedSize) return;
    
    cartDispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        size: selectedSize
      }
    });
    showToast('Added to cart', 'success');
  };

  const toggleWishlist = () => {
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
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                    selectedImage === index ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-serif mb-2">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{product.brand}</p>
              <p className="text-2xl font-semibold">{formatPrice(selectedSize?.price || product.price)}</p>
            </motion.div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-4">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size.ml}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      } ${!size.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!size.inStock}
                    >
                      {size.ml}ml
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-full border hover:border-black"
                  >
                    <Minus size={20} />
                  </motion.button>
                  <span className="w-12 text-center">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-full border hover:border-black"
                  >
                    <Plus size={20} />
                  </motion.button>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addToCart}
                  className="flex-1 flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-full hover:bg-secondary transition-colors"
                >
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleWishlist}
                  className={`p-3 rounded-full ${
                    isInWishlist 
                      ? 'bg-red-500 text-white border-red-500' 
                      : 'border hover:border-black'
                  }`}
                >
                  <Heart size={20} fill={isInWishlist ? 'white' : 'none'} />
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-medium mb-4">Scent Notes</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Top Notes</h4>
                    <ul className="space-y-1">
                      {product.scentNotes.top.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Heart Notes</h4>
                    <ul className="space-y-1">
                      {product.scentNotes.heart.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Base Notes</h4>
                    <ul className="space-y-1">
                      {product.scentNotes.base.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}