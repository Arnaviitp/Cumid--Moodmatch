import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Compass, ShieldCheck, Heart } from 'lucide-react';
import { CUMID_PRODUCTS } from '../data/products';

interface HeroProps {
  onStartQuiz: () => void;
  onExploreAll: () => void;
  onSelectProduct: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  onToggleFavorite: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQuiz,
  onExploreAll,
  onSelectProduct,
  isFavorite,
  onToggleFavorite,
}) => {
  // Select 3 featured diaries for the hero visual showcase
  const featured = [
    CUMID_PRODUCTS.find((p) => p.id === 'lavender-bloom') || CUMID_PRODUCTS[0],
    CUMID_PRODUCTS.find((p) => p.id === 'kal-se-productive') || CUMID_PRODUCTS[1],
    CUMID_PRODUCTS.find((p) => p.id === 'low-battery') || CUMID_PRODUCTS[2],
  ];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-cumid-lavender/30 via-cumid-peach/25 to-cumid-sage-light/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-cumid-lavender/20 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cumid-peach/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Experience Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cumid-cream border border-cumid-sand text-xs font-semibold text-cumid-plum shadow-soft-sm">
              <Sparkles className="w-3.5 h-3.5 text-cumid-plum" />
              <span>MOODMATCH BY CUMID</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cumid-plum/50" />
              <span className="text-cumid-muted font-normal">Interactive Diary Discovery</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cumid-charcoal tracking-tight leading-[1.12]">
              Your next favourite diary is{' '}
              <span className="italic font-normal text-cumid-plum underline decoration-cumid-lavender decoration-wavy decoration-2 underline-offset-8">
                written in your mood.
              </span>
            </h1>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-cumid-muted max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Every thought deserves its own sanctuary. CUMID crafts square pocket diaries with top spiral binding and undeniable personality. Answer 4 intuitive prompts to discover the cover that mirrors your creative rhythm, humor, and lifestyle.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-cumid-charcoal text-white font-medium text-sm hover:bg-cumid-plum active:scale-[0.98] transition-all shadow-soft-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
              >
                <span>Find My Diary</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreAll}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-cumid-sand text-cumid-slate font-medium text-sm hover:bg-cumid-cream hover:border-cumid-stone active:scale-[0.98] transition-all shadow-soft-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
              >
                <BookOpen className="w-4 h-4 text-cumid-muted" />
                <span>Explore All 13 Diaries</span>
              </button>
            </div>

            {/* Small Trust & Product Quality Indicators */}
            <div className="pt-6 border-t border-cumid-sand/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <p className="text-xs font-semibold text-cumid-charcoal">₹149 Preorder</p>
                <p className="text-[11px] text-cumid-subtle">+ ₹50 Shipping</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-cumid-charcoal">Square Pocket</p>
                <p className="text-[11px] text-cumid-subtle">Top Spiral Binding</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-cumid-charcoal">13 Originals</p>
                <p className="text-[11px] text-cumid-subtle">5 Signature Categories</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-cumid-charcoal">Deterministic</p>
                <p className="text-[11px] text-cumid-subtle">Weighted Personality Fit</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Diary Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Canvas Card */}
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Stacked Showcase Cards */}
              <div className="relative h-[420px] sm:h-[460px] flex items-center justify-center">
                
                {/* Secondary Card (Behind Left - Kal Se Productive) */}
                <motion.div
                  whileHover={{ y: -8, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => onSelectProduct(featured[1].id)}
                  className="absolute left-0 sm:left-4 top-10 w-44 sm:w-52 bg-white rounded-2xl p-2.5 shadow-soft-lg border border-cumid-sand/80 -rotate-6 cursor-pointer group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-cumid-cream">
                    <img
                      src={featured[1].localImage}
                      alt={featured[1].title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = featured[1].image;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-cumid-charcoal shadow-sm">
                      {featured[1].category}
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-semibold text-cumid-charcoal truncate">{featured[1].title}</p>
                    <p className="text-[10px] text-cumid-muted">₹{featured[1].price}</p>
                  </div>
                </motion.div>

                {/* Secondary Card (Behind Right - Low Battery) */}
                <motion.div
                  whileHover={{ y: -8, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => onSelectProduct(featured[2].id)}
                  className="absolute right-0 sm:right-4 top-16 w-44 sm:w-52 bg-white rounded-2xl p-2.5 shadow-soft-lg border border-cumid-sand/80 rotate-6 cursor-pointer group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-cumid-cream">
                    <img
                      src={featured[2].localImage}
                      alt={featured[2].title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = featured[2].image;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-cumid-charcoal shadow-sm">
                      {featured[2].category}
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-semibold text-cumid-charcoal truncate">{featured[2].title}</p>
                    <p className="text-[10px] text-cumid-muted">₹{featured[2].price}</p>
                  </div>
                </motion.div>

                {/* Main Hero Card (Center Front - Lavender Bloom) */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => onSelectProduct(featured[0].id)}
                  className="relative z-10 w-52 sm:w-64 bg-white rounded-3xl p-3.5 shadow-book border border-cumid-stone/60 cursor-pointer group"
                >
                  {/* Top Spiral Binding Indicator graphic */}
                  <div className="flex justify-center gap-2 mb-2 pb-1 border-b border-dashed border-cumid-sand">
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className="w-2.5 h-1.5 rounded-full bg-cumid-stone/80" />
                    ))}
                  </div>

                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-cumid-lavender/30">
                    <img
                      src={featured[0].localImage}
                      alt={featured[0].title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = featured[0].image;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-semibold text-cumid-plum shadow-sm">
                      <Sparkles className="w-3 h-3 text-cumid-plum" />
                      <span>{featured[0].badge}</span>
                    </div>

                    {/* Quick Heart button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(featured[0].id);
                      }}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/95 backdrop-blur-sm shadow-sm hover:scale-110 active:scale-90 transition-transform"
                      aria-label="Save to favourites"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFavorite(featured[0].id) ? 'fill-rose-500 text-rose-500' : 'text-cumid-slate'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-3.5 text-center px-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-cumid-subtle">
                        {featured[0].category}
                      </span>
                      <span className="text-xs font-bold text-cumid-plum">
                        ₹{featured[0].price}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-cumid-charcoal mt-0.5 truncate">
                      {featured[0].title}
                    </h3>
                    <p className="text-xs text-cumid-muted italic mt-0.5">
                      "{featured[0].tagline}"
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-cumid-sand/60 flex items-center justify-between text-[11px] text-cumid-muted">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-cumid-sage-dark" />
                      Verified Preorder
                    </span>
                    <span className="text-cumid-plum font-medium group-hover:underline">
                      Quick View &rarr;
                    </span>
                  </div>
                </motion.div>

              </div>

              {/* Floating decorative prompt badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-cumid-sand shadow-soft-lg flex items-center gap-2 whitespace-nowrap text-xs font-medium text-cumid-slate"
              >
                <Compass className="w-3.5 h-3.5 text-cumid-plum animate-spin-slow" />
                <span>Click "Find My Diary" to match your cover</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
