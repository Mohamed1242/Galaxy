import React, { useState, useEffect, useRef } from 'react';
import { FLIPPING_BOOK_PHOTOS } from '../data/romanticContent';
import { BookOpen, Heart } from 'lucide-react';

export const FlippingBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<HTMLDivElement | null>(null);

  // Sync the CSS custom property --c with state
  useEffect(() => {
    if (bookRef.current) {
      bookRef.current.style.setProperty('--c', String(currentPage));
    }
  }, [currentPage]);

  const handlePageClick = (pageIdx: number, isBack: boolean) => {
    const nextVal = isBack ? pageIdx : pageIdx + 1;
    setCurrentPage(nextVal);
  };

  return (
    <section
      id="book"
      className="story-section min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center items-center py-10 sm:py-16 px-4 relative max-w-3xl mx-auto overflow-visible"
    >
      {/* Header */}
      <div className="text-center mb-5 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-rose-500 font-semibold mb-1.5">
          <BookOpen size={13} />
          <span>3D Photo Album</span>
        </div>
        <h2 className="font-romantic text-2xl sm:text-4xl font-normal text-neutral-900 leading-tight">
          The Chapters of Us
        </h2>
        <p className="text-neutral-600 text-xs sm:text-sm mt-1 font-light">
          Tap any page to turn through our photo album.
        </p>
      </div>

      {/* 3D FlipBook Scene */}
      <div className="flipbook-scene">
        <div ref={bookRef} className="flipbook" style={{ '--c': 0 } as React.CSSProperties}>
          {/* Page 0: Front Cover & Image 1 */}
          <div
            className="flip-page"
            style={{ '--i': 0 } as React.CSSProperties}
          >
            {/* Front Cover */}
            <div
              className="flip-front flip-cover-front p-4 flex flex-col justify-between items-center text-center shadow-inner"
              onClick={() => handlePageClick(0, false)}
            >
              <div className="w-full flex justify-center pt-2">
                <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
                  <Heart size={15} className="fill-white text-white" />
                </div>
              </div>
              <div className="my-auto px-1">
                <span className="text-[9px] tracking-widest uppercase text-rose-200 block mb-1">
                  Photo Album
                </span>
                <h3 className="font-romantic text-lg sm:text-2xl font-bold leading-tight">
                  Our Story
                </h3>
              </div>
              <div className="text-[10px] text-rose-200/90 font-sans tracking-wide pb-1 flex items-center gap-1">
                <span>Tap to Open</span>
                <span>→</span>
              </div>
            </div>

            {/* Back of Cover: Pure Image 1 */}
            <div
              className="flip-back overflow-hidden"
              onClick={() => handlePageClick(0, true)}
            >
              <img
                src={FLIPPING_BOOK_PHOTOS[0]}
                alt="Photo Album Moment"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Page 1: Image 2 & Image 3 */}
          <div
            className="flip-page"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            <div
              className="flip-front overflow-hidden"
              onClick={() => handlePageClick(1, false)}
            >
              <img
                src={FLIPPING_BOOK_PHOTOS[1]}
                alt="Photo Album Moment"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
            <div
              className="flip-back overflow-hidden"
              onClick={() => handlePageClick(1, true)}
            >
              <img
                src={FLIPPING_BOOK_PHOTOS[2]}
                alt="Photo Album Moment"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Page 2: Image 4 & Image 5 */}
          <div
            className="flip-page"
            style={{ '--i': 2 } as React.CSSProperties}
          >
            <div
              className="flip-front overflow-hidden"
              onClick={() => handlePageClick(2, false)}
            >
              <img
                src={FLIPPING_BOOK_PHOTOS[3]}
                alt="Photo Album Moment"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
            <div
              className="flip-back overflow-hidden"
              onClick={() => handlePageClick(2, true)}
            >
              <img
                src={FLIPPING_BOOK_PHOTOS[4]}
                alt="Photo Album Moment"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Page 3: Image 6 & Image 7 */}
          <div
            className="flip-page"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            <div
              className="flip-front overflow-hidden"
              onClick={() => handlePageClick(3, false)}
            >
              <img
                src={FLIPPING_BOOK_PHOTOS[5]}
                alt="Photo Album Moment"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
            <div
              className="flip-back overflow-hidden"
              onClick={() => handlePageClick(3, true)}
            >
              <img
                src={FLIPPING_BOOK_PHOTOS[6]}
                alt="Photo Album Moment"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Page 4: Image 8 & Back Cover */}
          <div
            className="flip-page"
            style={{ '--i': 4 } as React.CSSProperties}
          >
            <div
              className="flip-front overflow-hidden"
              onClick={() => handlePageClick(4, false)}
            >
              <img
                src={FLIPPING_BOOK_PHOTOS[7]}
                alt="Photo Album Moment"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
            <div
              className="flip-back flip-cover-back p-4 flex flex-col justify-center items-center text-center shadow-inner"
              onClick={() => handlePageClick(4, true)}
            >
              <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center mb-1.5">
                <Heart size={14} className="fill-white text-white" />
              </div>
              <p className="font-romantic text-base text-white font-semibold">
                Forever
              </p>
              <p className="text-[10px] text-rose-200 mt-0.5">
                Always & Forever ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
