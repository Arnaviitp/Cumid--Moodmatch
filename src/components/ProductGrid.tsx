import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, X, BookOpen } from 'lucide-react';
import { DiaryProduct } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: DiaryProduct[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onQuickView: (id: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isFavorite,
  onToggleFavorite,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'price-asc' | 'price-desc'>('featured');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const categories = ['All', 'Floral', 'Cute', 'Hinglish', 'Cars & Jets', 'Originals'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // Favorites filter
        if (favoritesOnly && !isFavorite(p.id)) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          return matchTitle || matchDesc || matchTagline || matchCategory || matchSku;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        return 0; // Default featured order
      });
  }, [products, selectedCategory, searchQuery, sortBy, favoritesOnly, isFavorite]);

  return (
    <section id="catalogue" className="py-20 bg-cumid-cream/40 border-t border-cumid-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-cumid-sand text-xs font-semibold text-cumid-plum shadow-soft-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>AUTHENTIC CUMID COLLECTION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-cumid-charcoal tracking-tight font-medium">
            Explore All 13 Pocket Diaries
          </h2>

          <p className="text-sm sm:text-base text-cumid-muted leading-relaxed">
            Every cover has a voice. Made-to-order square pocket diaries with top spiral binding, available for preorder at ₹149 plus ₹50 shipping.
          </p>
        </div>

        {/* Filters, Search & Controls Bar */}
        <div className="bg-white rounded-2xl border border-cumid-sand p-4 mb-8 shadow-soft-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cumid-subtle" />
              <input
                type="text"
                placeholder="Search diaries by title, vibe, mood, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-cumid-cream/50 border border-cumid-sand/80 text-xs sm:text-sm text-cumid-charcoal placeholder:text-cumid-subtle focus:outline-none focus:ring-2 focus:ring-cumid-plum/30 focus:border-cumid-plum transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cumid-subtle hover:text-cumid-charcoal p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right Controls: Sort & Favorites Filter */}
            <div className="flex items-center gap-3">
              {/* Wishlist only toggle */}
              <button
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  favoritesOnly
                    ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                    : 'bg-cumid-cream/50 border-cumid-sand text-cumid-slate hover:bg-cumid-cream'
                }`}
                title="Filter by saved favourites"
              >
                <Heart className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-rose-500' : ''}`} />
                <span>Favourites</span>
              </button>

              {/* Sort Select */}
              <div className="relative inline-flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cumid-subtle absolute left-3 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="pl-8 pr-7 py-2 rounded-xl bg-cumid-cream/50 border border-cumid-sand text-xs font-medium text-cumid-slate focus:outline-none focus:ring-2 focus:ring-cumid-plum/30 appearance-none cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="name">Sort: Name (A-Z)</option>
                  <option value="price-asc">Sort: Price (Low to High)</option>
                  <option value="price-desc">Sort: Price (High to Low)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? products.length 
                : products.filter(p => p.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-cumid-charcoal text-white shadow-soft-sm'
                      : 'bg-cumid-cream/60 hover:bg-cumid-cream text-cumid-muted hover:text-cumid-charcoal'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-cumid-sand/80 text-cumid-subtle'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={onToggleFavorite}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-cumid-sand max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-cumid-cream mx-auto flex items-center justify-center text-cumid-subtle">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-cumid-charcoal">
                No matching diaries found
              </h3>
              <p className="text-xs text-cumid-muted mt-1">
                We couldn't find any diaries matching your current filters or search term.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setFavoritesOnly(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cumid-charcoal text-white text-xs font-semibold hover:bg-cumid-plum transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
