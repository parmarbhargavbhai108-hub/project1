import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import History from './pages/History';
import type { CartItem } from './lib/supabase';
import { supabase } from './lib/supabase';

type Page = 'home' | 'menu' | 'history' | 'login';

function AppInner() {
  const { user } = useAuth();
  const [page, setPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const navigate = (p: Page) => {
    if (p === 'history' && !user) {
      setPage('login');
      return;
    }
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const increaseQty = (id: string) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decreaseQty = (id: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.quantity <= 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCheckout = async () => {
    if (!user) {
      setCartOpen(false);
      navigate('login');
      return;
    }

    if (cart.length === 0) return;

    setCheckoutLoading(true);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({ user_id: user.id, total_amount: total, status: 'confirmed' })
      .select()
      .maybeSingle();

    if (orderError || !order) {
      setCheckoutLoading(false);
      return;
    }

    const items = cart.map((item) => ({
      order_id: order.id,
      item_name: item.name,
      item_price: item.price,
      quantity: item.quantity,
    }));

    await supabase.from('order_items').insert(items);

    setCart([]);
    setCheckoutLoading(false);
    setCartOpen(false);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="font-sans">
      <Navbar
        currentPage={page}
        onNavigate={navigate}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      {orderSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl text-sm animate-bounce">
          Order placed successfully! Sit tight.
        </div>
      )}

      {page === 'home' && <Home onNavigate={navigate} onAddToCart={addToCart} />}
      {page === 'menu' && <Menu onAddToCart={addToCart} />}
      {page === 'history' && <History onNavigate={navigate} />}
      {page === 'login' && <Login onNavigate={navigate} />}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
        checkoutLoading={checkoutLoading}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
