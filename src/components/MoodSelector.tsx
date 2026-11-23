import React from 'react';
import { motion } from 'framer-motion';
import { 
  Moon, 
  Sparkles, 
  Zap, 
  Smile, 
  BookOpen, 
  Check, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { MoodId } from '../types';
import { MOOD_OPTIONS } from '../data/quizQuestions';

interface MoodSelectorProps {
  selectedMood?: MoodId;
  onSelectMood: (mood: MoodId) => void;
  onProceed: () => void;
  onReset?: () => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelectMood,
  onProceed,
  onReset,
}) => {
  const getIcon = (name: string, isSelected: boolean) => {
    const className = `w-6 h-6 transition-colors duration-300 ${
      isSelected ? 'text-white' : 'text-cumid-slate'
    }`;
    switch (name) {
      case 'Moon':
        return <Moon className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Smile':
        return <Smile className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <section id="mood-section" className="py-20 bg-cumid-cream/50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cumid-sand to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cumid-sand to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-cumid-sand text-xs font-semibold text-cumid-plum shadow-soft-sm">
            <span className="w-2 h-2 rounded-full bg-cumid-plum" />
            <span>STEP 1 OF 5</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-cumid-charcoal tracking-tight font-medium">
            First, tell us what's your vibe.
          </h2>

          <p className="text-cumid-muted text-sm sm:text-base leading-relaxed">
            Choose the energy that guides your thoughts right now. This establishes the foundation of your personalized diary match.
          </p>
        </div>

        {/* 5 Mood Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MOOD_OPTIONS.map((mood) => {
            const isSelected = selectedMood === mood.id;

            return (
              <motion.div
                key={mood.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectMood(mood.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectMood(mood.id);
                  }
                }}
                className={`group relative flex flex-col justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 border text-left outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum ${
                  isSelected
                    ? 'bg-white shadow-soft-lg ring-2 ring-cumid-plum border-transparent'
                    : 'bg-white/70 hover:bg-white border-cumid-sand/90 hover:border-cumid-stone hover:shadow-soft'
                }`}
                aria-pressed={isSelected}
              >
                {/* Visual Header & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Icon container */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isSelected
                          ? 'bg-cumid-plum text-white shadow-md'
                          : 'bg-cumid-cream group-hover:bg-cumid-lavender/40 text-cumid-slate'
                      }`}
                    >
                      {getIcon(mood.iconName, isSelected)}
                    </div>

                    {/* Badge or Checkmark */}
                    {isSelected ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-cumid-plum text-white flex items-center justify-center shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </motion.div>
                    ) : (
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-cumid-sand/60 text-cumid-subtle">
                        {mood.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-lg font-semibold text-cumid-charcoal group-hover:text-cumid-plum transition-colors leading-snug">
                    {mood.title}
                  </h3>

                  <p className="text-xs font-medium text-cumid-muted mt-0.5">
                    {mood.subtitle}
                  </p>

                  {/* Personality Description */}
                  <p className="text-xs text-cumid-subtle leading-relaxed mt-3">
                    {mood.description}
                  </p>
                </div>

                {/* Tags Footer */}
                <div className="mt-5 pt-3 border-t border-cumid-sand/60 flex flex-wrap gap-1.5">
                  {mood.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                        isSelected
                          ? 'bg-cumid-lavender/50 text-cumid-plum-dark'
                          : 'bg-cumid-cream text-cumid-muted'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Controls & Navigation bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          {selectedMood ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={onProceed}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cumid-charcoal text-white font-medium text-sm hover:bg-cumid-plum active:scale-[0.98] transition-all shadow-soft-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
              >
                <span>Continue to Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onReset && (
                <button
                  onClick={onReset}
                  className="p-3 rounded-full border border-cumid-sand hover:bg-white text-cumid-muted hover:text-cumid-charcoal transition-colors"
                  title="Change vibe"
                  aria-label="Change vibe"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ) : (
            <p className="text-xs text-cumid-muted italic flex items-center gap-1.5">
              <span>Tap a card above to select your current mood & vibe.</span>
            </p>
          )}
        </div>

      </div>
    </section>
  );
};
