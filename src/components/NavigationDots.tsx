import React, { useEffect, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'grid', label: 'Infinite Memories' },
  { id: 'quote', label: 'Our Words' },
  { id: 'cards', label: 'Swiping Cards' },
  { id: 'voice', label: 'Voice Note' },
  { id: 'book', label: 'Photo Album' },
];

export const NavigationDots: React.FC = () => {
  const [activeId, setActiveId] = useState('welcome');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <nav
      aria-label="Story navigation"
      className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3 py-3 px-2 rounded-full backdrop-blur-md bg-white/40 border border-rose-200/50 shadow-sm"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group relative flex items-center justify-center p-1"
            aria-label={`Scroll to ${item.label}`}
          >
            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-rose-500 scale-125 shadow-sm shadow-rose-400'
                  : 'w-2 h-2 bg-rose-300 hover:bg-rose-400'
              }`}
            />

            {/* Tooltip on hover */}
            <span className="absolute right-7 px-2.5 py-1 rounded-md text-xs font-medium text-neutral-800 bg-white/90 shadow-md border border-rose-100 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

