import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { mockPerfumes } from '../lib/utils';
import { Product } from '../lib/types';

export function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockPerfumes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (filters: any) => {
    let filtered = [...mockPerfumes];

    // Filter by scent family
    if (filters.scentFamily.length > 0) {
      filtered = filtered.filter((product) =>
        product.category.some((cat) => filters.scentFamily.includes(cat))
      );
    }

    // Filter by gender
    if (filters.gender.length > 0) {
      filtered = filtered.filter((product) =>
        filters.gender.includes(product.gender)
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (product) => product.price <= filters.priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-serif mb-2">Our Collection</h1>
            <p className="text-muted-foreground">
              Discover your perfect scent
            </p>
          </motion.div>
          <div className="mt-4 md:mt-0">
            <ProductFilters
              onFiltersChange={handleFiltersChange}
              totalProducts={mockPerfumes.length}
              filteredCount={filteredProducts.length}
            />
          </div>
        </div>

        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gray-100 animate-pulse"
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-gray-500">
                    No products match your filters
                  </p>
                  <button
                    onClick={() => handleFiltersChange({
                      scentFamily: [],
                      gender: [],
                      priceRange: [0, 500],
                    })}
                    className="mt-4 text-black hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}