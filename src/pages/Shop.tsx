
import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { mockPerfumes } from '../lib/utils';
import { Product } from '../lib/types';

export function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockPerfumes);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif mb-2">Our Collection</h1>
            <p className="text-muted-foreground">Discover your perfect scent</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ProductFilters
              onFiltersChange={(filters) => {
                // TODO: Implement actual filtering logic
                console.log(filters);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}