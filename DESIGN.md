
# Luxe Scents - Perfume E-commerce

## Overview
Luxe Scents is an elegant perfume e-commerce platform that helps customers discover and purchase luxury fragrances. The platform focuses on creating an immersive shopping experience through beautiful visuals and detailed scent descriptions.

## Core Features

### 1. Product Discovery
- Grid view of perfumes with quick preview
- Advanced filtering by:
  - Scent family (Floral, Woody, Oriental, etc.)
  - Price range
  - Brand
  - Gender
- Search with autocomplete
- "Scent Finder" quiz for personalized recommendations

### 2. Product Details
- High-resolution product images
- Detailed scent pyramid (top, heart, base notes)
- Size and price options
- Customer reviews and ratings
- Related fragrances
- "Add to Cart" and "Save to Favorites"

### 3. Shopping Experience
- Persistent shopping cart
- Secure checkout process
- Order tracking
- Save favorite items
- User accounts for order history

## Technical Architecture

### Frontend
- React with TypeScript for type safety
- Tailwind CSS for styling
- ShadcN UI components
- Lucide icons
- Local storage for cart persistence
- Framer Motion for animations

### Data Structure

```typescript
interface Product {
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

interface ProductSize {
  ml: number;
  price: number;
  inStock: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  favorites: string[]; // Product IDs
  orders: Order[];
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
}
```

## User Interface

### Color Palette
- Primary: #1A1A1A (Rich Black)
- Secondary: #D4AF37 (Metallic Gold)
- Accent: #F5F5F5 (Off White)
- Text: #333333 (Dark Gray)
- Background: #FFFFFF (White)

### Typography
- Headings: Playfair Display
- Body: Inter

### Layout
- Clean, minimal design
- Generous white space
- Grid-based product layouts
- Sticky navigation
- Mobile-first responsive design

## Initial Development Phase
1. Set up project structure and styling
2. Implement product catalog and filtering
3. Build product detail pages
4. Create shopping cart functionality
5. Add user authentication
6. Develop checkout flow

The focus will be on creating a beautiful, functional MVP that delivers a premium shopping experience.