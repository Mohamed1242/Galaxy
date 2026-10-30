import { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { BackgroundMusic } from './components/BackgroundMusic';
import { NavigationDots } from './components/NavigationDots';
import { WelcomeHero } from './components/WelcomeHero';
import { InfiniteGrid } from './components/InfiniteGrid';
import { RomanticQuote } from './components/RomanticQuote';
import { SwipingCards } from './components/SwipingCards';
import { VoiceRecordPlayer } from './components/VoiceRecordPlayer';
import { FlippingBook } from './components/FlippingBook';
import { Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  // Focus and center effect on scroll using GSAP ScrollTrigger
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.story-section');

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          gsap.to(section, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
        },
        onLeave: () => {
          gsap.to(section, { opacity: 0.85, scale: 0.98, duration: 0.5, ease: 'power2.out' });
        },
        onEnterBack: () => {
          gsap.to(section, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          gsap.to(section, { opacity: 0.85, scale: 0.98, duration: 0.5, ease: 'power2.out' });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen text-neutral-900 selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden">
      {/* Cotton candy sides with white center background + falling rose petals */}
      <BackgroundCanvas />

      {/* Floating Ambient Music Player */}
      <BackgroundMusic isVoicePlaying={isVoicePlaying} />

      {/* Floating Section Navigation Dots */}
      <NavigationDots />

      {/* Main Story Content: Scroll Centered Sections */}
      <main className="relative z-20 flex flex-col items-center w-full max-w-7xl mx-auto">
        {/* Section 1: Welcome Section */}
        <WelcomeHero />

        {/* Section 2: Infinite Grid (2 Rows with 8 Images) */}
        <InfiniteGrid />

        {/* Section 3: 2-Line Romantic Text Section */}
        <RomanticQuote />

        {/* Section 4: Swiping Cards with 8 Images */}
        <SwipingCards />

        {/* Section 5: Voice Record Player Sample */}
        <VoiceRecordPlayer onVoicePlayingChange={setIsVoicePlaying} />

        {/* Section 6: Flipping Book with 7 Images */}
        <FlippingBook />

        {/* Romantic Footer Signoff */}
        <footer className="w-full py-16 px-4 text-center border-t border-rose-200/60 mt-12 relative z-20">
          <div className="inline-flex items-center gap-2 text-rose-500 mb-3">
            <Heart size={16} className="fill-rose-500 animate-pulse" />
            <span className="font-romantic text-lg sm:text-xl font-semibold tracking-wide text-neutral-800">
              Forever Yours
            </span>
            <Heart size={16} className="fill-rose-500 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans tracking-wide">
            Designed with all my love for the prettiest girl in the world.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
