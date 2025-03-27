import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Gender, ScentFamily } from '../lib/types';

interface FiltersState {
  scentFamily: ScentFamily[];
  gender: Gender[];
  priceRange: [number, number];
}

interface ProductFiltersProps {
  onFiltersChange: (filters: FiltersState) => void;
  totalProducts: number;
  filteredCount: number;
}

export function ProductFilters({ onFiltersChange, totalProducts, filteredCount }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    scentFamily: [],
    gender: [],
    priceRange: [0, 500],
  });

  const scentFamilies: ScentFamily[] = ['Floral', 'Woody', 'Oriental', 'Fresh', 'Aquatic'];
  const genders: Gender[] = ['Masculine', 'Feminine', 'Unisex'];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const toggleFilter = (type: keyof Pick<FiltersState, 'scentFamily' | 'gender'>, value: ScentFamily | Gender) => {
    setFilters(prev => {
      const array = prev[type];
      const index = array.indexOf(value as any);
      
      const newArray = index === -1 
        ? [...array, value] 
        : array.filter((item) => item !== value);

      return {
        ...prev,
        [type]: newArray,
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      scentFamily: [],
      gender: [],
      priceRange: [0, 500],
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-full hover:bg-secondary transition-colors"
      >
        <SlidersHorizontal size={20} />
        <span>Filters</span>
        {(filters.scentFamily.length > 0 || filters.gender.length > 0) && (
          <span className="ml-2 bg-white text-black w-5 h-5 rounded-full flex items-center justify-center text-sm">
            {filters.scentFamily.length + filters.gender.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 w-72 bg-white rounded-lg shadow-xl p-6 z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-serif text-lg">Filters</h3>
                <p className="text-sm text-gray-500">
                  Showing {filteredCount} of {totalProducts} products
                </p>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Scent Family</h4>
                <div className="space-y-2">
                  {scentFamilies.map((scent) => (
                    <label key={scent} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.scentFamily.includes(scent)}
                        onChange={() => toggleFilter('scentFamily', scent)}
                        className="rounded border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <span>{scent}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Gender</h4>
                <div className="space-y-2">
                  {genders.map((gender) => (
                    <label key={gender} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.gender.includes(gender)}
                        onChange={() => toggleFilter('gender', gender)}
                        className="rounded border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Price Range</h4>
                  <span className="text-sm text-gray-500">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => {
                    setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                    }));
                  }}
                  className="w-full"
                />
              </div>

              {(filters.scentFamily.length > 0 || filters.gender.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-gray-500 hover:text-black transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}