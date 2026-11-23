import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Calendar, 
  Feather, 
  Palette, 
  Layers, 
  Flower2, 
  Flame, 
  Heart, 
  Sparkles, 
  Compass, 
  HelpCircle, 
  Zap, 
  Paintbrush, 
  Moon, 
  Target, 
  Smile,
  CheckCircle2
} from 'lucide-react';
import { QuizAnswers, MoodId } from '../../types';
import { QUIZ_QUESTIONS, MOOD_OPTIONS } from '../../data/quizQuestions';
import { QuizProgressBar } from './QuizProgressBar';

interface QuizContainerProps {
  selectedMood: MoodId;
  answers: QuizAnswers;
  onUpdateAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  onComplete: () => void;
  onBackToMood: () => void;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({
  selectedMood,
  answers,
  onUpdateAnswer,
  onComplete,
  onBackToMood,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];
  const totalSteps = QUIZ_QUESTIONS.length;
  const moodData = MOOD_OPTIONS.find((m) => m.id === selectedMood);

  const stepLabels = [
    'Diary Usage',
    'Cover Aesthetic',
    'Your Personality',
    'Ideal Experience',
  ];

  const currentSelectedValue = answers[currentQuestion.id];

  const handleSelectOption = (optionId: string) => {
    onUpdateAnswer(currentQuestion.id, optionId as any);
  };

  const handleNext = () => {
    if (!currentSelectedValue) return;

    if (currentStepIndex < totalSteps - 1) {
      setDirection('forward');
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setDirection('backward');
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      onBackToMood();
    }
  };

  const handleJumpToStep = (index: number) => {
    if (index < currentStepIndex) {
      setDirection('backward');
      setCurrentStepIndex(index);
    }
  };

  // Helper to render relevant icon
  const renderOptionIcon = (iconName?: string, isSelected?: boolean) => {
    const iconClass = `w-5 h-5 transition-colors ${
      isSelected ? 'text-cumid-plum' : 'text-cumid-muted'
    }`;

    switch (iconName) {
      case 'Calendar':
        return <Calendar className={iconClass} />;
      case 'Feather':
        return <Feather className={iconClass} />;
      case 'Palette':
        return <Palette className={iconClass} />;
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'Flower2':
        return <Flower2 className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Heart':
        return <Heart className={iconClass} />;
      case 'Sparkle':
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'HelpCircle':
        return <HelpCircle className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'Brush':
        return <Paintbrush className={iconClass} />;
      case 'Moon':
        return <Moon className={iconClass} />;
      case 'Target':
        return <Target className={iconClass} />;
      case 'Smile':
        return <Smile className={iconClass} />;
      default:
        return <CheckCircle2 className={iconClass} />;
    }
  };

  return (
    <section id="quiz-section" className="py-16 md:py-24 bg-cumid-ivory relative min-h-[700px] flex flex-col justify-center">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cumid-lavender/15 via-cumid-cream to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Selected Mood Mini-Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={onBackToMood}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cumid-cream border border-cumid-sand text-xs font-medium text-cumid-slate hover:bg-white transition-all shadow-soft-sm group"
            title="Click to change your vibe"
          >
            <span className="text-cumid-subtle font-normal">Active Vibe:</span>
            <span className="font-semibold text-cumid-plum">{moodData?.title}</span>
            <span className="text-[10px] text-cumid-muted underline ml-1 group-hover:text-cumid-plum">
              Change
            </span>
          </button>
        </div>

        {/* Progress Bar */}
        <QuizProgressBar
          currentStep={currentStepIndex}
          totalSteps={totalSteps}
          stepLabels={stepLabels}
          onJumpToStep={handleJumpToStep}
        />

        {/* Question & Options Area with animated slide transitions */}
        <div className="relative overflow-hidden py-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentQuestion.id}
              initial={{ 
                opacity: 0, 
                x: direction === 'forward' ? 40 : -40 
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                x: direction === 'forward' ? -40 : 40 
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Question Heading */}
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-bold tracking-widest uppercase text-cumid-plum">
                  Question 0{currentQuestion.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-cumid-charcoal tracking-tight font-medium">
                  {currentQuestion.question}
                </h3>
                <p className="text-xs sm:text-sm text-cumid-muted">
                  {currentQuestion.description}
                </p>
              </div>

              {/* 4 Interactive Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {currentQuestion.options.map((option) => {
                  const isSelected = currentSelectedValue === option.id;

                  return (
                    <motion.div
                      key={String(option.id)}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleSelectOption(String(option.id))}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectOption(String(option.id));
                        }
                      }}
                      className={`relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer border transition-all text-left outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum ${
                        isSelected
                          ? 'bg-white shadow-soft-lg ring-2 ring-cumid-plum border-transparent'
                          : 'bg-white/80 hover:bg-white border-cumid-sand/90 hover:border-cumid-stone hover:shadow-soft'
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-cumid-lavender/50 text-cumid-plum shadow-inner'
                            : 'bg-cumid-cream text-cumid-muted'
                        }`}
                      >
                        {renderOptionIcon(option.icon, isSelected)}
                      </div>

                      {/* Text */}
                      <div className="flex-1 pr-6">
                        <h4
                          className={`text-sm font-semibold transition-colors ${
                            isSelected ? 'text-cumid-plum-dark' : 'text-cumid-charcoal'
                          }`}
                        >
                          {option.label}
                        </h4>
                        {option.sublabel && (
                          <p className="text-xs text-cumid-muted mt-1 leading-relaxed">
                            {option.sublabel}
                          </p>
                        )}
                      </div>

                      {/* Selected Radio Indicator */}
                      <div className="absolute top-5 right-5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-cumid-plum text-white shadow-sm'
                              : 'border-2 border-cumid-sand bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation CTAs */}
        <div className="mt-10 flex items-center justify-between max-w-2xl mx-auto pt-6 border-t border-cumid-sand/80">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-cumid-slate hover:bg-cumid-cream hover:text-cumid-charcoal transition-colors border border-transparent hover:border-cumid-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentStepIndex === 0 ? 'Back to Vibe' : 'Previous'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!currentSelectedValue}
            className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold transition-all shadow-soft-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cumid-plum ${
              currentSelectedValue
                ? 'bg-cumid-charcoal text-white hover:bg-cumid-plum active:scale-95 shadow-soft-lg cursor-pointer'
                : 'bg-cumid-sand text-cumid-subtle cursor-not-allowed opacity-60'
            }`}
          >
            <span>{currentStepIndex === totalSteps - 1 ? 'Reveal My Diary Match' : 'Continue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
