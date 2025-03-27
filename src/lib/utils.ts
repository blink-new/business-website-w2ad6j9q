
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const mockPerfumes = [
  {
    id: '1',
    name: 'Midnight Rose',
    brand: 'Luxe Scents',
    description: 'A captivating blend of Bulgarian rose, blackcurrant, and vanilla.',
    price: 120,
    sizes: [
      { ml: 30, price: 120, inStock: true },
      { ml: 50, price: 180, inStock: true },
      { ml: 100, price: 250, inStock: false },
    ],
    images: [
      'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595425964272-fc617fa7bb54?auto=format&fit=crop&q=80&w=800',
    ],
    scentNotes: {
      top: ['Blackcurrant', 'Bergamot'],
      heart: ['Bulgarian Rose', 'Jasmine'],
      base: ['Vanilla', 'Musk', 'Amber'],
    },
    category: ['Floral', 'Oriental'],
    gender: 'Feminine',
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    brand: 'Luxe Scents',
    description: 'Fresh marine notes combined with citrus and woody base.',
    price: 95,
    sizes: [
      { ml: 30, price: 95, inStock: true },
      { ml: 50, price: 140, inStock: true },
      { ml: 100, price: 190, inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    ],
    scentNotes: {
      top: ['Sea Salt', 'Bergamot'],
      heart: ['Lavender', 'Marine Notes'],
      base: ['Cedar', 'Musk'],
    },
    category: ['Fresh', 'Aquatic'],
    gender: 'Unisex',
  },
  {
    id: '3',
    name: 'Velvet Oud',
    brand: 'Luxe Scents',
    description: 'Rich and mysterious blend of oud, rose, and precious woods.',
    price: 150,
    sizes: [
      { ml: 50, price: 150, inStock: true },
      { ml: 100, price: 280, inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=800',
    ],
    scentNotes: {
      top: ['Saffron', 'Rose'],
      heart: ['Oud', 'Patchouli'],
      base: ['Amber', 'Sandalwood'],
    },
    category: ['Woody', 'Oriental'],
    gender: 'Unisex',
  },
]