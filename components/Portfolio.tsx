'use client';
import { useCallback, useEffect, useState } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import TechnicalCapabilities from './TechnicalCapabilities';
import JourneyTimeline from './JourneyTimeline';
import SelectedWork from './SelectedWork';
import ContactFooter from './ContactFooter';
import KineticIntro from './kineticIntro';

const LOADER_DURATION_MS = 1300;

type ScreenState = 'loading' | 'intro' | 'ready';

export default function Portfolio() {
  const [screen, setScreen] = useState<ScreenState>('loading');
  const handleIntroComplete = useCallback(() => setScreen('ready'), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setScreen('intro'), LOADER_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (screen !== 'ready') return;
    const items = document.querySelectorAll<HTMLElement>('.hero-section, .capabilities-section, .journey-section');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || window.innerWidth < 900) return;
    const onScroll = () => {
      const height = window.innerHeight;
      items.forEach((item, index) => {
        if (index === 0) return;
        const rect = item.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (height - rect.top) / (height * 0.8)));
        item.style.setProperty('--stack-scale', String(1 - progress * 0.025));
        item.style.setProperty('--stack-dim', String(progress * 0.06));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [screen]);

  if (screen === 'loading') {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#050504]">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan/20" />
            <div className="absolute inset-2 rounded-full border border-cyan/40 animate-pulse" />
            <div className="h-3 w-3 rounded-full bg-cyan shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
            <div className="absolute h-20 w-20 rounded-full border-2 border-transparent border-t-cyan border-r-cyan/80 animate-spin" />
          </div>
          <div className="font-['Space_Mono',monospace] text-[10px] uppercase tracking-[0.35em] text-white/70">
            LOADING
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'intro') {
    return <KineticIntro showReplayButton={false} onComplete={handleIntroComplete} />;
  }

  return (
    <>
      <a href="#main-content" className="fixed left-3 top-3 z-[2000] -translate-y-[150%] bg-ink px-4 py-3 text-white focus:translate-y-0">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <div id="about">
          <TechnicalCapabilities />
          <JourneyTimeline />
        </div>
        <SelectedWork />
      </main>
      <ContactFooter />
    </>
  );
}
