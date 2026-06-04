import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../lib/supabase';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  checkoutLoading: boolean;
};

export default function CartDrawer({
  open,
  onClose,
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  checkoutLoading,
}: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-orange-600">
            <div className="flex items-center gap-2 text-white">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-bold text-lg">Your Cart</span>
            </div>
            <button onClick={onClose} className="text-white hover:text-yellow-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                <ShoppingCart className="w-16 h-16 opacity-30" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-center">Add some delicious items from our menu!</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-orange-50 rounded-xl p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                    <p className="text-orange-600 font-bold text-sm">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => onDecrease(item.id)}
                        className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center hover:bg-orange-300 transition-colors"
                      >
                        <Minus className="w-3 h-3 text-orange-700" />
                      </button>
                      <span className="font-bold text-sm text-gray-700 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onIncrease(item.id)}
                        className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="font-bold text-gray-800 text-sm">₹{item.price * item.quantity}</p>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">Total</span>
                <span className="text-2xl font-black text-orange-600">₹{total.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                disabled={checkoutLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl transition-colors text-lg"
              >
                {checkoutLoading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
