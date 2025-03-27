
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Menu } from 'lucide-react';
import { useCart } from '../lib/cart';
import { useWishlist } from '../lib/wishlist';
import { Search } from './Search';

export function Navbar() {
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  
  const cartItemsCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemsCount = wishlistState.items.length;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-serif">
              ESSENCE
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/shop"
                className="text-sm hover:text-secondary transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/collections"
                className="text-sm hover:text-secondary transition-colors"
              >
                Collections
              </Link>
              <Link
                to="/about"
                className="text-sm hover:text-secondary transition-colors"
              >
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Search />
            
            <Link to="/wishlist" className="relative p-2 hover:text-secondary transition-colors">
              <Heart size={24} />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 hover:text-secondary transition-colors">
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button className="md:hidden p-2 hover:text-secondary transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}