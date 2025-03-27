
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './lib/cart';
import { WishlistProvider } from './lib/wishlist';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/Home';
import { ShopPage } from './pages/Shop';
import { ProductPage } from './pages/Product';
import { CartPage } from './pages/Cart';
import { WishlistPage } from './pages/Wishlist';
import { CheckoutForm } from './components/CheckoutForm';

export function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutForm />} />
            </Routes>
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}