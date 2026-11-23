import { 
  QuizAnswers, 
  ProductMatch, 
  MatchResult, 
  MoodId
} from '../types';
import { CUMID_PRODUCTS } from '../data/products';
import { MOOD_OPTIONS, QUIZ_QUESTIONS } from '../data/quizQuestions';

const MOOD_TITLES: Record<MoodId, string> = {
  'calm-minimal': 'Calm & Minimal',
  'creative-artistic': 'Creative & Artistic',
  'ambitious-productive': 'Ambitious & Productive',
  'cute-playful': 'Cute & Playful',
  'deep-reflective': 'Deep & Reflective',
};

const AESTHETIC_LABELS: Record<string, string> = {
  'soft-floral': 'Soft & Floral',
  'bold-expressive': 'Bold & Expressive',
  'cute-colourful': 'Cute & Colourful',
  'clean-minimal': 'Clean & Minimal',
};

const USAGE_LABELS: Record<string, string> = {
  'daily-planning': 'Daily Planning',
  'journaling-thoughts': 'Journaling Thoughts',
  'creative-doodles': 'Creative Ideas & Doodles',
  'everything-in-one': 'All-in-One Journaling',
};

const PERSONALITY_LABELS: Record<string, string> = {
  'dreamer': 'Dreamer',
  'overthinker': 'Thoughtful Overthinker',
  'go-getter': 'Determined Go-Getter',
  'creative-soul': 'Expressive Creative Soul',
};

const EXPERIENCE_LABELS: Record<string, string> = {
  'peaceful-space': 'a peaceful sanctuary for reflection',
  'plan-big-goals': 'a dedicated launchpad for ambitious goals',
  'express-myself': 'an uninhibited canvas for self-expression',
  'cute-companion': 'a delightful pocket companion for daily life',
};

/**
 * Calculates deterministic match scores for all products in the catalogue
 * based on weighted compatibility vectors.
 */
export function calculateMatches(answers: QuizAnswers): MatchResult {
  const { mood, usage, aesthetic, personality, experience } = answers;

  const ranked: ProductMatch[] = CUMID_PRODUCTS.map((product) => {
    let score = 0;
    const matchReasons: string[] = [];
    const pm = product.personalityMatch;

    // 1. Mood Compatibility (Weight: 35 points)
    if (mood) {
      if (pm.primaryMoods[0] === mood) {
        score += 35;
        matchReasons.push(`Direct alignment with your ${MOOD_TITLES[mood]} vibe.`);
      } else if (pm.primaryMoods.includes(mood)) {
        score += 26;
        matchReasons.push(`Harmonious second-tier fit for your ${MOOD_TITLES[mood]} mood.`);
      } else {
        // Cross-mood affinities
        if (mood === 'calm-minimal' && (pm.primaryMoods.includes('deep-reflective') || product.category === 'Floral')) {
          score += 15;
        } else if (mood === 'ambitious-productive' && product.category === 'Cars & Jets') {
          score += 18;
        } else if (mood === 'cute-playful' && product.category === 'Cute') {
          score += 18;
        } else if (mood === 'creative-artistic' && product.category === 'Originals') {
          score += 18;
        } else {
          score += 6;
        }
      }
    } else {
      score += 20; // Default baseline if mood not passed
    }

    // 2. Aesthetic Compatibility (Weight: 25 points)
    if (aesthetic) {
      if (pm.compatibleAesthetics[0] === aesthetic) {
        score += 25;
        matchReasons.push(`Features the ${AESTHETIC_LABELS[aesthetic] || aesthetic} aesthetic you love.`);
      } else if (pm.compatibleAesthetics.includes(aesthetic)) {
        score += 18;
        matchReasons.push(`Subtle touches of the ${AESTHETIC_LABELS[aesthetic] || aesthetic} aesthetic.`);
      } else {
        score += 7;
      }
    } else {
      score += 15;
    }

    // 3. Personality Compatibility (Weight: 20 points)
    if (personality) {
      if (pm.compatiblePersonalities[0] === personality) {
        score += 20;
        matchReasons.push(`Designed specifically with a ${PERSONALITY_LABELS[personality] || personality} mindset in mind.`);
      } else if (pm.compatiblePersonalities.includes(personality)) {
        score += 14;
        matchReasons.push(`Resonates with your ${PERSONALITY_LABELS[personality] || personality} nature.`);
      } else {
        score += 5;
      }
    } else {
      score += 12;
    }

    // 4. Intended Usage Compatibility (Weight: 10 points)
    if (usage) {
      if (pm.compatibleUsages.includes(usage)) {
        score += 10;
        matchReasons.push(`Optimized for ${USAGE_LABELS[usage] || usage}.`);
      } else {
        score += 4;
      }
    } else {
      score += 6;
    }

    // 5. Ideal Experience Compatibility (Weight: 10 points)
    if (experience) {
      if (pm.compatibleExperiences.includes(experience)) {
        score += 10;
        matchReasons.push(`Delivers ${EXPERIENCE_LABELS[experience] || experience}.`);
      } else {
        score += 4;
      }
    } else {
      score += 6;
    }

    // Small deterministic tie-breaker based on SKU to ensure 100% deterministic ordering
    const tieBreaker = (product.sku.charCodeAt(product.sku.length - 1) % 5) * 0.1;
    const finalScore = score + tieBreaker;

    // Normalizing percentage: Scale top matches between 88% and 99%
    // Maximum possible raw score is 100 + ~0.5
    const matchPercentage = Math.min(99, Math.max(68, Math.round(finalScore)));

    // Generate personalized editorial explanation
    const moodName = mood ? MOOD_TITLES[mood] : 'Your unique';
    const personalityName = personality ? PERSONALITY_LABELS[personality] : 'reflective thinker';
    const experienceText = experience ? EXPERIENCE_LABELS[experience] : 'a tranquil creative space';
    const aestheticText = aesthetic ? AESTHETIC_LABELS[aesthetic] : 'artistic';

    const personalizedReason = `Because you move with a ${moodName.toLowerCase()} aura and appreciate ${aestheticText.toLowerCase()} craftsmanship, ${product.title} is your quintessential pocket match. Built for the ${personalityName.toLowerCase()} who treasures ${experienceText}, its cover carries "${product.tagline}" to inspire every entry you write.`;

    return {
      product,
      score: finalScore,
      matchPercentage,
      matchReasons,
      personalizedReason,
    };
  });

  // Sort descending by score
  ranked.sort((a, b) => b.score - a.score);

  const bestMatch = ranked[0];
  // Ensure the top match has a delightfully high match percentage (94-98%)
  if (bestMatch && bestMatch.matchPercentage < 94) {
    bestMatch.matchPercentage = 95 + (Math.round(bestMatch.score) % 4);
  }

  // Pick top 2 alternatives
  const alternatives = ranked.slice(1, 3);
  // Ensure alternatives have slightly staggered percentages
  alternatives.forEach((alt, idx) => {
    alt.matchPercentage = Math.min(bestMatch.matchPercentage - (idx + 1) * 3, Math.max(82, alt.matchPercentage));
  });

  const userVibeSummary = {
    moodTitle: mood ? MOOD_TITLES[mood] : 'Versatile Explorer',
    aestheticLabel: aesthetic ? AESTHETIC_LABELS[aesthetic] : 'Eclectic & Modern',
    usageLabel: usage ? USAGE_LABELS[usage] : 'Everyday Thoughts',
    personalityLabel: personality ? PERSONALITY_LABELS[personality] : 'Original Mind',
  };

  return {
    bestMatch,
    alternatives,
    allRanked: ranked,
    userVibeSummary,
  };
}

/**
 * Helper to get question details by ID
 */
export function getQuestionById(id: keyof QuizAnswers) {
  return QUIZ_QUESTIONS.find(q => q.id === id);
}

/**
 * Helper to get mood option by ID
 */
export function getMoodById(id: MoodId) {
  return MOOD_OPTIONS.find(m => m.id === id);
}
