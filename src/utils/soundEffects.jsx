// Sound Utility with Web Audio API Synthesizer and Audio Fallback Support

// Web Audio API Context Initialization (Singleton Pattern)
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a fanfare / celebration chord arpeggio using synthesized Web Audio API nodes.
 * Creates a rich, cheery sound without needing heavy external audio files.
 */
export function playCelebrationSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Cheerful Arpeggio Notes (Major Chord sequence: C5, E5, G5, C6, E6, G6)
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
  
  notes.forEach((freq, index) => {
    const startTime = now + index * 0.08;
    const duration = 0.4;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Use bright square/triangle wave mix
    osc.type = index % 2 === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Envelope for punchy, sparkling sound
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  });

  // Add a shimmering final flourish chord
  const finalChord = [1046.50, 1318.51, 1567.98, 2093.00]; // C6 Major
  const chordStart = now + notes.length * 0.08;
  
  finalChord.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, chordStart);

    gain.gain.setValueAtTime(0, chordStart);
    gain.gain.linearRampToValueAtTime(0.18, chordStart + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, chordStart + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(chordStart);
    osc.stop(chordStart + 1.2);
  });
}

/**
 * Plays a quick popping sound for button taps or interactions.
 */
export function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}

/**
 * Main sound dispatcher function.
 * @param {string} type - 'win', 'pop', 'animal', etc.
 * @param {string} [customUrl] - Optional URL for audio files (e.g. animal noises)
 */
export function playSoundEffect(type, customUrl = null) {
  try {
    if (customUrl) {
      const audio = new Audio(customUrl);
      audio.play().catch((err) => console.log('Audio file play error:', err));
      return;
    }

    switch (type) {
      case 'win':
      case 'celebration':
      case 'congratulations':
        playCelebrationSound();
        break;
      case 'pop':
      default:
        playPopSound();
        break;
    }
  } catch (error) {
    console.warn('Error playing audio effect:', error);
  }
}