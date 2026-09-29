// =========================================================
// AntiOS Web Audio API Synthesizer
// Zero external files, 100% pure procedural annoying frequencies
// =========================================================

class AntiAudioEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.init();
      this.playSuccess();
      this.startElevatorBgm();
    } else {
      this.stopElevatorBgm();
    }
    return this.soundEnabled;
  }

  // Obnoxious error buzzer (descending sawtooth wave)
  playBuzzer() {
    if (!this.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  // Off-key discordant chime
  playSuccess() {
    if (!this.soundEnabled || !this.ctx) return;
    const freqs = [330, 415.3, 523.25, 622.25]; // slightly detuned augmented chords
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.4);
    });
  }

  // Spring boing pitch ramp
  playBoing() {
    if (!this.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // Mouse evasion whoosh / panic squeak
  playEvade() {
    if (!this.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // Windows 95 style warning ding
  playDing() {
    if (!this.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  // Click crackle
  playClick() {
    if (!this.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1500, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  // Dial-up chirp simulator
  playDialUpBaud() {
    if (!this.soundEnabled || !this.ctx) return;
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const randomFreq = 900 + Math.random() * 1200;
      osc.frequency.setValueAtTime(randomFreq, this.ctx.currentTime + i * 0.06);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.06 + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.06);
      osc.stop(this.ctx.currentTime + i * 0.06 + 0.05);
    }
  }

  // Brainrot Vine Boom (Sub-bass drop impact)
  playVineBoom() {
    if (!this.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }

  // Brainrot MLG Airhorn triplet
  playAirhorn() {
    if (!this.soundEnabled || !this.ctx) return;
    const notes = [
      { t: 0, d: 0.1 },
      { t: 0.12, d: 0.1 },
      { t: 0.24, d: 0.1 },
      { t: 0.40, d: 0.35 }
    ];
    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(466.16, this.ctx.currentTime + n.t); // Bb4
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + n.t);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + n.t + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + n.t);
      osc.stop(this.ctx.currentTime + n.t + n.d);
    });
  }

  // Low "Bruh" tone
  playBruh() {
    if (!this.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(95, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(70, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  // Legendary Metal Pipe Falling sound effect (chaotic resonant FM crash)
  playMetalPipe() {
    if (!this.soundEnabled || !this.ctx) return;
    const freqs = [587, 880, 1174, 1760, 2349, 3520];
    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = i % 2 === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(f + (Math.random() * 40 - 20), this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.9);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.9);
    });
  }

  // Police Speeding Ticket Siren
  playPoliceSiren() {
    if (!this.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.25);
    osc.frequency.linearRampToValueAtTime(600, now + 0.5);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.75);
    osc.frequency.linearRampToValueAtTime(600, now + 1.0);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 1.0);
  }

  // Tactical Flashbang (Tinnitus high pitch ringing)
  playFlashbang() {
    if (!this.soundEnabled || !this.ctx) return;
    // Sub bass pop
    const pop = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    pop.type = 'sine';
    pop.frequency.setValueAtTime(150, this.ctx.currentTime);
    pop.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.2);
    popGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    popGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    pop.connect(popGain);
    popGain.connect(this.ctx.destination);
    pop.start();
    pop.stop(this.ctx.currentTime + 0.2);

    // High pitch 4000Hz ringing
    const ring = this.ctx.createOscillator();
    const ringGain = this.ctx.createGain();
    ring.type = 'sine';
    ring.frequency.setValueAtTime(4200, this.ctx.currentTime);
    ringGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    ringGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);
    ring.connect(ringGain);
    ringGain.connect(this.ctx.destination);
    ring.start();
    ring.stop(this.ctx.currentTime + 2.5);
  }

  // The Ultimate Psychological Attack: Authentic Discord Message Ping
  playDiscordPing() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    // Discord notification is D5 (587.33 Hz) to B5 (987.77 Hz)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.1);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.00, now + 0.08);
    gain2.gain.setValueAtTime(0.35, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.35);
  }

  // Taco Bell Bong / Reverb Gong
  playTacoBell() {
    if (!this.soundEnabled || !this.ctx) return;
    const freqs = [196, 293, 392, 440];
    freqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.8);
    });
  }

  // Goofy Ahh Reverb Fart Synthesizer
  playReverbFart() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.65);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.65);
  }

  // Nuclear Air Raid Siren
  playAirRaidSiren() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    
    // Low to high to low modulation
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(750, now + 0.8);
    osc.frequency.linearRampToValueAtTime(300, now + 1.6);
    osc.frequency.linearRampToValueAtTime(750, now + 2.4);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 3.0);
  }

  // Comical Squeaky Rubber Duck
  playRubberDuck() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.22);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Two-Tone Emergency Nuclear Klaxon
  playKlaxon() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const freq = i % 2 === 0 ? 550 : 440;
      osc.frequency.setValueAtTime(freq, now + i * 0.25);
      gain.gain.setValueAtTime(0.3, now + i * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.25 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.25);
      osc.stop(now + i * 0.25 + 0.2);
    }
  }

  // Repetitive 8-bit off-key Elevator BGM loop
  startElevatorBgm() {
    if (this.bgmPlaying || !this.soundEnabled) return;
    this.bgmPlaying = true;
    
    // Notes of a very wonky elevator tune
    const melody = [
      { note: 261.63, dur: 0.25 }, // C4
      { note: 329.63, dur: 0.25 }, // E4
      { note: 392.00, dur: 0.25 }, // G4
      { note: 466.16, dur: 0.35 }, // Bb4 (flat 7 dissonance)
      { note: 392.00, dur: 0.25 },
      { note: 329.63, dur: 0.25 },
      { note: 293.66, dur: 0.50 }  // D4
    ];
    let noteIdx = 0;

    const playNext = () => {
      if (!this.bgmPlaying || !this.soundEnabled) return;
      const current = melody[noteIdx];
      noteIdx = (noteIdx + 1) % melody.length;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(current.note, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + current.dur * 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + current.dur * 0.9);
      } catch (e) {}

      this.bgmTimer = setTimeout(playNext, current.dur * 1000);
    };

    playNext();
  }

  stopElevatorBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) clearTimeout(this.bgmTimer);
  }
  // Seductive / Freaky Sine Slide with Vibrato LFO
  playFreakySlide() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.35);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.7);

    // Vibrato
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(6.5, now);
    lfoGain.gain.setValueAtTime(18, now);
    lfo.connect(osc.frequency);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    lfo.start(now);
    osc.start(now);
    lfo.stop(now + 0.7);
    osc.stop(now + 0.7);
  }

  // Moist / Freaky Squelch
  playFreakySquelch() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.2);

    filter.type = 'bandpass';
    filter.Q.setValueAtTime(9, now);
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.2);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Sultry 80s Saxophone Riff (Careless Whisper style)
  playCarelessWhisperSax() {
    if (!this.soundEnabled || !this.ctx) return;
    const notes = [
      { f: 587.33, d: 0.22 }, // D5
      { f: 523.25, d: 0.18 }, // C5
      { f: 466.16, d: 0.28 }, // Bb4
      { f: 440.00, d: 0.65 }  // A4
    ];
    let offset = 0;
    const startTime = this.ctx.currentTime;

    notes.forEach((n, idx) => {
      const t = startTime + offset;
      const osc = this.ctx.createOscillator();
      const vibrato = this.ctx.createOscillator();
      const vibGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, t);

      vibrato.frequency.setValueAtTime(5.8, t);
      vibGain.gain.setValueAtTime(n.d > 0.3 ? 12 : 4, t);
      vibrato.connect(osc.frequency);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.Q.setValueAtTime(3, t);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.04);
      gain.gain.setValueAtTime(0.18, t + n.d * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      vibrato.start(t);
      osc.start(t);
      vibrato.stop(t + n.d);
      osc.stop(t + n.d);

      offset += n.d * 0.85;
    });
  }

  // Procedural Comedic Moan / Seductive Sigh
  playMoan() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    // Downward vocal slide
    osc1.frequency.setValueAtTime(340, now);
    osc1.frequency.exponentialRampToValueAtTime(160, now + 0.55);

    osc2.frequency.setValueAtTime(680, now);
    osc2.frequency.exponentialRampToValueAtTime(320, now + 0.55);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.55);
    osc2.stop(now + 0.55);
  }

  // Lip Smack / Kiss sound
  playKiss() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.12);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }
}

const soundEngine = new AntiAudioEngine();
window.soundEngine = soundEngine;
