import React, { useState, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MoodSelector } from './components/MoodSelector';
import { QuizContainer } from './components/Quiz/QuizContainer';
import { MatchReveal } from './components/MatchReveal';
import { ProductGrid } from './components/ProductGrid';
import { HowItWorks } from './components/HowItWorks';
import { QuickViewModal } from './components/QuickViewModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';

import { CUMID_PRODUCTS } from './data/products';
import { QuizAnswers, MoodId, MatchResult, ToastMessage } from './types';
import { calculateMatches } from './utils/matchingAlgorithm';
import { useFavorites } from './hooks/useFavorites';

export const App: React.FC = () => {
  const {
    favorites,
    favoritesCount,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  } = useFavorites();

  const [selectedMood, setSelectedMood] = useState<MoodId | undefined>();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  // Modals & Drawers
  const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState<boolean>(false);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const moodSectionRef = useRef<HTMLDivElement>(null);
  const quizSectionRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const catalogueSectionRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback(
    (title: string, description?: string, type: 'success' | 'info' | 'heart' = 'info') => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleToggleFavoriteWithToast = useCallback(
    (productId: string) => {
      const product = CUMID_PRODUCTS.find((p) => p.id === productId);
      const isCurrentlyFav = isFavorite(productId);
      toggleFavorite(productId);

      if (!isCurrentlyFav) {
        showToast(
          'Saved to Favourites',
          product ? `"${product.title}" saved to your wishlist.` : undefined,
          'heart'
        );
      } else {
        showToast(
          'Removed from Favourites',
          product ? `"${product.title}" removed from your wishlist.` : undefined,
          'info'
        );
      }
    },
    [isFavorite, toggleFavorite, showToast]
  );

  // Start quiz from Hero or Navbar
  const handleStartQuiz = () => {
    const el = document.getElementById('mood-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMood = (mood: MoodId) => {
    setSelectedMood(mood);
    setAnswers((prev) => ({ ...prev, mood }));
  };

  const handleProceedToQuiz = () => {
    if (!selectedMood) return;
    setIsQuizActive(true);
    setTimeout(() => {
      const el = document.getElementById('quiz-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleUpdateAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCompleteQuiz = () => {
    const fullAnswers: QuizAnswers = {
      ...answers,
      mood: selectedMood,
    };
    const result = calculateMatches(fullAnswers);
    setMatchResult(result);
    setIsQuizActive(false);

    showToast('Match Computed!', 'We found your perfect CUMID pocket diary match.', 'success');

    setTimeout(() => {
      const el = document.getElementById('match-reveal');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleRestartQuiz = () => {
    setMatchResult(null);
    setIsQuizActive(false);
    setSelectedMood(undefined);
    setAnswers({});

    showToast('MoodMatch Reset', 'Ready to discover a new diary match.', 'info');

    setTimeout(() => {
      const el = document.getElementById('mood-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBackToMood = () => {
    setIsQuizActive(false);
    const el = document.getElementById('mood-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreAll = () => {
    const el = document.getElementById('catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedQuickViewProduct = CUMID_PRODUCTS.find((p) => p.id === quickViewProductId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-cumid-ivory text-cumid-charcoal">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation Bar */}
      <Navbar
        favoritesCount={favoritesCount}
        onOpenFavorites={() => setFavoritesDrawerOpen(true)}
        onStartQuiz={handleStartQuiz}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartQuiz={handleStartQuiz}
          onExploreAll={handleExploreAll}
          onSelectProduct={(id) => setQuickViewProductId(id)}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavoriteWithToast}
        />

        {/* Mood Selection Section (Always visible or transitions to quiz) */}
        <div ref={moodSectionRef}>
          <MoodSelector
            selectedMood={selectedMood}
            onSelectMood={handleSelectMood}
            onProceed={handleProceedToQuiz}
            onReset={
              selectedMood
                ? () => {
                    setSelectedMood(undefined);
                    setAnswers({});
                  }
                : undefined
            }
          />
        </div>

        {/* Interactive Personality Quiz (Rendered when user proceeds from mood selection) */}
        {isQuizActive && selectedMood && (
          <div ref={quizSectionRef}>
            <QuizContainer
              selectedMood={selectedMood}
              answers={answers}
              onUpdateAnswer={handleUpdateAnswer}
              onComplete={handleCompleteQuiz}
              onBackToMood={handleBackToMood}
            />
          </div>
        )}

        {/* Animated Result Reveal (Rendered upon quiz completion) */}
        {matchResult && (
          <div ref={resultSectionRef}>
            <MatchReveal
              matchResult={matchResult}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavoriteWithToast}
              onRestart={handleRestartQuiz}
              onExploreMore={handleExploreAll}
              onQuickView={(id) => setQuickViewProductId(id)}
              onShowToast={showToast}
            />
          </div>
        )}

        {/* How It Works Section */}
        <HowItWorks />

        {/* Explore All 13 CUMID Diaries Product Grid */}
        <div ref={catalogueSectionRef}>
          <ProductGrid
            products={CUMID_PRODUCTS}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavoriteWithToast}
            onQuickView={(id) => setQuickViewProductId(id)}
          />
        </div>
      </main>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedQuickViewProduct}
        isOpen={!!quickViewProductId}
        onClose={() => setQuickViewProductId(null)}
        isFavorite={selectedQuickViewProduct ? isFavorite(selectedQuickViewProduct.id) : false}
        onToggleFavorite={handleToggleFavoriteWithToast}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={favoritesDrawerOpen}
        onClose={() => setFavoritesDrawerOpen(false)}
        favorites={favorites}
        products={CUMID_PRODUCTS}
        onRemoveFavorite={handleToggleFavoriteWithToast}
        onClearAll={clearFavorites}
        onQuickView={(id) => setQuickViewProductId(id)}
        onStartQuiz={() => {
          setFavoritesDrawerOpen(false);
          handleStartQuiz();
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
