import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockPerfumes } from '../lib/utils';
import { Product } from '../lib/types';

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = mockPerfumes.filter(
        product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSelect = (product: Product) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${product.id}`);
  };

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={handleOpen}
        className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
          isOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
        }`}
      >
        <SearchIcon size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-12 w-screen max-w-lg bg-white rounded-lg shadow-xl border p-4 z-50"
          >
            <div className="flex items-center gap-2 mb-4">
              <SearchIcon size={20} className="text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search perfumes..."
                className="flex-1 outline-none text-lg"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="space-y-2">
              {results.map((product) => (
                <motion.button
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="w-full flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                </motion.button>
              ))}
              {query.length >= 2 && results.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No perfumes found
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}