import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface QuizProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  onJumpToStep?: (stepIndex: number) => void;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  onJumpToStep,
}) => {
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      {/* Progress Info Header */}
      <div className="flex items-center justify-between text-xs font-medium text-cumid-muted mb-2 px-1">
        <span className="text-cumid-charcoal font-semibold">
          Question {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-cumid-plum font-semibold">{progressPercent}% Completed</span>
      </div>

      {/* Progress Bar Track */}
      <div className="h-2 w-full bg-cumid-sand/70 rounded-full overflow-hidden p-0.5 border border-cumid-sand/40">
        <motion.div
          className="h-full bg-gradient-to-r from-cumid-plum to-cumid-lavender-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>

      {/* Step Dots & Labels */}
      <div className="hidden sm:grid grid-cols-4 gap-2 mt-4 text-center">
        {stepLabels.map((label, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isNavigable = isDone && onJumpToStep;

          return (
            <button
              key={label}
              type="button"
              disabled={!isNavigable}
              onClick={() => isNavigable && onJumpToStep(idx)}
              className={`flex flex-col items-center gap-1 group text-left ${
                isNavigable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  isDone
                    ? 'bg-cumid-plum text-white shadow-sm'
                    : isCurrent
                    ? 'border-2 border-cumid-plum text-cumid-plum bg-white shadow-sm'
                    : 'bg-cumid-sand/60 text-cumid-subtle'
                }`}
              >
                {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
              </div>
              <span
                className={`text-[11px] truncate max-w-[120px] transition-colors ${
                  isCurrent
                    ? 'font-semibold text-cumid-charcoal'
                    : isDone
                    ? 'text-cumid-muted group-hover:text-cumid-plum'
                    : 'text-cumid-subtle'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
