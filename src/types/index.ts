export type MoodId = 
  | 'calm-minimal' 
  | 'creative-artistic' 
  | 'ambitious-productive' 
  | 'cute-playful' 
  | 'deep-reflective';

export interface MoodOption {
  id: MoodId;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  colorName: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  iconName: 'Moon' | 'Sparkles' | 'Zap' | 'Smile' | 'BookOpen';
  tags: string[];
}

export type UsageOption = 
  | 'daily-planning' 
  | 'journaling-thoughts' 
  | 'creative-doodles' 
  | 'everything-in-one';

export type AestheticOption = 
  | 'soft-floral' 
  | 'bold-expressive' 
  | 'cute-colourful' 
  | 'clean-minimal';

export type PersonalityOption = 
  | 'dreamer' 
  | 'overthinker' 
  | 'go-getter' 
  | 'creative-soul';

export type ExperienceOption = 
  | 'peaceful-space' 
  | 'plan-big-goals' 
  | 'express-myself' 
  | 'cute-companion';

export interface QuizAnswers {
  mood?: MoodId;
  usage?: UsageOption;
  aesthetic?: AestheticOption;
  personality?: PersonalityOption;
  experience?: ExperienceOption;
}

export interface QuizQuestionOption<T> {
  id: T;
  label: string;
  sublabel?: string;
  icon?: string;
}

export interface QuizQuestion<T> {
  id: keyof QuizAnswers;
  number: number;
  question: string;
  description: string;
  options: QuizQuestionOption<T>[];
}

export type DiaryCategory = 'Floral' | 'Hinglish' | 'Cute' | 'Cars & Jets' | 'Originals';

export interface DiaryProduct {
  id: string;
  sku: string;
  title: string;
  tagline: string;
  category: DiaryCategory;
  price: number;
  currency: string;
  shipping: number;
  description: string;
  about: string;
  url: string;
  image: string;
  localImage: string;
  badge?: string;
  specs: {
    format: string;
    binding: string;
    origin: string;
    delivery: string;
  };
  personalityMatch: {
    primaryMoods: MoodId[];
    compatibleUsages: UsageOption[];
    compatibleAesthetics: AestheticOption[];
    compatiblePersonalities: PersonalityOption[];
    compatibleExperiences: ExperienceOption[];
    keywords: string[];
    matchVibe: string;
  };
}

export interface ProductMatch {
  product: DiaryProduct;
  score: number;
  matchPercentage: number;
  matchReasons: string[];
  personalizedReason: string;
}

export interface MatchResult {
  bestMatch: ProductMatch;
  alternatives: ProductMatch[];
  allRanked: ProductMatch[];
  userVibeSummary: {
    moodTitle: string;
    aestheticLabel: string;
    usageLabel: string;
    personalityLabel: string;
  };
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'heart';
}
