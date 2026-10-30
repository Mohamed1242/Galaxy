import React, { useState, useEffect } from 'react';
import { Play, Pause, Mic } from 'lucide-react';
import { romanticAudio } from '../utils/soundSynth';

interface VoiceRecordPlayerProps {
  onVoicePlayingChange?: (isPlaying: boolean) => void;
}

export const VoiceRecordPlayer: React.FC<VoiceRecordPlayerProps> = ({ onVoicePlayingChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(20);

  const toggleVoicePlayback = () => {
    if (isPlaying) {
      romanticAudio.stopVoiceRecord();
      setIsPlaying(false);
      if (onVoicePlayingChange) onVoicePlayingChange(false);
    } else {
      setIsPlaying(true);
      if (onVoicePlayingChange) onVoicePlayingChange(true);

      romanticAudio.playVoiceRecord(
        (pct, sec, dur) => {
          setProgress(pct);
          setCurrentSeconds(sec);
          if (dur > 0) setTotalSeconds(dur);
        },
        () => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentSeconds(0);
          if (onVoicePlayingChange) onVoicePlayingChange(false);
        }
      );
    }
  };

  useEffect(() => {
    return () => {
      romanticAudio.stopVoiceRecord();
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // 18 balanced waveform bars
  const bars = [35, 60, 40, 85, 55, 95, 70, 45, 90, 65, 40, 80, 50, 75, 40, 60, 80, 50];

  return (
    <section
      id="voice"
      className="story-section min-h-[80vh] sm:min-h-screen flex flex-col justify-center items-center py-20 px-4 relative max-w-sm mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-rose-500 font-semibold mb-1">
          <Mic size={12} />
          <span>Voice Note</span>
        </div>
        <h2 className="font-romantic text-2xl sm:text-3xl font-normal text-neutral-900 leading-tight">
          Words From My Heart
        </h2>
      </div>

      {/* Luxury Glassmorphism Voice Capsule (No Text, Pure Glass Effect) */}
      <div className="relative w-72 sm:w-80">
        {/* Soft Pink Glow behind glass */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-300/30 via-pink-200/20 to-rose-300/30 rounded-3xl blur-xl -z-10" />

        {/* Frosted Glass Container */}
        <div className="w-full bg-white/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-[0_10px_35px_-5px_rgba(244,63,94,0.18)] border border-white/80 relative">
          <div className="flex items-center gap-3">
            {/* Tactile Play/Pause Button with soft rose drop-shadow */}
            <button
              onClick={toggleVoicePlayback}
              aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
              className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-400/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={17} className="fill-white" />
              ) : (
                <Play size={17} className="fill-white ml-0.5" />
              )}
            </button>

            {/* Glass Waveform & Time */}
            <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
              {/* Waveform bars container with inset glass backdrop */}
              <div className="flex items-center gap-1 h-8 px-2.5 bg-white/50 backdrop-blur-md rounded-xl border border-white/60 shadow-inner overflow-hidden">
                {bars.map((height, idx) => {
                  const isPlayed = (idx / bars.length) * 100 <= progress;
                  return (
                    <span
                      key={idx}
                      style={{
                        height: isPlaying ? `${Math.max(25, height * (0.6 + Math.sin(idx * 0.9 + currentSeconds * 3.5) * 0.4))}%` : `${height * 0.7}%`,
                        transition: 'height 0.12s ease',
                      }}
                      className={`flex-1 rounded-full ${
                        isPlayed
                          ? 'bg-gradient-to-t from-rose-500 to-rose-400'
                          : 'bg-rose-200/80'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Minimalist Time Indicators */}
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono px-1">
                <span>{formatTime(currentSeconds)}</span>
                <span>{formatTime(totalSeconds)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
