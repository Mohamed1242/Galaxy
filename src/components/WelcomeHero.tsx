import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';

export const WelcomeHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const heartRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heartRef.current,
        { scale: 0.7, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 1.1 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 25, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 },
          '-=0.5'
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          cueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );

      // Gentle floating heartbeat loop
      gsap.to(heartRef.current, {
        scale: 1.07,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const nextElem = document.getElementById('grid');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="welcome"
      ref={containerRef}
      className="story-section min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 pt-20 pb-12 sm:py-16 text-center relative"
    >
      {/* Decorative aura badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50/90 border border-rose-200/80 shadow-sm text-rose-600 mb-5 text-xs sm:text-sm font-medium tracking-wide">
        <Sparkles size={13} className="text-rose-500 animate-spin-slow" />
        <span>A Romantic Journey Just For Us</span>
      </div>

      {/* Pulsating Glowing Heart Emblem */}
      <div
        ref={heartRef}
        className="relative my-3 sm:my-4 flex items-center justify-center"
      >
        <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-rose-300/30 blur-2xl animate-pulse pointer-events-none" />
        <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-lg shadow-rose-300/50">
          <Heart size={28} className="fill-white" />
        </div>
      </div>

      {/* Main Headline */}
      <h1
        ref={headlineRef}
        className="font-romantic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-neutral-900 tracking-tight max-w-4xl leading-[1.1] mb-5 drop-shadow-sm px-2"
      >
        To the prettiest girl in the world...
      </h1>

      {/* Romantic Subtitle */}
      <p
        ref={subtextRef}
        className="font-sans text-neutral-700 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8 font-normal px-4"
      >
        Every moment with you feels like sweet music. This little corner of the universe was built to remind you just how deeply adored you are.
      </p>

      {/* Scroll Down Prompt */}
      <button
        ref={cueRef}
        onClick={handleScrollDown}
        className="group flex flex-col items-center gap-2 text-neutral-600 hover:text-rose-600 transition-colors cursor-pointer"
        aria-label="Scroll down to memory gallery"
      >
        <span className="text-[11px] uppercase tracking-widest font-medium">
          Scroll to explore
        </span>
        <div className="w-8 h-8 rounded-full border border-rose-300/80 flex items-center justify-center group-hover:border-rose-500 group-hover:bg-rose-50 transition-all duration-300">
          <ChevronDown size={16} className="animate-bounce-subtle text-rose-500" />
        </div>
      </button>
    </section>
  );
};
