import { useState } from 'react';
import { Search, Plus, Star } from 'lucide-react';
import type { CartItem } from '../lib/supabase';

type MenuProps = {
  onAddToCart: (item: CartItem) => void;
};

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isVeg: boolean;
  badge?: string;
};

const menuItems: MenuItem[] = [
  {
    id: 'burger-classic',
    name: 'Classic Crispy Burger',
    description: 'Double beef patty, cheddar cheese, lettuce, tomato, onion & special burger sauce in a toasted sesame bun',
    price: 149,
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Burgers',
    rating: 4.8,
    isVeg: false,
    badge: 'Bestseller',
  },
  {
    id: 'burger-spicy',
    name: 'Spicy Fiery Burger',
    description: 'Crispy chicken patty with jalapeños, sriracha sauce, coleslaw & pepper jack cheese',
    price: 169,
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Burgers',
    rating: 4.7,
    isVeg: false,
  },
  {
    id: 'burger-veg',
    name: 'Veg Aloo Tikki Burger',
    description: 'Crispy aloo tikki patty with mint chutney, pickled onions & fresh veggies',
    price: 99,
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Burgers',
    rating: 4.5,
    isVeg: true,
  },
  {
    id: 'vadapav-classic',
    name: 'Mumbai Vada Pav',
    description: 'Golden batata vada stuffed with spiced mashed potato, served with fiery green & sweet tamarind chutney',
    price: 49,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Vada Pav',
    rating: 4.9,
    isVeg: true,
    badge: 'Street Fav',
  },
  {
    id: 'vadapav-cheese',
    name: 'Cheese Vada Pav',
    description: 'Loaded with melted processed cheese over the classic vada pav — an indulgent twist',
    price: 69,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Vada Pav',
    rating: 4.7,
    isVeg: true,
  },
  {
    id: 'vadapav-schezwan',
    name: 'Schezwan Vada Pav',
    description: 'Spicy schezwan sauce loaded vada pav with crispy fried onions & coriander',
    price: 65,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Vada Pav',
    rating: 4.6,
    isVeg: true,
  },
  {
    id: 'fries-classic',
    name: 'Classic French Fries',
    description: 'Golden crispy fries seasoned with rock salt & our house spice blend, served with ketchup',
    price: 89,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'French Fries',
    rating: 4.6,
    isVeg: true,
    badge: 'Crispy',
  },
  {
    id: 'fries-masala',
    name: 'Masala Peri Peri Fries',
    description: 'Crispy fries tossed in bold peri peri masala with a sprinkle of chaat powder',
    price: 99,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'French Fries',
    rating: 4.7,
    isVeg: true,
  },
  {
    id: 'fries-cheese',
    name: 'Cheesy Loaded Fries',
    description: 'Piled high with nacho cheese sauce, jalapeños & crispy fried shallots',
    price: 119,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'French Fries',
    rating: 4.8,
    isVeg: true,
  },
  {
    id: 'frankie-paneer',
    name: 'Paneer Frankie Roll',
    description: 'Chargrilled paneer tikka, bell peppers, red onions & mint chutney wrapped in soft rumali roti',
    price: 99,
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Frankies',
    rating: 4.7,
    isVeg: true,
    badge: 'New',
  },
  {
    id: 'frankie-chicken',
    name: 'Chicken Tikka Frankie',
    description: 'Spiced chicken tikka pieces with tangy sauces, onions & coriander in a fresh roti wrap',
    price: 119,
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Frankies',
    rating: 4.8,
    isVeg: false,
  },
  {
    id: 'frankie-egg',
    name: 'Egg & Veggie Frankie',
    description: 'Fluffy scrambled egg with sautéed mixed vegetables & house masala in a warm roti',
    price: 79,
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Frankies',
    rating: 4.5,
    isVeg: false,
  },
];

const categories = ['All', 'Burgers', 'Vada Pav', 'French Fries', 'Frankies'];

export default function Menu({ onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = (item: MenuItem) => {
    onAddToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 });
    setAddedIds((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-2">Our Menu</h1>
          <p className="text-orange-100">Fresh, crispy, and made with love — choose your favourites</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative max-w-lg mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for burgers, fries, frankies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Search className="w-16 h-16 mx-auto opacity-30 mb-3" />
            <p className="text-xl font-semibold">No items found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.isVeg ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {item.isVeg ? 'VEG' : 'NON-VEG'}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-semibold text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mb-4 leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-orange-600">₹{item.price}</span>
                    <button
                      onClick={() => handleAdd(item)}
                      className={`flex items-center gap-1.5 font-bold px-4 py-2 rounded-full text-sm transition-all ${
                        addedIds.has(item.id)
                          ? 'bg-green-500 text-white scale-95'
                          : 'bg-orange-600 hover:bg-orange-700 text-white hover:scale-105'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      {addedIds.has(item.id) ? 'Added!' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
