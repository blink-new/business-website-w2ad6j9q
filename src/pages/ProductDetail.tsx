
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { mockPerfumes } from '../lib/utils';
import { formatPrice } from '../lib/utils';

export function ProductDetailPage() {
  const { id } = useParams();
  const product = mockPerfumes.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-serif mb-2">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{product.brand}</p>
              <p className="text-2xl font-semibold">{formatPrice(selectedSize?.price || product.price)}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex space-x-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size.ml}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      } ${!size.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!size.inStock}
                    >
                      {size.ml}ml
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-full border hover:border-black"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-full border hover:border-black"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-full hover:bg-secondary transition-colors">
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </button>
                <button className="p-3 rounded-full border hover:border-black">
                  <Heart size={20} />
                </button>
              </div>

              <div>
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
              </div>

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}