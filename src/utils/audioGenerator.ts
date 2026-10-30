/**
 * In-memory procedural audio generator that creates standard PCM WAV Blobs.
 * Using HTML5 Audio with WAV Blobs ensures 100% reliable, audible playback across
 * all mobile (iOS Safari, Android Chrome) and desktop browsers without suspended WebAudio bugs.
 */

// Helper to write string to DataView
function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

// Convert Float32Array PCM samples to 16-bit mono WAV Blob
function pcmToWavBlob(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');

  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // 16 for PCM
  view.setUint16(20, 1, true);  // 1 = PCM (linear quantization)
  view.setUint16(22, 1, true);  // 1 channel (mono)
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate (sampleRate * 1 * 2)
  view.setUint16(32, 2, true);  // block align
  view.setUint16(34, 16, true); // 16-bit bits per sample

  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);

  // Write PCM audio data
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    // Clamp to -1 .. 1
    const s = Math.max(-1, Math.min(1, samples[i]));
    // 16-bit signed integer (-32768 to 32767)
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

// Generate romantic lo-fi piano progression (Fmaj7 - G6 - Em7 - Am7)
export function generateRomanticPianoTrack(): string {
  const sampleRate = 22050;
  const loopDuration = 10; // 10 seconds seamless loop
  const totalSamples = sampleRate * loopDuration;
  const samples = new Float32Array(totalSamples);

  // 4 chord progression: 2.5s per chord
  // Fmaj7: F3(174.6), A3(220), C4(261.6), E4(329.6)
  // G6:    G3(196),   B3(246.9), D4(293.7), E4(329.6)
  // Em7:   E3(164.8), G3(196),   B3(246.9), D4(293.7)
  // Am7:   A2(110),   C3(130.8), E3(164.8), G3(196), C4(261.6)
  const chordTimeline = [
    { start: 0.0, freqs: [174.61, 220.00, 261.63, 329.63] },
    { start: 2.5, freqs: [196.00, 246.94, 293.66, 329.63] },
    { start: 5.0, freqs: [164.81, 196.00, 246.94, 293.66] },
    { start: 7.5, freqs: [110.00, 164.81, 220.00, 261.63] },
  ];

  chordTimeline.forEach((chord) => {
    chord.freqs.forEach((freq, noteIdx) => {
      const noteDelay = noteIdx * 0.06; // gentle arpeggio strum
      const noteStartSample = Math.floor((chord.start + noteDelay) * sampleRate);
      const noteDurationSamples = Math.floor(3.2 * sampleRate);

      for (let i = 0; i < noteDurationSamples; i++) {
        const sampleIndex = noteStartSample + i;
        if (sampleIndex >= totalSamples) break;

        const t = i / sampleRate;
        // Warm electric piano harmonic blend (fundamental + soft harmonics)
        const tone =
          Math.sin(2 * Math.PI * freq * t) * 0.65 +
          Math.sin(2 * Math.PI * freq * 2 * t) * 0.25 +
          Math.sin(2 * Math.PI * freq * 3 * t) * 0.10;

        // Exponential decay envelope
        const envelope = Math.exp(-t * 1.25);
        // Soft attack ramp
        const attack = Math.min(1, t / 0.03);

        const amplitude = tone * envelope * attack * 0.28;
        samples[sampleIndex] += amplitude;
      }
    });
  });

  // Soft sparkle notes on top (gentle bell melody)
  const bellNotes = [
    { time: 1.2, freq: 523.25 }, // C5
    { time: 3.6, freq: 587.33 }, // D5
    { time: 6.2, freq: 659.25 }, // E5
    { time: 8.4, freq: 440.00 }, // A4
  ];

  bellNotes.forEach((bell) => {
    const startSample = Math.floor(bell.time * sampleRate);
    const durationSamples = Math.floor(1.6 * sampleRate);

    for (let i = 0; i < durationSamples; i++) {
      const sampleIndex = startSample + i;
      if (sampleIndex >= totalSamples) break;

      const t = i / sampleRate;
      const tone = Math.sin(2 * Math.PI * bell.freq * t);
      const envelope = Math.exp(-t * 2.8);
      samples[sampleIndex] += tone * envelope * 0.12;
    }
  });

  // Master normalization & soft clipping
  for (let i = 0; i < totalSamples; i++) {
    samples[i] = Math.tanh(samples[i] * 1.5) * 0.85;
  }

  const blob = pcmToWavBlob(samples, sampleRate);
  return URL.createObjectURL(blob);
}

// Generate romantic voice note / music box melody track (20 seconds)
export function generateVoiceNoteTrack(): string {
  const sampleRate = 22050;
  const duration = 20; // 20 seconds
  const totalSamples = sampleRate * duration;
  const samples = new Float32Array(totalSamples);

  // Sweet music box / kalimba melody notes: C4, D4, E4, G4, A4, C5
  const melody = [
    { t: 0.5, f: 329.63 }, // E4
    { t: 1.2, f: 392.00 }, // G4
    { t: 2.0, f: 523.25 }, // C5
    { t: 3.0, f: 440.00 }, // A4
    { t: 4.2, f: 392.00 }, // G4
    { t: 5.5, f: 329.63 }, // E4
    { t: 6.8, f: 293.66 }, // D4
    { t: 8.0, f: 261.63 }, // C4
    { t: 9.5, f: 329.63 }, // E4
    { t: 11.0, f: 392.00 }, // G4
    { t: 12.5, f: 440.00 }, // A4
    { t: 14.0, f: 523.25 }, // C5
    { t: 15.5, f: 493.88 }, // B4
    { t: 17.0, f: 523.25 }, // C5
  ];

  melody.forEach((note) => {
    const startSample = Math.floor(note.t * sampleRate);
    const durationSamples = Math.floor(2.2 * sampleRate);

    for (let i = 0; i < durationSamples; i++) {
      const idx = startSample + i;
      if (idx >= totalSamples) break;

      const t = i / sampleRate;
      // Music box chime timbre: fundamental + pure octave overtone
      const chime =
        Math.sin(2 * Math.PI * note.f * t) * 0.7 +
        Math.sin(2 * Math.PI * note.f * 2 * t) * 0.2 +
        Math.sin(2 * Math.PI * note.f * 3 * t) * 0.1;

      const env = Math.exp(-t * 2.0);
      const attack = Math.min(1, t / 0.015);

      samples[idx] += chime * env * attack * 0.45;
    }
  });

  // Normalize
  for (let i = 0; i < totalSamples; i++) {
    samples[i] = Math.tanh(samples[i] * 1.6) * 0.88;
  }

  const blob = pcmToWavBlob(samples, sampleRate);
  return URL.createObjectURL(blob);
}

