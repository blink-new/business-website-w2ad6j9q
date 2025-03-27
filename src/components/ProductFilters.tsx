
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Gender, ScentFamily } from '../lib/types';

interface FiltersState {
  scentFamily: ScentFamily[];
  gender: Gender[];
  priceRange: [number, number];
}

interface ProductFiltersProps {
  onFiltersChange: (filters: FiltersState) => void;
}

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    scentFamily: [],
    gender: [],
    priceRange: [0, 500],
  });

  const scentFamilies: ScentFamily[] = ['Floral', 'Woody', 'Oriental', 'Fresh', 'Aquatic'];
  const genders: Gender[] = ['Masculine', 'Feminine', 'Unisex'];

  const toggleFilter = (type: 'scentFamily' | 'gender', value: ScentFamily | Gender) => {
    const newFilters = { ...filters };
    const array = newFilters[type];
    const index = array.indexOf(value as any);
    
    if (index === -1) {
      array.push(value as any);
    } else {
      array.splice(index, 1);
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-full hover:bg-secondary transition-colors"
      >
        <SlidersHorizontal size={20} />
        <span>Filters</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full mt-2 left-0 w-72 bg-white rounded-lg shadow-xl p-6 z-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif text-lg">Filters</h3>
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
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => {
                    const newFilters = {
                      ...filters,
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                    };
                    setFilters(newFilters);
                    onFiltersChange(newFilters);
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}