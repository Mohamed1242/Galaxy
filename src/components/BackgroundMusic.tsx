import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/soundSynth';

interface BackgroundMusicProps {
  isVoicePlaying?: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isVoicePlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync with global romanticAudio engine
  useEffect(() => {
    const unsubscribe = romanticAudio.subscribeBgState((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  // When voice note starts, automatically pause background song
  useEffect(() => {
    if (isVoicePlaying) {
      romanticAudio.pauseBackgroundMusic();
    }
  }, [isVoicePlaying]);

  const togglePlay = () => {
    romanticAudio.toggleBackgroundMusic();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setBackgroundVolume(val);
  };

  return (
    <div className="fixed top-3 sm:top-5 right-3 sm:right-6 z-50 flex items-center">
      <div className="romantic-glass-panel rounded-full flex items-center p-1 sm:p-1.5 shadow-lg border border-rose-200/80 transition-all duration-300">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause background song' : 'Play romantic background song'}
          className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-transform active:scale-95 cursor-pointer ${
            isPlaying ? 'bg-rose-500 text-white shadow-md shadow-rose-300' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
          }`}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
        </button>

        {/* Music Label & Wave */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-2 cursor-pointer select-none"
        >
          <Heart size={13} className={`text-rose-500 ${isPlaying ? 'animate-pulse fill-rose-500' : ''}`} />
          <span className="text-[11px] sm:text-xs font-medium text-neutral-800 tracking-wide">
            {isPlaying ? 'تملي معاك ❤️' : 'Play Song'}
          </span>

          {isPlaying && (
            <div className="flex items-end gap-0.5 h-2.5 ml-1">
              <span className="w-0.5 bg-rose-500 rounded-full animate-music-bar-1" />
              <span className="w-0.5 bg-rose-500 rounded-full animate-music-bar-2" />
              <span className="w-0.5 bg-rose-500 rounded-full animate-music-bar-3" />
            </div>
          )}
        </div>

        {/* Expandable Volume Slider */}
        {isExpanded && (
          <div className="flex items-center gap-1.5 pl-2 pr-1 border-l border-rose-200/60">
            {volume > 0 ? (
              <Volume2 size={13} className="text-rose-500" />
            ) : (
              <VolumeX size={13} className="text-neutral-400" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Background music volume"
              className="w-14 sm:w-16 h-1 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};
