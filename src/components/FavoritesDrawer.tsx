import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ExternalLink, ArrowRight } from 'lucide-react';
import { DiaryProduct } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  products: DiaryProduct[];
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onQuickView: (id: string) => void;
  onStartQuiz: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  products,
  onRemoveFavorite,
  onClearAll,
  onQuickView,
  onStartQuiz,
}) => {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex justify-end"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-cumid-charcoal/40 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md bg-cumid-ivory h-full shadow-book border-l border-cumid-sand flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-5 border-b border-cumid-sand flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
              <div>
                <h3 id="drawer-title" className="font-serif text-lg font-semibold text-cumid-charcoal">
                  Saved Diaries ({favoriteProducts.length})
                </h3>
                <p className="text-[11px] text-cumid-subtle">
                  Persisted across visits via LocalStorage
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-cumid-slate hover:bg-cumid-cream transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl bg-white border border-cumid-sand shadow-soft-sm flex items-center gap-3.5 group hover:border-cumid-stone transition-all"
                >
                  {/* Thumbnail */}
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden bg-cumid-cream shrink-0 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onQuickView(product.id);
                    }}
                  >
                    <img
                      src={product.localImage}
                      alt={product.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = product.image;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cumid-plum">
                      {product.category}
                    </span>
                    <h4
                      className="font-serif text-sm font-semibold text-cumid-charcoal truncate cursor-pointer hover:text-cumid-plum"
                      onClick={() => {
                        onClose();
                        onQuickView(product.id);
                      }}
                    >
                      {product.title}
                    </h4>
                    <p className="text-xs font-bold text-cumid-charcoal mt-0.5">
                      ₹{product.price}
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-1">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-cumid-muted hover:text-cumid-charcoal hover:bg-cumid-cream"
                      title="Preorder on CUMID Store"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => onRemoveFavorite(product.id)}
                      className="p-2 rounded-lg text-cumid-subtle hover:text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 px-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-cumid-cream mx-auto flex items-center justify-center text-cumid-subtle">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-cumid-charcoal">
                    Your Wishlist is Empty
                  </h4>
                  <p className="text-xs text-cumid-muted mt-1 max-w-xs mx-auto">
                    Tap the heart icon on any diary cover or discover your match through our quiz to save favourites here.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onStartQuiz();
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-cumid-charcoal text-white text-xs font-semibold hover:bg-cumid-plum transition-colors"
                >
                  <span>Start MoodMatch Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {favoriteProducts.length > 0 && (
            <div className="p-4 bg-white border-t border-cumid-sand space-y-2">
              <button
                onClick={onClearAll}
                className="w-full py-2.5 rounded-xl border border-cumid-sand text-xs font-semibold text-cumid-muted hover:text-rose-500 hover:border-rose-200 transition-colors"
              >
                Clear All Favourites
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
