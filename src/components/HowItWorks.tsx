import React from 'react';
import { Sparkles, Compass, CheckCircle2, ShoppingBag } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Select Your Current Vibe',
      description: 'Choose from 5 distinct moods—from Calm & Minimal to Ambitious & Productive—establishing your emotional baseline.',
      icon: Sparkles,
      color: 'bg-cumid-lavender/40 text-cumid-plum',
    },
    {
      number: '02',
      title: 'Answer 4 Quick Prompts',
      description: 'Pinpoint your exact journaling usage, visual aesthetics, personality traits, and ideal daily diary experience.',
      icon: Compass,
      color: 'bg-cumid-sage-light text-cumid-sage-dark',
    },
    {
      number: '03',
      title: 'Deterministic Match Engine',
      description: 'Our weighted algorithm pairs your responses against verified CUMID catalogue items, delivering an authentic compatibility index.',
      icon: CheckCircle2,
      color: 'bg-cumid-peach/70 text-cumid-terracotta',
    },
    {
      number: '04',
      title: 'Preorder & Begin Writing',
      description: 'Seamlessly order your chosen square top-spiral diary directly from CUMID Store for ₹149 plus ₹50 shipping across India.',
      icon: ShoppingBag,
      color: 'bg-cumid-sky text-[#3a638b]',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-cumid-sand/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cumid-cream border border-cumid-sand text-xs font-semibold text-cumid-plum shadow-soft-sm">
            <span>THE MOODMATCH EXPERIENCE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-cumid-charcoal tracking-tight font-medium">
            How MoodMatch Works
          </h2>

          <p className="text-sm sm:text-base text-cumid-muted leading-relaxed">
            Finding a notebook shouldn’t feel like scrolling an impersonal spreadsheet. We crafted an intentional discovery flow rooted in your personality.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-cumid-ivory/60 border border-cumid-sand hover:border-cumid-stone transition-all hover:shadow-soft text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-cumid-stone">
                      {step.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-cumid-charcoal mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-cumid-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-cumid-sand/60">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cumid-subtle">
                    Step {step.number} of 04
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
