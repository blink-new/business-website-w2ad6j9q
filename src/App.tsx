import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './lib/cart';
import { WishlistProvider } from './lib/wishlist';
import { ToastProvider } from './components/ui/Toast';
import { Navbar } from './components/Navbar';
import { ShopPage } from './pages/Shop';
import { ProductDetailPage } from './pages/ProductDetail';

export function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <Router>
            <div className="min-h-screen bg-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<ShopPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
              </Routes>
            </div>
          </Router>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}