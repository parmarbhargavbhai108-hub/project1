import { useState } from 'react';
import { Menu, X, ShoppingCart, UtensilsCrossed } from 'lucide-react';
import type { CartItem } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

type Page = 'home' | 'menu' | 'history' | 'login';

type NavbarProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  onCartClick: () => void;
};

export default function Navbar({ currentPage, onNavigate, cartCount, onCartClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    onNavigate('home');
    setMobileOpen(false);
  };

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Menu', page: 'menu' },
    ...(user ? [{ label: 'History', page: 'history' as Page }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-orange-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white font-black text-xl tracking-tight hover:opacity-90 transition-opacity"
          >
            <UtensilsCrossed className="w-7 h-7" />
            <span>Crispy<span className="text-yellow-300">&</span>Deals</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`text-sm font-semibold transition-colors ${
                  currentPage === page
                    ? 'text-yellow-300 border-b-2 border-yellow-300 pb-0.5'
                    : 'text-white hover:text-yellow-200'
                }`}
              >
                {label}
              </button>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${
                  currentPage === 'login'
                    ? 'bg-yellow-300 text-orange-800'
                    : 'bg-white text-orange-600 hover:bg-yellow-50'
                }`}
              >
                Login
              </button>
            )}

            <button
              onClick={onCartClick}
              className="relative text-white hover:text-yellow-200 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={onCartClick} className="relative text-white">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-orange-700 px-4 pb-4 pt-2 flex flex-col gap-3">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => { onNavigate(page); setMobileOpen(false); }}
              className={`text-left text-sm font-semibold py-1 ${
                currentPage === page ? 'text-yellow-300' : 'text-white'
              }`}
            >
              {label}
            </button>
          ))}
          {user ? (
            <button onClick={handleLogout} className="text-left text-sm font-semibold text-red-300">
              Logout
            </button>
          ) : (
            <button
              onClick={() => { onNavigate('login'); setMobileOpen(false); }}
              className="text-left text-sm font-semibold text-yellow-300"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
