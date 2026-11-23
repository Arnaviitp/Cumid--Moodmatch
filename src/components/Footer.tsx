import React from 'react';
import { ArrowUp, ExternalLink, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cumid-charcoal text-white pt-16 pb-12 border-t border-cumid-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                CUMID
              </span>
              <span className="h-4 w-[1px] bg-white/30" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cumid-lavender flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                MoodMatch
              </span>
            </div>

            <p className="font-serif italic text-base text-cumid-sand/90">
              "Small diaries. A little more you."
            </p>

            <p className="text-xs text-cumid-stone max-w-sm leading-relaxed">
              Square pocket diaries with top spiral binding and genuine personality. Built to give your late-night notes, daily deadlines, and big dreams an intentional home.
            </p>

            <div className="pt-2">
              <a
                href="https://cumid.store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-cumid-lavender hover:text-white transition-colors"
              >
                <span>Visit Official Store (cumid.store)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cumid-stone">
              Diary Collections
            </h4>
            <ul className="space-y-2 text-xs text-cumid-stone">
              <li>
                <a 
                  href="https://cumid.store/collections/floral" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Floral Collection (Lavender Bloom)
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://cumid.store/collections/cute" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Cute & Humorous (Low Battery, Boo. Whatever.)
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://cumid.store/collections/hinglish" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Hinglish (Kal Se Productive)
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://cumid.store/collections/cars-and-jets" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Cars & Jets (Plans in Overdrive, Afterburner)
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://cumid.store/collections/originals" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  CUMID Originals (Desi by Default, Hero in Progress)
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Experience Specs & Disclaimer */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cumid-stone">
              Preorder Notice & Terms
            </h4>
            <div className="text-xs text-cumid-stone space-y-2 leading-relaxed">
              <p>
                • Diaries are made-to-order at ₹149 each + ₹50 shipping per order (totals ₹199 for one diary).
              </p>
              <p>
                • Delivery within 14 days of payment confirmation. Preorders confirmed via official CUMID WhatsApp (+91 9201871597).
              </p>
              <p className="text-[11px] text-white/50 pt-2 border-t border-white/10">
                Created for the CUMID Web Development Internship Selection Assignment. Designed & engineered with React, TypeScript, Tailwind CSS & Framer Motion.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cumid-stone">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} CUMID MoodMatch. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
            <span>for stationery lovers.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-lavender"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
