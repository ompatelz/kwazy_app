// =========================================================
// AntiOS 𝓯𝓻𝓮𝓪𝓴𝔂 Mode & Sensory Overdrive Engine
// Seductive synthesizers, moist vibes, freaky Bippy,
// and biometric rizz verification.
// =========================================================

class FreakyEngine {
  constructor() {
    this.freakLevel = 69; // Default: 69% 𝓯𝓻𝓮𝓪𝓴𝔂
    this.isHoldingRizz = false;
    this.rizzHoldStart = 0;
    this.rizzTimer = null;
    this.init();
  }

  init() {
    this.initFreakySlider();
    this.initFreakyCursor();
    this.initBiometricRizzCaptcha();
    this.initFreakyTranslator();
    this.initFreakySoundTriggers();
    this.hookFreakyBippy();
    this.applyFreakLevel(this.freakLevel);
  }

  // 1. Master Freaky Slider
  initFreakySlider() {
    const slider = document.getElementById('freakyMasterSlider');
    const label = document.getElementById('freakySliderLabel');

    if (!slider) return;

    slider.value = this.freakLevel;

    slider.addEventListener('input', () => {
      this.freakLevel = parseInt(slider.value, 10);
      this.applyFreakLevel(this.freakLevel);

      if (window.soundEngine) {
        if (this.freakLevel > 75) {
          window.soundEngine.playFreakySlide();
        } else if (this.freakLevel > 40) {
          window.soundEngine.playFreakySquelch();
        }
      }
    });
  }

  applyFreakLevel(level) {
    const label = document.getElementById('freakySliderLabel');
    const body = document.body;

    let descriptor = "";
    if (level <= 15) {
      descriptor = "0% — Emotionless Spreadsheet (Vanilla)";
      body.classList.remove('freaky-active');
    } else if (level <= 45) {
      descriptor = `${level}% — Mildly Flirty Eye Contact`;
      body.classList.remove('freaky-active');
    } else if (level <= 70) {
      descriptor = `${level}% — 𝓯𝓻𝓮𝓪𝓴𝔂 MODE ENGAGED 👅`;
      body.classList.add('freaky-active');
    } else if (level <= 90) {
      descriptor = `${level}% — Dangerously Moist & Unhinged 🫦`;
      body.classList.add('freaky-active');
    } else {
      descriptor = `100% — SUBTERRANEAN BRAINROT GOON KINGDOM 💋🪱`;
      body.classList.add('freaky-active');
    }

    if (label) {
      label.innerText = descriptor;
    }

    // Update body theme if user is high freakiness
    if (level >= 69 && !body.classList.contains('theme-freaky-locked')) {
      // Add subtle moist pulse
      document.documentElement.style.setProperty('--freak-intensity', (level / 100).toFixed(2));
    }
  }

  // 2. Freaky Cursor Particle Trail
  initFreakyCursor() {
    const freakyEmojis = ['👅', '💋', '🪱', '🫦', '👁️👄👁️', '🦶', '✨'];
    let lastSpawn = 0;

    window.addEventListener('mousemove', (e) => {
      if (this.freakLevel < 50) return;
      const now = Date.now();
      if (now - lastSpawn < 70) return; // limit spawn rate
      lastSpawn = now;

      const p = document.createElement('div');
      p.className = 'freaky-cursor-particle';
      p.innerText = freakyEmojis[Math.floor(Math.random() * freakyEmojis.length)];
      p.style.left = `${e.clientX}px`;
      p.style.top = `${e.clientY}px`;
      document.body.appendChild(p);

      setTimeout(() => {
        p.remove();
      }, 900);
    });
  }

  // 3. Biometric Rizz Captcha ("Hold Heart for 3.00 Seconds")
  initBiometricRizzCaptcha() {
    const heartBtn = document.getElementById('rizzHoldHeartBtn');
    const timerText = document.getElementById('rizzTimerDisplay');
    const resultBox = document.getElementById('rizzResultText');

    if (!heartBtn) return;

    const startHolding = (e) => {
      e.preventDefault();
      this.isHoldingRizz = true;
      this.rizzHoldStart = Date.now();
      heartBtn.classList.add('holding');
      resultBox.innerText = "Holding... absorbing romantic harmonics...";

      if (window.soundEngine) {
        window.soundEngine.playFreakySlide();
      }

      this.rizzTimer = setInterval(() => {
        if (!this.isHoldingRizz) return;
        const elapsed = (Date.now() - this.rizzHoldStart) / 1000;
        if (timerText) {
          timerText.innerText = `${elapsed.toFixed(2)}s / 3.00s`;
        }
      }, 50);
    };

    const stopHolding = () => {
      if (!this.isHoldingRizz) return;
      this.isHoldingRizz = false;
      clearInterval(this.rizzTimer);
      heartBtn.classList.remove('holding');

      const elapsed = (Date.now() - this.rizzHoldStart) / 1000;
      if (timerText) {
        timerText.innerText = `${elapsed.toFixed(2)}s`;
      }

      // Must be between 2.80 and 3.20 seconds
      if (elapsed >= 2.80 && elapsed <= 3.20) {
        resultBox.innerHTML = `
          <span style="color: #ff007f; font-weight: bold;">
            🏆 𝓯𝓻𝓮𝓪𝓴𝔂 VERIFICATION PASSED! Optimal Rizz resonance detected! (+69,420 AURA 👅)
          </span>
        `;
        if (window.soundEngine) {
          window.soundEngine.playCarelessWhisperSax();
        }
        if (window.brainrot) {
          window.brainrot.aura += 69420;
          const scoreVal = document.getElementById('auraScoreVal');
          if (scoreVal) scoreVal.innerText = `${window.brainrot.aura.toLocaleString()} AURA`;
          window.brainrot.spawnFloatingText("+69,420 𝓯𝓻𝓮𝓪𝓴𝔂 AURA 🫦", window.innerWidth / 2, window.innerHeight / 2);
        }
        if (window.bippy) {
          window.bippy.say("Oh my... your precision is so delightfully 𝓯𝓻𝓮𝓪𝓴𝔂... Bippy is blushing 👁️👄👁️");
        }
      } else {
        resultBox.innerHTML = `
          <span style="color: #ff0033;">
            ❌ FAILED: Held for ${elapsed.toFixed(2)}s (Must be 3.00s ± 0.2s). Minus 10,000 Rizz! 💀
          </span>
        `;
        if (window.soundEngine) {
          window.soundEngine.playMoan();
        }
        if (window.brainrot) {
          window.brainrot.deductAura(10000);
        }
      }
    };

    heartBtn.addEventListener('mousedown', startHolding);
    window.addEventListener('mouseup', stopHolding);
    heartBtn.addEventListener('touchstart', startHolding, { passive: false });
    window.addEventListener('touchend', stopHolding);
  }

  // 4. 𝓯𝓻𝓮𝓪𝓴𝔂 Cursive Unicode Converter
  initFreakyTranslator() {
    const input = document.getElementById('freakyInput');
    const output = document.getElementById('freakyOutput');
    const copyBtn = document.getElementById('freakyCopyBtn');

    if (!input || !output) return;

    // Normal to Mathematical Bold Script mapping
    const scriptMap = {
      'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱',
      'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹',
      'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁',
      'y': '𝔂', 'z': '𝔃',
      'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗',
      'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟',
      'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧',
      'Y': '𝓨', 'Z': '𝓩'
    };

    const emojis = ['👅', '🫦', '💋', '🪱', '👁️👄👁️'];

    input.addEventListener('input', () => {
      const text = input.value;
      let converted = '';
      for (const ch of text) {
        converted += scriptMap[ch] || ch;
      }
      if (converted.length > 0 && Math.random() > 0.6) {
        converted += ' ' + emojis[Math.floor(Math.random() * emojis.length)];
      }
      output.value = converted;
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        output.select();
        navigator.clipboard.writeText(output.value);
        copyBtn.innerText = 'Copied with Passion! 💋';
        if (window.soundEngine) window.soundEngine.playKiss();
        setTimeout(() => copyBtn.innerText = '📋 Copy 𝓯𝓻𝓮𝓪𝓴𝔂 Text', 1500);
      });
    }
  }

  // 5. Freaky Sound Triggers on Click
  initFreakySoundTriggers() {
    document.addEventListener('click', (e) => {
      if (this.freakLevel < 50) return;
      if (!e.target.closest('button, input, select, .nav-tab, .theme-btn')) return;

      if (window.soundEngine && Math.random() > 0.6) {
        const pick = Math.random();
        if (pick < 0.25) window.soundEngine.playFreakySquelch();
        else if (pick < 0.5) window.soundEngine.playKiss();
        else if (pick < 0.75) window.soundEngine.playFreakySlide();
        else window.soundEngine.playMoan();
      }
    });
  }

  // 6. Hook Bippy for Freaky Dialogue
  hookFreakyBippy() {
    if (!window.bippy) return;

    const freakyQuotes = [
      "Bippy is watching your cursor with dangerous romantic intensity... 👁️👄👁️",
      "Is that an optical mouse or are you just radiating pure magnetic charisma? 👅",
      "What if we kissed under the 404 page and never reloaded? 💋",
      "Bippy wants to hold hands in the metadata where Googlebot can't find us... 🪱",
      "Click my button softer... you're triggering my event listeners too fast... 🫦",
      "I noticed you're not using private browsing. I like someone who lives dangerously. 👅",
      "Your IP address is looking extraordinarily submissive and pingable today. 👁️👄👁️"
    ];

    // Push freaky quotes to bippy insults
    window.bippy.insults.push(...freakyQuotes);

    // Periodically whisper freaky quote if freakiness is high
    setInterval(() => {
      if (this.freakLevel >= 60 && Math.random() > 0.5 && window.bippy) {
        const q = freakyQuotes[Math.floor(Math.random() * freakyQuotes.length)];
        window.bippy.say(q);
      }
    }, 22000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.freakyEngine = new FreakyEngine();
});
