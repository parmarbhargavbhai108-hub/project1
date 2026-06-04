import { ChevronRight, Star, Clock, Truck } from 'lucide-react';
import type { CartItem } from '../lib/supabase';

type HomeProps = {
  onNavigate: (page: 'home' | 'menu' | 'history' | 'login') => void;
  onAddToCart: (item: CartItem) => void;
};

const featuredItems = [
  {
    id: 'burger-1',
    name: 'Classic Crispy Burger',
    description: 'Juicy beef patty, melted cheese, fresh veggies & our secret sauce',
    price: 149,
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'Bestseller',
    badgeColor: 'bg-red-500',
  },
  {
    id: 'vadapav-1',
    name: 'Mumbai Vada Pav',
    description: 'Crispy golden batata vada with fiery green chutney & garlic chutney',
    price: 49,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'Street Fav',
    badgeColor: 'bg-green-600',
  },
  {
    id: 'fries-1',
    name: 'Loaded French Fries',
    description: 'Golden crispy fries seasoned to perfection, served with ketchup',
    price: 89,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'Crispy',
    badgeColor: 'bg-yellow-500',
  },
  {
    id: 'frankie-1',
    name: 'Paneer Frankie Roll',
    description: 'Spiced paneer, bell peppers, onions wrapped in soft rumali roti',
    price: 99,
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'New',
    badgeColor: 'bg-blue-500',
  },
];

export default function Home({ onNavigate, onAddToCart }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
                Now Open — Order Fresh!
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                Crispy Bites,<br />
                <span className="text-yellow-300">Unbeatable</span> Deals
              </h1>
              <p className="text-orange-100 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                Mumbai's favourite street food meets gourmet vibes. Burgers, Vada Pav, Frankies & more — delivered hot to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => onNavigate('menu')}
                  className="bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full text-lg hover:bg-yellow-50 transition-all hover:scale-105 shadow-lg flex items-center gap-2 justify-center"
                >
                  Order Now <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('menu')}
                  className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-full text-lg hover:bg-white/10 transition-all flex items-center gap-2 justify-center"
                >
                  View Menu
                </button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm lg:max-w-none">
              {featuredItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`relative rounded-2xl overflow-hidden shadow-lg ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="font-bold text-sm leading-tight">{item.name}</p>
                    <p className="text-yellow-300 font-bold text-sm">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center sm:justify-between gap-6 text-center">
            {[
              { icon: Star, label: '4.8 Rating', sub: '2,400+ reviews', color: 'text-yellow-500' },
              { icon: Clock, label: '20-30 Min', sub: 'Avg delivery time', color: 'text-orange-500' },
              { icon: Truck, label: 'Free Delivery', sub: 'On orders above ₹199', color: 'text-green-500' },
            ].map(({ icon: Icon, label, sub, color }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className={`w-8 h-8 ${color}`} />
                <div className="text-left">
                  <p className="font-bold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Featured Items</h2>
            <p className="text-gray-500 mt-1">The crowd pleasers — order them fresh</p>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center gap-1 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
          >
            Full Menu <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-3 left-3 ${item.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                  {item.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-500 text-xs mb-3 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-orange-600">₹{item.price}</span>
                  <button
                    onClick={() => onAddToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 })}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-600 mx-4 sm:mx-8 lg:mx-auto max-w-7xl rounded-3xl mb-12 p-8 sm:p-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Hungry? We've Got You!</h2>
        <p className="text-orange-100 mb-6 text-lg">Browse our full menu and build your perfect meal.</p>
        <button
          onClick={() => onNavigate('menu')}
          className="bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full text-lg hover:bg-yellow-50 transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2"
        >
          Explore Full Menu <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        <p className="font-semibold text-white mb-1">Crispy&Deals</p>
        <p className="text-sm">Mumbai Street Food &bull; Fresh Every Day &bull; &copy; 2026</p>
      </footer>
    </div>
  );
}
