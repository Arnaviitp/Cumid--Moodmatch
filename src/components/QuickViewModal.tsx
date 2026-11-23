import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ExternalLink } from 'lucide-react';
import { DiaryProduct } from '../types';

interface QuickViewModalProps {
  product: DiaryProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  // Lock body scroll and listen for escape key
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

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-cumid-charcoal/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl border border-cumid-sand shadow-book overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm text-cumid-slate hover:text-cumid-charcoal hover:bg-cumid-cream border border-cumid-sand/80 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            
            {/* Product Image Showcase */}
            <div className="relative bg-cumid-cream p-6 sm:p-8 flex items-center justify-center">
              <div className="relative w-full max-w-[240px] aspect-square rounded-2xl overflow-hidden shadow-book border border-cumid-sand">
                <img
                  src={product.localImage}
                  alt={product.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = product.image;
                  }}
                  className="w-full h-full object-cover"
                />

                {/* Top Spiral Graphic */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-0.5 bg-white/90 rounded-full border border-cumid-sand">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="w-1.5 h-1 rounded-full bg-cumid-stone" />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Specifications & Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5 text-left">
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cumid-plum">
                    {product.category} · {product.sku}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-bold text-cumid-charcoal">
                      ₹{product.price}
                    </span>
                    <span className="text-[11px] text-cumid-subtle">+ ₹{product.shipping} shipping</span>
                  </div>
                </div>

                <h3 id="modal-title" className="font-serif text-2xl font-bold text-cumid-charcoal mt-1">
                  {product.title}
                </h3>

                <p className="text-xs font-medium italic text-cumid-plum mt-0.5">
                  "{product.tagline}"
                </p>

                <p className="text-xs text-cumid-muted mt-3 leading-relaxed">
                  {product.about || product.description}
                </p>
              </div>

              {/* Verified Specifications Grid */}
              <div className="p-3.5 rounded-xl bg-cumid-cream/70 border border-cumid-sand/80 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-cumid-subtle">Format:</span>
                  <span className="font-medium text-cumid-charcoal">{product.specs.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cumid-subtle">Binding:</span>
                  <span className="font-medium text-cumid-charcoal">{product.specs.binding}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cumid-subtle">Delivery:</span>
                  <span className="font-medium text-cumid-charcoal">{product.specs.delivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cumid-subtle">Availability:</span>
                  <span className="font-medium text-emerald-600">Preorders Open</span>
                </div>
              </div>

              {/* Actions Row */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-cumid-charcoal text-white font-medium text-xs hover:bg-cumid-plum transition-colors shadow-soft-sm group"
                >
                  <span>Preorder on CUMID Store</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`p-3 rounded-full border transition-all active:scale-90 ${
                    isFavorite
                      ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-sm'
                      : 'bg-white border-cumid-sand text-cumid-slate hover:bg-cumid-cream'
                  }`}
                  aria-label={isFavorite ? 'Remove from favourites' : 'Save to favourites'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Small Footnote */}
              <p className="text-[10px] text-cumid-subtle leading-normal">
                * Preorders confirmed via WhatsApp with CUMID team. One diary totals ₹199 (₹149 + ₹50 shipping).
              </p>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
