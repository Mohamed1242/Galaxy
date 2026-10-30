import React from 'react';
import { INFINITE_GRID_ITEMS } from '../data/romanticContent';
import type { RomanticImageItem } from '../data/romanticContent';
import { Sparkles } from 'lucide-react';

export const InfiniteGrid: React.FC = () => {
  // Split 8 images into Row 1 (first 4 items) and Row 2 (next 4 items)
  const row1 = INFINITE_GRID_ITEMS.slice(0, 4);
  const row2 = INFINITE_GRID_ITEMS.slice(4, 8);

  // Triple arrays for continuous seamless infinite loop
  const infiniteRow1 = [...row1, ...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2, ...row2];

  const renderCleanCard = (item: RomanticImageItem, index: number) => (
    <div
      key={`${item.id}-${index}`}
      className="romantic-grid-card group relative flex-shrink-0 w-60 sm:w-76 md:w-88 aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-rose-100/80 transition-all duration-500 hover:scale-[1.02] cursor-pointer mx-2 sm:mx-3"
    >
      {/* Pure, clean image with NO overlay icon, text, or counter */}
      <img
        src={item.image}
        alt="Romantic Moment"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
        loading="lazy"
        draggable={false}
      />

      {/* Gentle rose ambient hover ring */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-rose-400/0 group-hover:border-rose-400/60 transition-colors pointer-events-none" />
    </div>
  );

  return (
    <section
      id="grid"
      className="story-section min-h-[85vh] sm:min-h-screen flex flex-col justify-center items-center py-12 sm:py-20 px-0 overflow-hidden relative"
    >
      {/* Section Header */}
      <div className="text-center px-4 mb-6 sm:mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-rose-500 font-semibold mb-2">
          <Sparkles size={13} />
          <span>Infinite Moments</span>
        </div>
        <h2 className="font-romantic text-3xl sm:text-5xl font-normal text-neutral-900 leading-tight">
          Snapshots of Our Universe
        </h2>
      </div>

      {/* Infinite Row 1: Drifting Left */}
      <div className="w-full overflow-hidden py-2 relative marquee-container">
        {/* Soft edge blur vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#ffe4e6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#ffe4e6] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-left hover:[animation-play-state:paused] w-max">
          {infiniteRow1.map((item, idx) => renderCleanCard(item, idx))}
        </div>
      </div>

      {/* Infinite Row 2: Drifting Right */}
      <div className="w-full overflow-hidden py-2 sm:py-3 relative marquee-container mt-2">
        {/* Soft edge blur vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#ffe4e6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#ffe4e6] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-right hover:[animation-play-state:paused] w-max">
          {infiniteRow2.map((item, idx) => renderCleanCard(item, idx))}
        </div>
      </div>
    </section>
  );
};
