import { useEffect, useState } from 'react';
import { Clock, ChevronDown, ChevronUp, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { Order } from '../lib/supabase';

type HistoryProps = {
  onNavigate: (page: 'home' | 'menu' | 'history' | 'login') => void;
};

export default function History({ onNavigate }: HistoryProps) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    setOrders(ordersData ?? []);
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center px-4">
        <div className="text-center">
          <UtensilsCrossed className="w-20 h-20 text-orange-200 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-800 mb-2">Login to See Your Orders</h2>
          <p className="text-gray-500 mb-6">Track your past orders and reorder your favourites</p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-2">Order History</h1>
          <p className="text-orange-100">Your past orders at Crispy&Deals</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 text-orange-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't ordered yet. Let's fix that!</p>
            <button
              onClick={() => onNavigate('menu')}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isExpanded = expandedId === order.id;
              const date = new Date(order.created_at);
              const formattedDate = date.toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric',
              });
              const formattedTime = date.toLocaleTimeString('en-IN', {
                hour: '2-digit', minute: '2-digit',
              });

              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div
                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-orange-50 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {order.order_items?.length ?? 0} item{(order.order_items?.length ?? 0) !== 1 ? 's' : ''}
                        </p>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formattedDate} at {formattedTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-black text-orange-600 text-lg">₹{Number(order.total_amount).toFixed(2)}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          order.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'delivered'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && order.order_items && (
                    <div className="border-t border-gray-100 px-5 pb-5">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-3">Order Items</p>
                      <div className="space-y-2">
                        {order.order_items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className="text-orange-500 font-bold text-sm">{item.quantity}x</span>
                              <span className="text-gray-700 font-medium text-sm">{item.item_name}</span>
                            </div>
                            <span className="font-bold text-gray-800 text-sm">
                              ₹{(Number(item.item_price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-orange-100">
                        <span className="font-bold text-gray-700">Total</span>
                        <span className="font-black text-orange-600 text-lg">₹{Number(order.total_amount).toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => onNavigate('menu')}
                        className="w-full mt-4 bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-2.5 rounded-xl transition-colors text-sm"
                      >
                        Reorder
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
