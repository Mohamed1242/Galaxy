import { generateRomanticPianoTrack, generateVoiceNoteTrack } from './audioGenerator';

class RomanticAudioEngine {
  private bgAudio: HTMLAudioElement | null = null;
  private voiceAudio: HTMLAudioElement | null = null;
  private bgUrl: string = '/audio/bg-song.mp4';
  private voiceUrl: string = '/audio/voice-memo.mp3';
  private isBgPlaying = false;
  private isVoicePlaying = false;
  private bgVolume = 0.6;
  private bgListeners: Set<(isPlaying: boolean) => void> = new Set();

  public subscribeBgState(listener: (isPlaying: boolean) => void): () => void {
    this.bgListeners.add(listener);
    listener(this.isBgPlaying);
    return () => {
      this.bgListeners.delete(listener);
    };
  }

  private notifyBgListeners(isPlaying: boolean) {
    this.isBgPlaying = isPlaying;
    this.bgListeners.forEach((fn) => fn(isPlaying));
  }

  private getBgAudio(): HTMLAudioElement {
    if (!this.bgAudio) {
      this.bgAudio = new Audio(this.bgUrl);
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.bgVolume;
      this.bgAudio.preload = 'auto';

      this.bgAudio.onerror = () => {
        console.warn('Custom background song not found, falling back to procedural track');
        this.bgUrl = generateRomanticPianoTrack();
        if (this.bgAudio) {
          this.bgAudio.src = this.bgUrl;
          if (this.isBgPlaying) this.bgAudio.play();
        }
      };
    }
    return this.bgAudio;
  }

  private getVoiceAudio(): HTMLAudioElement {
    if (!this.voiceAudio) {
      this.voiceAudio = new Audio(this.voiceUrl);
      this.voiceAudio.volume = 0.95;
      this.voiceAudio.preload = 'auto';

      this.voiceAudio.onerror = () => {
        console.warn('Custom voice memo not found, falling back to procedural voice note');
        this.voiceUrl = generateVoiceNoteTrack();
        if (this.voiceAudio) {
          this.voiceAudio.src = this.voiceUrl;
          if (this.isVoicePlaying) this.voiceAudio.play();
        }
      };
    }
    return this.voiceAudio;
  }

  public pauseBackgroundMusic(): void {
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.notifyBgListeners(false);
  }

  public toggleBackgroundMusic(): boolean {
    const audio = this.getBgAudio();

    if (this.isBgPlaying) {
      audio.pause();
      this.notifyBgListeners(false);
      return false;
    } else {
      // If voice is playing, stop it first so they never clash
      if (this.isVoicePlaying) {
        this.stopVoiceRecord();
      }

      audio.volume = this.bgVolume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.notifyBgListeners(true);
          })
          .catch((err) => {
            console.warn('Audio play restricted by browser policy:', err);
            this.notifyBgListeners(false);
          });
      }
      return true;
    }
  }

  public setBackgroundVolume(volume: number) {
    this.bgVolume = Math.max(0, Math.min(1, volume));
    if (this.bgAudio) {
      this.bgAudio.volume = this.bgVolume;
    }
  }

  public isBackgroundPlaying(): boolean {
    return this.isBgPlaying;
  }

  public playVoiceRecord(
    onProgress: (percent: number, currentSec: number, totalDuration: number) => void,
    onEnded: () => void
  ) {
    // STOP background music immediately when voice starts!
    this.pauseBackgroundMusic();

    const audio = this.getVoiceAudio();

    if (this.isVoicePlaying) {
      audio.pause();
      audio.currentTime = 0;
      this.isVoicePlaying = false;
      onEnded();
      return;
    }

    audio.currentTime = 0;
    audio.ontimeupdate = () => {
      const dur = audio.duration && !isNaN(audio.duration) ? audio.duration : 20;
      const curr = audio.currentTime;
      const pct = Math.min(100, (curr / dur) * 100);
      onProgress(pct, Math.floor(curr), Math.floor(dur));
    };

    audio.onended = () => {
      this.isVoicePlaying = false;
      onEnded();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isVoicePlaying = true;
        })
        .catch((err) => {
          console.warn('Voice audio playback prevented:', err);
          this.isVoicePlaying = false;
          onEnded();
        });
    }
  }

  public stopVoiceRecord() {
    if (this.voiceAudio) {
      this.voiceAudio.pause();
      this.voiceAudio.currentTime = 0;
    }
    this.isVoicePlaying = false;
  }

  public isVoiceRecordPlaying(): boolean {
    return this.isVoicePlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();
