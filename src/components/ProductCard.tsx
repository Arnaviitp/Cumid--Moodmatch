import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ExternalLink, Sparkles } from 'lucide-react';
import { DiaryProduct } from '../types';

interface ProductCardProps {
  product: DiaryProduct;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onQuickView: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onQuickView,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-white rounded-2xl border border-cumid-sand/90 hover:border-cumid-stone/90 shadow-soft-sm hover:shadow-soft-lg transition-all p-3.5 text-left"
    >
      {/* Top Spiral Wire Simulation Graphic */}
      <div className="flex justify-center gap-1.5 mb-2 pb-1 border-b border-dashed border-cumid-sand/60">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="w-2 h-1 rounded-full bg-cumid-sand" />
        ))}
      </div>

      {/* Image Container */}
      <div 
        className="relative aspect-square w-full rounded-xl overflow-hidden bg-cumid-cream cursor-pointer"
        onClick={() => onQuickView(product.id)}
      >
        <img
          src={product.localImage}
          alt={product.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = product.image;
          }}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-cumid-charcoal shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Highlight Badge if exists */}
        {product.badge && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="text-[10px] font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full bg-cumid-plum/90 text-white shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-cumid-lavender" />
              <span>{product.badge}</span>
            </span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-white/90 text-cumid-slate hover:bg-white hover:text-rose-500 shadow-sm'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-transform ${
              isFavorite ? 'fill-rose-500 scale-110' : ''
            }`}
          />
        </button>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product.id);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-cumid-charcoal text-xs font-semibold shadow-soft-lg hover:scale-105 transition-transform"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="mt-3 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h4
              onClick={() => onQuickView(product.id)}
              className="font-serif text-base font-semibold text-cumid-charcoal hover:text-cumid-plum transition-colors cursor-pointer truncate"
              title={product.title}
            >
              {product.title}
            </h4>
            <span className="text-xs font-bold text-cumid-charcoal shrink-0">
              ₹{product.price}
            </span>
          </div>

          <p className="text-xs text-cumid-muted italic truncate mt-0.5" title={product.tagline}>
            "{product.tagline}"
          </p>

          <p className="text-[11px] text-cumid-subtle line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-3.5 pt-2.5 border-t border-cumid-sand/70 flex items-center justify-between">
          <button
            onClick={() => onQuickView(product.id)}
            className="text-[11px] font-medium text-cumid-muted hover:text-cumid-charcoal transition-colors"
          >
            Specs & Details
          </button>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-cumid-plum hover:text-cumid-plum-dark transition-colors"
          >
            <span>Preorder</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
