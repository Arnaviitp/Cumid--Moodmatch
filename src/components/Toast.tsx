import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Heart, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0"
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-cumid-sand shadow-soft-lg text-cumid-charcoal"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'heart' ? (
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-500" />
                </div>
              ) : toast.type === 'success' ? (
                <div className="w-8 h-8 rounded-full bg-cumid-sage-light flex items-center justify-center text-cumid-sage-dark">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-cumid-lavender/30 flex items-center justify-center text-cumid-plum">
                  <Info className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-cumid-charcoal leading-tight">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-cumid-muted mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 text-cumid-subtle hover:text-cumid-charcoal p-1 rounded-lg hover:bg-cumid-cream transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
