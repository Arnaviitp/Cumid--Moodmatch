import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X, ExternalLink, ArrowRight } from 'lucide-react';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onStartQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  onStartQuiz,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cumid-ivory/90 backdrop-blur-md border-b border-cumid-sand/80 shadow-soft-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & MoodMatch Mark */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-2xl tracking-tight text-cumid-charcoal group-hover:text-cumid-plum transition-colors">
                  CUMID
                </span>
                <span className="h-4 w-[1px] bg-cumid-stone/80" />
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-cumid-lavender/50 text-cumid-plum-dark border border-cumid-lavender">
                  <Sparkles className="w-3 h-3 text-cumid-plum" />
                  MoodMatch
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cumid-slate">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-cumid-plum transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum rounded-md px-1 py-0.5"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('mood-section')}
              className="hover:text-cumid-plum transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum rounded-md px-1 py-0.5"
            >
              Discover Diaries
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-cumid-plum transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum rounded-md px-1 py-0.5"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('catalogue')}
              className="hover:text-cumid-plum transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum rounded-md px-1 py-0.5"
            >
              All 13 Diaries
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Wishlist / Favourites Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-full bg-cumid-cream border border-cumid-sand hover:border-cumid-plum/40 hover:bg-white text-cumid-charcoal transition-all shadow-soft-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
              aria-label={`View favourites (${favoritesCount} saved)`}
            >
              <Heart
                className={`w-4 h-4 transition-transform active:scale-90 ${
                  favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-cumid-slate'
                }`}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cumid-plum text-white text-[11px] font-bold flex items-center justify-center shadow-sm animate-in zoom-in">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Quick Find My Diary CTA */}
            <button
              onClick={onStartQuiz}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-cumid-charcoal text-white hover:bg-cumid-plum transition-colors shadow-soft-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
            >
              <span>Take Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* CUMID Store External link */}
            <a
              href="https://cumid.store"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-xs font-medium text-cumid-muted hover:text-cumid-plum transition-colors ml-1"
            >
              <span>cumid.store</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-cumid-slate hover:bg-cumid-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cumid-ivory/95 backdrop-blur-lg border-b border-cumid-sand px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block w-full text-left py-2 px-3 rounded-lg text-base font-medium text-cumid-slate hover:bg-cumid-cream hover:text-cumid-plum"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('mood-section')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base font-medium text-cumid-slate hover:bg-cumid-cream hover:text-cumid-plum"
          >
            Discover Diaries
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base font-medium text-cumid-slate hover:bg-cumid-cream hover:text-cumid-plum"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('catalogue')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base font-medium text-cumid-slate hover:bg-cumid-cream hover:text-cumid-plum"
          >
            Explore All 13 Diaries
          </button>
          <div className="pt-3 border-t border-cumid-sand flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartQuiz();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-cumid-charcoal text-white hover:bg-cumid-plum transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cumid-lavender" />
              <span>Find My Diary (Take Quiz)</span>
            </button>
            <a
              href="https://cumid.store"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-medium text-cumid-muted hover:bg-cumid-cream"
            >
              <span>Visit Official CUMID Store (cumid.store)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
