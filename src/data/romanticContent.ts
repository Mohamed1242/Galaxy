/**
 * Romantic Couples Content Data
 * Loads the user's authentic personal WhatsApp images and audio.
 */

// Load all WhatsApp photos from src/assets
const whatsappModules = import.meta.glob<{ default: string }>('../assets/WhatsApp*.jpeg', {
  eager: true,
});

const ALL_WHATSAPP_IMAGES: string[] = Object.values(whatsappModules).map((mod) => mod.default);

// If for any reason no images found, fallback safely
export const REAL_PHOTOS: string[] = ALL_WHATSAPP_IMAGES.length > 0 ? ALL_WHATSAPP_IMAGES : [];

export interface RomanticImageItem {
  id: number;
  image: string;
}

// 8 Photos for Section 2 (Infinite Grid)
export const INFINITE_GRID_ITEMS: RomanticImageItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  image: REAL_PHOTOS[i % REAL_PHOTOS.length] || '',
}));

// Section 3: 2-Line Romantic Message
export const ROMANTIC_TWO_LINES = {
  line1: "In a sea of millions, my eyes will always search for you.",
  line2: "And in every quiet heartbeat, my soul whispers how deeply I love you.",
  author: "Forever Yours",
};

// 8 Photos for Section 4 (Swiping Cards)
export const SWIPING_CARDS: RomanticImageItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  image: REAL_PHOTOS[(i + 8) % REAL_PHOTOS.length] || REAL_PHOTOS[i % REAL_PHOTOS.length] || '',
}));

// 8 Photos for Section 6 (3D Flipping Book)
export const FLIPPING_BOOK_PHOTOS: string[] = Array.from(
  { length: 8 },
  (_, i) => REAL_PHOTOS[(i + 14) % REAL_PHOTOS.length] || REAL_PHOTOS[i % REAL_PHOTOS.length] || ''
);

// Section 5: Voice Memo Information
export const VOICE_MEMO_DATA = {
  title: "A Voice Note From My Heart",
  subtitle: "Recorded with love, just for you",
};
