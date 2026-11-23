import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Heart, 
  Share2, 
  ExternalLink, 
  RotateCcw, 
  ArrowDown, 
  Check, 
  ShieldCheck, 
  Truck, 
  BookOpen, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { MatchResult } from '../types';

interface MatchRevealProps {
  matchResult: MatchResult;
  isFavorite: (productId: string) => boolean;
  onToggleFavorite: (productId: string) => void;
  onRestart: () => void;
  onExploreMore: () => void;
  onQuickView: (productId: string) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'info' | 'heart') => void;
}

export const MatchReveal: React.FC<MatchRevealProps> = ({
  matchResult,
  isFavorite,
  onToggleFavorite,
  onRestart,
  onExploreMore,
  onQuickView,
  onShowToast,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);

  const { bestMatch, alternatives, userVibeSummary } = matchResult;
  const isFav = isFavorite(bestMatch.product.id);

  const loadingPhrases = [
    'Analyzing your creative vibe & rhythm...',
    'Calibrating against 13 verified CUMID covers...',
    'Synthesizing top-spiral personality match...',
    'Finalizing your perfect diary companion...',
  ];

  // Sequence the loading states
  useEffect(() => {
    setIsLoading(true);
    setLoadingStep(0);

    const step1 = setTimeout(() => setLoadingStep(1), 500);
    const step2 = setTimeout(() => setLoadingStep(2), 1000);
    const step3 = setTimeout(() => setLoadingStep(3), 1500);
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
      // Trigger festive celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6b5b84', '#d7cee5', '#c86d51', '#929c8a', '#f9e7a2'],
      });
    }, 2000);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(completeTimer);
    };
  }, [matchResult]);

  // Animate the match percentage counter when reveal finishes
  useEffect(() => {
    if (isLoading) {
      setAnimatedScore(0);
      return;
    }

    let start = 0;
    const end = bestMatch.matchPercentage;
    const duration = 1200;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isLoading, bestMatch.matchPercentage]);

  // Web Share or Clipboard Fallback
  const handleShare = async () => {
    const shareData = {
      title: `My CUMID MoodMatch: ${bestMatch.product.title} (${bestMatch.matchPercentage}% match)`,
      text: `I took the CUMID MoodMatch quiz and matched with ${bestMatch.product.title}! "${bestMatch.product.tagline}" Discover your diary vibe at:`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        onShowToast('Shared successfully!', 'Your diary match was shared.', 'success');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const textToCopy = `I matched with ${bestMatch.product.title} (${bestMatch.matchPercentage}% match) on CUMID MoodMatch! Find your diary at ${window.location.href}`;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        onShowToast(
          'Match copied to clipboard!',
          'Share your diary personality with friends.',
          'success'
        );
      },
      () => {
        onShowToast('Could not copy', 'Please copy the URL from your browser address bar.', 'info');
      }
    );
  };

  if (isLoading) {
    return (
      <section className="py-28 bg-cumid-ivory min-h-[600px] flex items-center justify-center relative overflow-hidden">
        <div className="text-center max-w-md mx-auto px-4 space-y-6">
          {/* Animated pulsing diary icon */}
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-cumid-plum/40"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-2xl bg-white shadow-soft-lg flex items-center justify-center border border-cumid-sand text-cumid-plum"
            >
              <Sparkles className="w-8 h-8 text-cumid-plum animate-pulse" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-cumid-charcoal font-medium">
              Finding your perfect diary...
            </h3>
            <p className="text-xs text-cumid-muted h-6 transition-all duration-300">
              {loadingPhrases[loadingStep]}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 pt-2">
            {[0, 1, 2, 3].map((idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  loadingStep >= idx ? 'bg-cumid-plum' : 'bg-cumid-sand'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="match-reveal" className="py-16 md:py-24 bg-cumid-ivory relative overflow-hidden">
      {/* Subtle celebratory ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-cumid-lavender/30 via-cumid-peach/25 to-cumid-cream rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Reveal Announcement Banner */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cumid-cream border border-cumid-sand text-xs font-semibold text-cumid-plum shadow-soft-sm">
            <Sparkles className="w-3.5 h-3.5 text-cumid-plum" />
            <span>MOODMATCH RECOMMENDATION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-cumid-charcoal tracking-tight font-medium">
            We found your match!
          </h2>

          <p className="text-sm sm:text-base text-cumid-muted leading-relaxed">
            Curated deterministically from your <span className="font-semibold text-cumid-charcoal">{userVibeSummary.moodTitle}</span> vibe,{' '}
            <span className="font-semibold text-cumid-charcoal">{userVibeSummary.aestheticLabel}</span> affinity, and daily ritual needs.
          </p>
        </motion.div>

        {/* Hero Match Presentation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-cumid-stone/60 p-6 sm:p-10 shadow-book max-w-4xl mx-auto relative"
        >
          {/* Top Spiral Graphic on Top Border */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex gap-3 px-6 py-1 bg-white/95 backdrop-blur-sm rounded-full border border-cumid-sand shadow-soft-sm">
            {[...Array(7)].map((_, i) => (
              <span key={i} className="w-2.5 h-2 rounded-full bg-cumid-stone" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left: Product Cover Showcase with Spiral and Badge */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden bg-cumid-cream shadow-soft-xl border border-cumid-sand/80 group">
                <img
                  src={bestMatch.product.localImage}
                  alt={bestMatch.product.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = bestMatch.product.image;
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Match Percentage Pill in Corner */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-soft-sm border border-cumid-sand flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-cumid-charcoal">
                    {animatedScore}% Match
                  </span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 bg-cumid-charcoal/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                  {bestMatch.product.category}
                </div>

                {/* Quick View Button on Hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={() => onQuickView(bestMatch.product.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-cumid-charcoal text-xs font-semibold shadow-soft-lg hover:scale-105 transition-transform"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>

              {/* Format subtitle */}
              <p className="text-[11px] text-cumid-subtle mt-3 font-medium flex items-center gap-1.5">
                <span>{bestMatch.product.specs.format}</span>
                <span>·</span>
                <span>{bestMatch.product.specs.binding}</span>
              </p>
            </div>

            {/* Right: Editorial Match Details */}
            <div className="md:col-span-7 space-y-5 text-left">
              
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-cumid-plum">
                    {bestMatch.product.sku}
                  </span>
                  
                  {/* Verified Price */}
                  <div className="text-right">
                    <span className="text-2xl font-bold text-cumid-charcoal">
                      ₹{bestMatch.product.price}
                    </span>
                    <span className="text-xs text-cumid-subtle ml-1.5">
                      + ₹{bestMatch.product.shipping} shipping
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-cumid-charcoal font-semibold tracking-tight mt-1">
                  {bestMatch.product.title}
                </h3>

                <p className="text-sm font-medium italic text-cumid-plum mt-1">
                  "{bestMatch.product.tagline}"
                </p>
              </div>

              {/* Match Percentage Progress Meter */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-semibold text-cumid-slate">
                  <span>Compatibility Index</span>
                  <span className="text-cumid-plum">{animatedScore}% Perfect Fit</span>
                </div>
                <div className="h-2 w-full bg-cumid-sand rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cumid-plum via-cumid-plum-light to-cumid-lavender-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${animatedScore}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Personalized Reason Paragraph */}
              <div className="p-4 rounded-2xl bg-cumid-cream/70 border border-cumid-sand/80 text-xs sm:text-sm text-cumid-slate leading-relaxed">
                <p>{bestMatch.personalizedReason}</p>
              </div>

              {/* Match Reasons Bullet Checklist */}
              <div className="space-y-1.5 text-xs text-cumid-muted">
                {bestMatch.matchReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-cumid-lavender/40 text-cumid-plum flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              {/* Action CTAs */}
              <div className="pt-3 border-t border-cumid-sand/80 flex flex-wrap items-center gap-3">
                {/* Primary CTA: Shop this diary on cumid.store */}
                <a
                  href={bestMatch.product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cumid-charcoal text-white font-medium text-xs sm:text-sm hover:bg-cumid-plum active:scale-95 transition-all shadow-soft-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
                >
                  <span>Shop This Diary (₹{bestMatch.product.price})</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Secondary CTA: Quick View */}
                <button
                  onClick={() => onQuickView(bestMatch.product.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full bg-white border border-cumid-sand text-cumid-slate font-medium text-xs sm:text-sm hover:bg-cumid-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
                >
                  <BookOpen className="w-4 h-4 text-cumid-muted" />
                  <span>View Details</span>
                </button>

                {/* Favourite Heart Button */}
                <button
                  onClick={() => onToggleFavorite(bestMatch.product.id)}
                  className={`p-3.5 rounded-full border transition-all active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum ${
                    isFav
                      ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-sm'
                      : 'bg-white border-cumid-sand text-cumid-slate hover:bg-cumid-cream'
                  }`}
                  aria-label={isFav ? 'Remove from favourites' : 'Save to favourites'}
                  title={isFav ? 'In favourites' : 'Save to favourites'}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="p-3.5 rounded-full bg-white border border-cumid-sand text-cumid-slate hover:bg-cumid-cream transition-colors active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
                  aria-label="Share this match"
                  title="Share your match"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Retake MoodMatch */}
                <button
                  onClick={onRestart}
                  className="inline-flex items-center gap-1.5 text-xs text-cumid-muted hover:text-cumid-charcoal transition-colors ml-auto py-2 px-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              {/* Genuine Preorder Notice */}
              <div className="flex items-center gap-4 text-[11px] text-cumid-subtle pt-1">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cumid-sage-dark" />
                  Verified CUMID catalogue preorder
                </span>
                <span className="inline-flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-cumid-plum" />
                  Delivery within 14 days
                </span>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Alternative Recommendations Section */}
        {alternatives.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-cumid-charcoal font-semibold">
                  You might also love
                </h3>
                <p className="text-xs text-cumid-muted mt-0.5">
                  Two alternative covers that closely resonate with your vibe
                </p>
              </div>

              <button
                onClick={onExploreMore}
                className="inline-flex items-center gap-1 text-xs font-semibold text-cumid-plum hover:underline"
              >
                <span>Browse All 13 Diaries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {alternatives.map((alt) => {
                const altIsFav = isFavorite(alt.product.id);

                return (
                  <div
                    key={alt.product.id}
                    className="p-5 rounded-2xl bg-white border border-cumid-sand/90 hover:border-cumid-stone shadow-soft-sm hover:shadow-soft transition-all flex gap-4 items-center"
                  >
                    <div 
                      className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-cumid-cream cursor-pointer"
                      onClick={() => onQuickView(alt.product.id)}
                    >
                      <img
                        src={alt.product.localImage}
                        alt={alt.product.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = alt.product.image;
                        }}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cumid-plum">
                          {alt.product.category}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {alt.matchPercentage}% match
                        </span>
                      </div>

                      <h4 
                        className="font-serif text-base font-semibold text-cumid-charcoal truncate mt-0.5 cursor-pointer hover:text-cumid-plum"
                        onClick={() => onQuickView(alt.product.id)}
                      >
                        {alt.product.title}
                      </h4>

                      <p className="text-xs text-cumid-muted italic truncate">
                        "{alt.product.tagline}"
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-cumid-charcoal">
                          ₹{alt.product.price}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleFavorite(alt.product.id)}
                            className="p-1.5 rounded-full text-cumid-slate hover:bg-cumid-cream"
                            aria-label="Save alternative to favourites"
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                altIsFav ? 'fill-rose-500 text-rose-500' : ''
                              }`}
                            />
                          </button>
                          <a
                            href={alt.product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-cumid-charcoal hover:text-cumid-plum flex items-center gap-1"
                          >
                            <span>Shop</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Explore More CTA Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={onExploreMore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cumid-cream border border-cumid-sand text-cumid-slate hover:bg-white text-xs font-semibold shadow-soft-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
          >
            <ArrowDown className="w-4 h-4 text-cumid-plum" />
            <span>Explore All 13 Diaries Below</span>
          </button>
        </div>

      </div>
    </section>
  );
};
