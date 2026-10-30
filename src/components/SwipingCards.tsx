import React, { useState, useRef } from 'react';
import { SWIPING_CARDS } from '../data/romanticContent';
import { Sparkles } from 'lucide-react';
import gsap from 'gsap';

export const SwipingCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const topCardRef = useRef<HTMLDivElement | null>(null);

  // Pointer drag tracking
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentDeltaX = useRef(0);

  const totalCards = SWIPING_CARDS.length; // 8 images

  // Fly top card off-screen to the right or left
  const swipeOut = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    const card = topCardRef.current;
    if (!card) {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
      return;
    }

    setIsAnimating(true);
    const targetX = direction === 'right' ? 650 : -650;
    const targetRotate = direction === 'right' ? 25 : -25;

    gsap.to(card, {
      x: targetX,
      rotation: targetRotate,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        // Cleanly reset inline styles so the new card at this ref is pristine
        if (card) {
          card.style.transform = '';
          card.style.opacity = '1';
        }
        setCurrentIndex((prev) => (prev + 1) % totalCards);
        setIsAnimating(false);
      },
    });
  };

  // Modern HTML5 Pointer Events (handles touch, mouse, and stylus seamlessly)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    currentDeltaX.current = 0;

    // Capture pointer so dragging never loses focus even if finger leaves the card
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback if not supported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || isAnimating) return;
    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;
    currentDeltaX.current = deltaX;

    const card = topCardRef.current;
    if (card) {
      card.style.transform = `translate3d(${deltaX}px, ${deltaY * 0.25}px, 0) rotate(${deltaX * 0.05}deg)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    const deltaX = currentDeltaX.current;
    const card = topCardRef.current;

    // Threshold to trigger a swipe out (60px)
    if (Math.abs(deltaX) > 60) {
      swipeOut(deltaX > 0 ? 'right' : 'left');
    } else {
      // Snap smoothly back to center
      if (card) {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            if (card) {
              card.style.transform = '';
            }
          },
        });
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(e);
  };

  return (
    <section
      id="cards"
      className="story-section min-h-[85vh] sm:min-h-screen flex flex-col justify-center items-center py-12 sm:py-20 px-4 overflow-hidden relative"
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-10 max-w-xl">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-rose-500 font-semibold mb-2">
          <Sparkles size={13} />
          <span>Interactive Memory Deck</span>
        </div>
        <h2 className="font-romantic text-3xl sm:text-5xl font-normal text-neutral-900 leading-tight">
          Swipe Through Our Memories
        </h2>
        <p className="text-neutral-600 text-xs sm:text-sm mt-1.5 font-light">
          Swipe or drag each photo to uncover the next moment.
        </p>
      </div>

      {/* Stack Container */}
      <div className="relative w-72 sm:w-84 md:w-96 aspect-[4/5] flex items-center justify-center select-none touch-none">
        {Array.from({ length: 4 }).map((_, offset) => {
          const cardIdx = (currentIndex + offset) % totalCards;
          const card = SWIPING_CARDS[cardIdx];
          const isTopCard = offset === 0;
          const scale = 1 - offset * 0.05;
          const translateY = offset * 12;
          const rotate = offset === 0 ? 0 : (offset % 2 === 0 ? 2.5 : -2.5) * offset;

          return (
            <div
              key={`card-${card.id}-${cardIdx}`}
              ref={isTopCard ? topCardRef : undefined}
              onPointerDown={isTopCard ? handlePointerDown : undefined}
              onPointerMove={isTopCard ? handlePointerMove : undefined}
              onPointerUp={isTopCard ? handlePointerUp : undefined}
              onPointerCancel={isTopCard ? handlePointerCancel : undefined}
              style={{
                zIndex: 20 - offset,
                transform: isTopCard ? undefined : `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                transition: isTopCard ? undefined : 'transform 0.35s ease, opacity 0.35s ease',
              }}
              className={`absolute inset-0 rounded-3xl bg-white p-3 sm:p-4 shadow-xl border border-rose-100/90 flex flex-col ${
                isTopCard ? 'cursor-grab active:cursor-grabbing shadow-2xl shadow-rose-300/40' : 'opacity-90 pointer-events-none'
              }`}
            >
              {/* Pure Image: NO icons, NO text, NO counter */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-rose-50 flex items-center justify-center pointer-events-none">
                <img
                  src={card.image}
                  alt="Memory Card"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
