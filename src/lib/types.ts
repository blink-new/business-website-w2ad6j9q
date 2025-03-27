
export interface ProductSize {
  ml: number;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  sizes: ProductSize[];
  images: string[];
  scentNotes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  category: string[];
  gender: 'Masculine' | 'Feminine' | 'Unisex';
}

export type ScentFamily = 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Aquatic';
export type Gender = 'Masculine' | 'Feminine' | 'Unisex';