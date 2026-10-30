import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROMANTIC_TWO_LINES } from '../data/romanticContent';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const RomanticQuote: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLParagraphElement | null>(null);
  const line2Ref = useRef<HTMLParagraphElement | null>(null);
  const authorRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }
      )
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          authorRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="quote"
      ref={containerRef}
      className="story-section min-h-[75vh] sm:min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 py-20 text-center relative max-w-4xl mx-auto"
    >
      {/* Decorative center divider */}
      <div
        ref={dividerRef}
        className="flex items-center justify-center gap-3 w-48 mb-8 origin-center"
      >
        <span className="h-px bg-gradient-to-r from-transparent via-rose-300 to-rose-400 flex-1" />
        <Heart size={16} className="text-rose-500 fill-rose-500 animate-pulse" />
        <span className="h-px bg-gradient-to-l from-transparent via-rose-300 to-rose-400 flex-1" />
      </div>

      {/* Line 1 */}
      <p
        ref={line1Ref}
        className="font-romantic text-2xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-snug sm:leading-tight mb-4 tracking-normal"
      >
        &ldquo;{ROMANTIC_TWO_LINES.line1}&rdquo;
      </p>

      {/* Line 2 */}
      <p
        ref={line2Ref}
        className="font-romantic text-2xl sm:text-4xl md:text-5xl font-normal text-rose-700 leading-snug sm:leading-tight italic"
      >
        {ROMANTIC_TWO_LINES.line2}
      </p>

      {/* Signature */}
      <div
        ref={authorRef}
        className="mt-8 flex items-center gap-2 text-neutral-700 text-sm font-medium tracking-widest uppercase"
      >
        <span className="w-6 h-px bg-rose-400" />
        <span>{ROMANTIC_TWO_LINES.author}</span>
        <span className="w-6 h-px bg-rose-400" />
      </div>
    </section>
  );
};

