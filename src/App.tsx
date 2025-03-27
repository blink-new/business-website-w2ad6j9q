
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { cn } from './lib/utils'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="flex items-center space-x-8">
          <a href="/" className="text-2xl font-serif">Luxe Scents</a>
          <div className="hidden lg:flex items-center space-x-6">
            <a href="/shop" className="hover:text-secondary transition-colors">Shop</a>
            <a href="/collections" className="hover:text-secondary transition-colors">Collections</a>
            <a href="/about" className="hover:text-secondary transition-colors">About</a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:text-secondary transition-colors">
            <Heart size={24} />
          </button>
          <button className="p-2 hover:text-secondary transition-colors">
            <ShoppingBag size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg"
          >
            <div className="flex flex-col py-4">
              <a href="/shop" className="px-4 py-2 hover:bg-muted transition-colors">Shop</a>
              <a href="/collections" className="px-4 py-2 hover:bg-muted transition-colors">Collections</a>
              <a href="/about" className="px-4 py-2 hover:bg-muted transition-colors">About</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80)',
            opacity: 0.7
          }}
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Discover Your Signature Scent</h1>
            <p className="text-lg mb-8">Explore our collection of luxury fragrances crafted to capture moments and emotions.</p>
            <a 
              href="/shop"
              className="inline-block bg-white text-black px-8 py-3 rounded-full hover:bg-secondary hover:text-white transition-colors"
            >
              Shop Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-12 text-center">Featured Fragrances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPerfumes.map((perfume, index) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={perfume.images[0]} 
                    alt={perfume.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2">{perfume.name}</h3>
                  <p className="text-muted-foreground mb-4">{perfume.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">${perfume.price}</span>
                    <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-secondary transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-serif mb-6">Discover Our Collections</h2>
              <p className="text-muted-foreground mb-8">
                From floral elegance to woody sophistication, explore our carefully curated collections 
                designed to match your unique personality.
              </p>
              <a 
                href="/collections"
                className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-secondary transition-colors"
              >
                View Collections
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1595425964272-fc617fa7bb54?auto=format&fit=crop&q=80"
                  alt="Collection preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="aspect-square mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80"
                  alt="Collection preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl mb-4">Luxe Scents</h3>
              <p className="text-gray-400">
                Discover luxury fragrances that tell your story.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/shop" className="block text-gray-400 hover:text-white">Shop</a>
                <a href="/collections" className="block text-gray-400 hover:text-white">Collections</a>
                <a href="/about" className="block text-gray-400 hover:text-white">About</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: contact@luxescents.com</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Luxe Scents. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}