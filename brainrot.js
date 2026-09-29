// =========================================================
// AntiOS Brainrot & Pure Chaos Engine
// Subway Parkour Stimulator, Aura Counter, Popups from Hell,
// Brainrot Gyatt-ifier, and Emoji Cursor Trail
// =========================================================

class BrainrotEngine {
  constructor() {
    this.aura = -12500;
    this.popupCount = 0;
    this.init();
  }

  init() {
    this.createAuraWidget();
    this.createParkourCanvas();
    this.createAsmrSoapCanvas();
    this.createFamilyGuyCanvas();
    this.initEmojiCursorTrail();
    this.scheduleHostilePopups();
    this.initWheelOfPain();
    this.initBrainrotTranslator();
    this.initTypingSpeedometer();
    this.initMewingWidget();
    this.initFlashbangFeature();
    this.initBackspaceTax();
    this.initAutoRizzAutocorrect();
    this.initPsychologicalDiscordPings();
    this.initBouncingDvdLogo();
    this.initTacoBellButton();
  }

  // 1. Live Aura / Social Credit Score Tracker
  createAuraWidget() {
    const auraCard = document.createElement('div');
    auraCard.id = 'auraTracker';
    auraCard.className = 'aura-floating-card';
    auraCard.innerHTML = `
      <div class="aura-title">📉 SOCIAL CREDIT & AURA TRACKER</div>
      <div class="aura-score" id="auraScoreVal">${this.aura.toLocaleString()} AURA</div>
      <div class="aura-status" id="auraStatus">Status: Extreme Ohio Casual</div>
    `;
    document.body.appendChild(auraCard);

    // Any click on document loses Aura
    document.addEventListener('click', (e) => {
      // Don't count clicks inside the aura card
      if (e.target.closest('#auraTracker')) return;
      this.deductAura(Math.floor(Math.random() * 800 + 200), e.clientX, e.clientY);
    });
  }

  deductAura(amount, x, y) {
    this.aura -= amount;
    const scoreVal = document.getElementById('auraScoreVal');
    const statusVal = document.getElementById('auraStatus');
    if (scoreVal) scoreVal.innerText = `${this.aura.toLocaleString()} AURA`;

    const insults = [
      "Status: Minus Infinite Rizz",
      "Status: Fanum Tax Delinquent",
      "Status: Skibidi Toilet Survivor",
      "Status: 0 Aura in Ohio",
      "Status: Looksmaxxing Failed"
    ];
    if (statusVal) statusVal.innerText = insults[Math.floor(Math.random() * insults.length)];

    // Floating text particle at click point
    this.spawnFloatingText(`-${amount} AURA 💀`, x, y);
    if (window.soundEngine && Math.random() > 0.4) {
      window.soundEngine.playVineBoom();
    }
  }

  spawnFloatingText(text, x, y) {
    const floatEl = document.createElement('div');
    floatEl.className = 'floating-aura-loss';
    floatEl.innerText = text;
    floatEl.style.left = `${x || window.innerWidth / 2}px`;
    floatEl.style.top = `${y || window.innerHeight / 2}px`;
    document.body.appendChild(floatEl);

    setTimeout(() => {
      floatEl.remove();
    }, 1200);
  }

  // 2. Attention Span Preserver: Mini Parkour Runner Canvas
  createParkourCanvas() {
    const parkourBox = document.createElement('div');
    parkourBox.id = 'parkourWidget';
    parkourBox.className = 'parkour-widget-box';
    parkourBox.innerHTML = `
      <div class="parkour-header">
        <span>🎮 ATTENTION SPAN PRESERVER (SUBWAY PARKOUR)</span>
        <button class="parkour-mini-btn" id="parkourMuteBtn">🔇</button>
      </div>
      <canvas id="parkourCanvas" width="220" height="120"></canvas>
      <div class="parkour-caption">Never lose focus! Parkour gameplay active.</div>
    `;
    document.body.appendChild(parkourBox);

    const canvas = document.getElementById('parkourCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let playerY = 80;
    let playerVy = 0;
    let isJumping = false;
    let obstacles = [{ x: 220, w: 15, h: 25 }];
    let score = 0;

    function loop() {
      ctx.fillStyle = '#1e1e2f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.fillStyle = '#28a745';
      ctx.fillRect(0, 105, canvas.width, 15);

      // Player (Stick figure / cube with sunglasses)
      playerVy += 0.6; // gravity
      playerY += playerVy;
      if (playerY >= 80) {
        playerY = 80;
        playerVy = 0;
        isJumping = false;
      }

      ctx.fillStyle = '#ff0055';
      ctx.fillRect(30, playerY, 18, 25);
      // Eyes / sunglasses
      ctx.fillStyle = '#000';
      ctx.fillRect(38, playerY + 4, 8, 4);

      // Obstacles
      ctx.fillStyle = '#ffbb00';
      obstacles.forEach(obs => {
        obs.x -= 2.5;
        ctx.fillRect(obs.x, 105 - obs.h, obs.w, obs.h);

        // Auto jump when near
        if (obs.x > 30 && obs.x < 70 && !isJumping) {
          playerVy = -8;
          isJumping = true;
          score += 10;
        }
      });

      if (obstacles[0] && obstacles[0].x < -20) {
        obstacles.shift();
        obstacles.push({
          x: 220 + Math.random() * 80,
          w: 12 + Math.random() * 10,
          h: 18 + Math.random() * 14
        });
      }

      // Draw score
      ctx.fillStyle = '#fff';
      ctx.font = '10px monospace';
      ctx.fillText(`SUBWAY SCORE: ${score}`, 6, 14);

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // 3. Emoji Cursor Trail (💀, 🗿, 🤡, 🚽, 🔥)
  initEmojiCursorTrail() {
    const emojis = ['💀', '🗿', '🤡', '🚽', '🔥', '📉', '💩'];
    let lastTime = 0;

    window.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTime < 60) return; // throttle
      lastTime = now;

      const p = document.createElement('span');
      p.className = 'cursor-trail-emoji';
      p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = `${e.clientX}px`;
      p.style.top = `${e.clientY}px`;
      document.body.appendChild(p);

      setTimeout(() => {
        p.remove();
      }, 700);
    });
  }

  // 4. Random Hostile 90s Popups
  scheduleHostilePopups() {
    const popupTemplates = [
      {
        title: "🔥 HOT LOCAL SERVERS IN YOUR AREA!",
        body: "3 dedicated cloud clusters within 2 miles want to ping your IP address right now! No latency, pure bandwidth.",
        cta: "PING LOCAL SERVERS"
      },
      {
        title: "🎁 CONGRATULATIONS! CLAIM 1 FREE V-BUCK",
        body: "You have been selected as lucky visitor #9,821,419! Enter your social security number to receive 0.0001 V-Bucks.",
        cta: "SURRENDER DETAILS"
      },
      {
        title: "⚠️ CRITICAL SYSTEM ALERT: KEYBOARD DUST",
        body: "Optical scanning shows your spacebar is 89% infested with toast crumbs. Please blow vigorously onto your monitor screen to purge.",
        cta: "BLOW ON SCREEN"
      },
      {
        title: "🚨 YOUR COMPUTER HAS SCURVY!",
        body: "Lack of fresh digital oranges detected. Please download Vitamin-C.exe immediately to prevent pixel decay.",
        cta: "DOWNLOAD CITRUS"
      }
    ];

    setInterval(() => {
      if (document.querySelectorAll('.cursed-popup-win').length < 3) {
        const template = popupTemplates[Math.floor(Math.random() * popupTemplates.length)];
        this.spawnPopup(template);
      }
    }, 16000);
  }

  spawnPopup(template) {
    this.popupCount++;
    const pop = document.createElement('div');
    pop.className = 'cursed-popup-win';

    const randX = Math.max(20, Math.floor(Math.random() * (window.innerWidth - 320)));
    const randY = Math.max(40, Math.floor(Math.random() * (window.innerHeight - 250)));
    pop.style.left = `${randX}px`;
    pop.style.top = `${randY}px`;

    pop.innerHTML = `
      <div class="popup-titlebar">
        <span>${template.title}</span>
        <button class="popup-close-btn">✕</button>
      </div>
      <div class="popup-body">
        <p>${template.body}</p>
        <button class="action-btn gamble popup-cta-btn" style="width:100%; margin-top:10px;">${template.cta}</button>
      </div>
    `;

    document.body.appendChild(pop);
    if (window.soundEngine) window.soundEngine.playDialUpBaud();

    const closeBtn = pop.querySelector('.popup-close-btn');
    closeBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBoing();
      pop.remove();
      // 50% chance to spawn another popup in retribution
      if (Math.random() > 0.5) {
        setTimeout(() => {
          this.spawnPopup({
            title: "👿 YOU CANNOT ESCAPE CAPITALISM",
            body: "Closing ads incurs a 4% cognitive processing fee.",
            cta: "ACCEPT DEFEAT"
          });
        }, 500);
      }
    });

    const ctaBtn = pop.querySelector('.popup-cta-btn');
    ctaBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playAirhorn();
      alert("🎉 Action executed! We have deducted 50,000 Aura from your permanent ledger.");
      this.deductAura(50000);
      pop.remove();
    });
  }

  // 5. The Wheel of Arbitrary Penalties
  initWheelOfPain() {
    const wheelBar = document.createElement('div');
    wheelBar.className = 'wheel-pain-banner';
    wheelBar.innerHTML = `
      <span>🎰 MANDATORY LOTTERY:</span>
      <button class="action-btn gamble" id="spinWheelBtn">🎡 SPIN THE WHEEL OF PAIN</button>
      <span id="wheelResult" style="font-weight:bold; color:#ff0055;"></span>
    `;
    
    // Insert after ticker bar
    const ticker = document.querySelector('.cursed-ticker-bar');
    if (ticker && ticker.nextSibling) {
      ticker.parentNode.insertBefore(wheelBar, ticker.nextSibling);
    }

    const spinBtn = document.getElementById('spinWheelBtn');
    const resultSpan = document.getElementById('wheelResult');

    const penalties = [
      () => {
        document.body.style.filter = 'invert(1)';
        resultSpan.innerText = "PENALTY: Screen inverted for 10 seconds!";
        setTimeout(() => document.body.style.filter = '', 10000);
      },
      () => {
        document.body.style.fontFamily = '"Comic Sans MS", cursive !important';
        resultSpan.innerText = "PENALTY: 100% Comic Sans curse activated!";
      },
      () => {
        if (window.soundEngine) window.soundEngine.playAirhorn();
        resultSpan.innerText = "PENALTY: MAXIMUM MLG AIRHORN BLAST!";
      },
      () => {
        document.body.style.transform = 'rotate(180deg)';
        resultSpan.innerText = "PENALTY: Australian Mode (Upside down 8s)!";
        setTimeout(() => document.body.style.transform = '', 8000);
      },
      () => {
        this.deductAura(100000);
        resultSpan.innerText = "PENALTY: BABY GRONK FANUM TAX (-100,000 AURA)!";
      }
    ];

    if (spinBtn) {
      spinBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playBoing();
        spinBtn.disabled = true;
        resultSpan.innerText = "Spinning wheel of torment...";

        setTimeout(() => {
          spinBtn.disabled = false;
          const picked = penalties[Math.floor(Math.random() * penalties.length)];
          picked();
        }, 1200);
      });
    }
  }

  // 6. Brainrot Gyatt-ifier Translator
  initBrainrotTranslator() {
    // Add to Tab 1 or Tab 2
    const settingsPanel = document.querySelector('#tab-settings .settings-grid');
    if (!settingsPanel) return;

    const brainrotCard = document.createElement('div');
    brainrotCard.className = 'setting-card';
    brainrotCard.innerHTML = `
      <h4>🧠 Brainrot Gyatt-ifier (Ohio Translator)</h4>
      <p>Convert any boring enterprise sentence into terminal TikTok slang:</p>
      <input type="text" id="brainrotInput" placeholder="Enter normal sentence..." class="cursed-input" style="margin-bottom:8px;">
      <button class="action-btn gamble" id="gyattifyBtn" style="width:100%;">⚡ Gyatt-ify Text</button>
      <div id="brainrotOutput" style="margin-top:10px; font-weight:bold; font-size:13px; color:#b71c1c; min-height:36px; background:#fff; padding:6px; border:1px inset #ccc;"></div>
    `;
    settingsPanel.appendChild(brainrotCard);

    const input = document.getElementById('brainrotInput');
    const btn = document.getElementById('gyattifyBtn');
    const out = document.getElementById('brainrotOutput');

    const brainrotWords = [
      "skibidi toilet", "fanum tax", "sigma male grindset", "baby gronk rizzing livvy dunne",
      "level 10 gyatt", "kai cenat in ohio", "mewing streak unbroken", "looksmaxxing god",
      "what the dog doin", "sus imposter amogus", "no cap on god fr fr"
    ];

    if (btn) {
      btn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playVineBoom();
        const text = input.value.trim() || "I need to complete this task";
        const w1 = brainrotWords[Math.floor(Math.random() * brainrotWords.length)];
        const w2 = brainrotWords[Math.floor(Math.random() * brainrotWords.length)];
        const w3 = brainrotWords[Math.floor(Math.random() * brainrotWords.length)];
        
        out.innerText = `💀 Chat is this real? Bro really said "${text}" but with ${w1} while ${w2} caught in 4K during ${w3} on god fr no cap 🗿🔥`;
      });
    }
  }

  // 7. Second Brainrot Split-Screen: Kinetic Sand / Soap Cutting ASMR Simulator
  createAsmrSoapCanvas() {
    const asmrBox = document.createElement('div');
    asmrBox.className = 'asmr-widget-box';
    asmrBox.innerHTML = `
      <div class="parkour-header">
        <span>🧼 SECONDARY STIMULATOR: SOAP CUTTING ASMR</span>
      </div>
      <canvas id="asmrCanvas" width="220" height="90"></canvas>
      <div class="parkour-caption">Satisfaction guaranteed. Brain cells decaying.</div>
    `;
    document.body.appendChild(asmrBox);

    const canvas = document.getElementById('asmrCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let knifeY = 10;
    let knifeDir = 1;
    let cubes = [];

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        cubes.push({
          x: 20 + i * 30,
          y: 20 + j * 20,
          w: 26,
          h: 16,
          color: `hsl(${i * 50 + j * 20}, 80%, 60%)`,
          sliced: false
        });
      }
    }

    function renderAsmr() {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw soap block
      cubes.forEach(c => {
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y + (c.sliced ? 6 : 0), c.w, c.h);
      });

      // Animated knife slice
      knifeY += 1.5 * knifeDir;
      if (knifeY > 75) knifeDir = -1;
      if (knifeY < 15) {
        knifeDir = 1;
        cubes.forEach(c => c.sliced = false);
      }

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(10, knifeY);
      ctx.lineTo(210, knifeY);
      ctx.stroke();

      cubes.forEach(c => {
        if (knifeY > c.y && !c.sliced) {
          c.sliced = true;
          if (window.soundEngine && Math.random() > 0.85) {
            window.soundEngine.playClick();
          }
        }
      });

      requestAnimationFrame(renderAsmr);
    }
    requestAnimationFrame(renderAsmr);
  }

  // 8. Psychological Warfare: Random Discord Mention Pings
  initPsychologicalDiscordPings() {
    setInterval(() => {
      // 30% chance every 20 seconds
      if (Math.random() > 0.3) {
        if (window.soundEngine) window.soundEngine.playDiscordPing();

        const toast = document.createElement('div');
        toast.className = 'discord-ghost-toast';
        toast.innerHTML = `
          <div class="discord-icon">💬</div>
          <div class="discord-info">
            <div class="discord-server">AntiOS Support (#announcements)</div>
            <div class="discord-text"><strong>@everyone</strong> FREE DISCORD NITRO 🎁 CLICK FAST!</div>
          </div>
        `;
        document.body.appendChild(toast);

        toast.addEventListener('click', () => {
          if (window.soundEngine) window.soundEngine.playVineBoom();
          alert("💀 PHISHING DETECTED: You fell for the ghost Discord notification! -10,000 Aura.");
          this.deductAura(10000);
          toast.remove();
        });

        setTimeout(() => toast.remove(), 4500);
      }
    }, 22000);
  }

  // 9. The Bouncing DVD / AntiOS Logo Screen Hazard
  initBouncingDvdLogo() {
    const dvd = document.createElement('div');
    dvd.id = 'bouncingDvd';
    dvd.className = 'bouncing-dvd-hazard';
    dvd.innerText = '📀 AntiOS 98';
    document.body.appendChild(dvd);

    let x = 100, y = 100;
    let vx = 3.2, vy = 2.4;
    const colors = ['#ff0055', '#00ff66', '#00ffff', '#ffff00', '#ff00ff', '#ff7700'];
    let cIdx = 0;

    function moveDvd() {
      const w = window.innerWidth - 120;
      const h = window.innerHeight - 50;

      x += vx;
      y += vy;

      let hit = false;
      if (x <= 0 || x >= w) {
        vx *= -1;
        hit = true;
      }
      if (y <= 0 || y >= h) {
        vy *= -1;
        hit = true;
      }

      if (hit) {
        cIdx = (cIdx + 1) % colors.length;
        dvd.style.background = colors[cIdx];
        if (window.soundEngine && Math.random() > 0.5) {
          window.soundEngine.playClick();
        }
      }

      dvd.style.left = `${x}px`;
      dvd.style.top = `${y}px`;

      requestAnimationFrame(moveDvd);
    }
    requestAnimationFrame(moveDvd);

    dvd.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playAirhorn();
      alert("🎯 CORNER HIT BONUS! +100 Aura (Rarest event in human history)");
      this.aura += 100;
      const scoreVal = document.getElementById('auraScoreVal');
      if (scoreVal) scoreVal.innerText = `${this.aura.toLocaleString()} AURA`;
    });
  }

  // 10. Taco Bell Bong Soundboard Button
  initTacoBellButton() {
    const header = document.querySelector('.os-header-actions');
    if (header) {
      const tacoBtn = document.createElement('button');
      tacoBtn.className = 'boss-key-btn';
      tacoBtn.style.background = '#6b21a8';
      tacoBtn.innerText = '🔔 TACO BELL BONG';
      tacoBtn.addEventListener('click', () => {
        if (window.soundEngine) {
          window.soundEngine.init();
          window.soundEngine.soundEnabled = true;
          window.soundEngine.playTacoBell();
        }
        document.body.classList.add('earthquake');
        setTimeout(() => document.body.classList.remove('earthquake'), 400);
      });
      header.insertBefore(tacoBtn, header.firstChild);
    }
  }

  // 9. Typing Speedometer & Speeding Tickets
  initTypingSpeedometer() {
    let keyTimes = [];
    let ticketActive = false;

    window.addEventListener('keydown', (e) => {
      // Don't track if target isn't an input
      if (!e.target.matches('input, textarea') || ticketActive) return;

      const now = Date.now();
      keyTimes.push(now);
      keyTimes = keyTimes.filter(t => now - t < 1000);

      // If user types more than 7 characters in 1 second (~84 WPM)
      if (keyTimes.length >= 7) {
        ticketActive = true;
        keyTimes = [];
        if (window.soundEngine) window.soundEngine.playPoliceSiren();

        document.body.classList.add('police-sirens');

        const activeInput = e.target;
        activeInput.disabled = true;
        const oldVal = activeInput.value;
        activeInput.value = "🚨 KEYBOARD IMPOUNDED: SPEEDING IN RESIDENTIAL TEXT ZONE";

        this.deductAura(10000);

        setTimeout(() => {
          document.body.classList.remove('police-sirens');
          activeInput.disabled = false;
          activeInput.value = oldVal;
          ticketActive = false;
          alert("👮 COURT RULING: Your keyboard has been released on \$500 bail. Obey the 20 WPM speed limit.");
        }, 4000);
      }
    });
  }

  // 10. Mewing & Looksmaxxing Tracker
  initMewingWidget() {
    const mew = document.createElement('div');
    mew.className = 'mewing-floating-card';
    mew.innerHTML = `
      <div class="mew-title">🤫 MEWING & LOOKSMAXXING RADAR</div>
      <div class="mew-streak">Streak: <strong>69 Days</strong></div>
      <div class="mew-radar" id="mewRadar">Jawline Angle: 42° (Recessed)</div>
      <button class="action-btn gamble small-btn" id="looksmaxBtn" style="margin-top:6px; width:100%;">🗿 Looksmax (+10 Aura)</button>
    `;
    document.body.appendChild(mew);

    const btn = mew.querySelector('#looksmaxBtn');
    const radar = mew.querySelector('#mewRadar');
    const remarks = [
      "Negative Canthal Tilt detected! 💀",
      "Hunter Eyes calibrating...",
      "Chewing bone density pellets...",
      "Posture check: Sloth detected"
    ];

    btn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playMetalPipe();
      this.aura += 10;
      const scoreVal = document.getElementById('auraScoreVal');
      if (scoreVal) scoreVal.innerText = `${this.aura.toLocaleString()} AURA`;
      radar.innerText = remarks[Math.floor(Math.random() * remarks.length)];
      btn.innerText = "BYE BYE 🤫🧏‍♂️";
      setTimeout(() => btn.innerText = "🗿 Looksmax (+10 Aura)", 1500);
    });
  }

  // 11. Tactical Flashbang (Tinnitus Blinding Every 26 Seconds)
  initFlashbangFeature() {
    const flashBtn = document.createElement('button');
    flashBtn.className = 'flashbang-top-btn';
    flashBtn.innerHTML = '⚡ Flashbang Inbound: 26s';
    flashBtn.title = 'Manual trigger or wait for the 26s periodic cycle';

    const header = document.querySelector('.os-header-actions');
    if (header) {
      header.insertBefore(flashBtn, header.firstChild);
    }

    const executeFlashbang = (reason) => {
      if (window.soundEngine) {
        window.soundEngine.init();
        window.soundEngine.soundEnabled = true;
        window.soundEngine.playFlashbang();
      }

      const flashOverlay = document.createElement('div');
      flashOverlay.className = 'flashbang-screen-overlay';
      flashOverlay.innerHTML = `
        <div class="flashbang-banner">
          <h1>💥 TACTICAL FLASHBANG DETONATED</h1>
          <p>${reason || "Scheduled 26-second retinal realignment protocol."}</p>
        </div>
      `;
      document.body.appendChild(flashOverlay);

      this.deductAura(15000);

      if (window.bippy) {
        window.bippy.say("💥 FLASHBANG! Hope you weren't attached to your peripheral vision.");
      }

      setTimeout(() => {
        flashOverlay.style.opacity = '0';
      }, 500);

      setTimeout(() => {
        flashOverlay.remove();
      }, 3500);
    };

    flashBtn.addEventListener('click', () => {
      executeFlashbang("MANUAL OCULAR DETONATION (Self-Inflicted)");
    });

    // 26-Second Recurring Countdown Loop
    let countdown = 26;
    setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        countdown = 26;
        executeFlashbang("26-SECOND AUTOMATIC MANDATORY FLASHBANG");
      }
      flashBtn.innerHTML = `⚡ Flashbang In: ${countdown}s`;
      if (countdown <= 3) {
        flashBtn.style.background = '#ff0000';
        flashBtn.style.color = '#ffffff';
        flashBtn.style.animation = 'blink 0.2s infinite';
      } else {
        flashBtn.style.background = '#ffff00';
        flashBtn.style.color = '#000000';
        flashBtn.style.animation = '';
      }
    }, 1000);
  }

  // 12. Tertiary Stimulator: 8-Bit Peter Griffin Dancing Canvas
  createFamilyGuyCanvas() {
    const famBox = document.createElement('div');
    famBox.className = 'family-guy-widget-box';
    famBox.innerHTML = `
      <div class="parkour-header">
        <span>🕺 TERTIARY STIMULATOR: FAMILY GUY CLIP</span>
      </div>
      <canvas id="famCanvas" width="220" height="90"></canvas>
      <div class="parkour-caption">Attention retention at 300%. Dopamine max.</div>
    `;
    document.body.appendChild(famBox);

    const canvas = document.getElementById('famCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let frame = 0;
    function renderPeter() {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frame += 0.15;
      const bounce = Math.sin(frame) * 8;
      const legWobble = Math.cos(frame * 2) * 6;

      // Peter's shirt (white)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(95, 35 + bounce, 30, 25);

      // Green pants
      ctx.fillStyle = '#15803d';
      ctx.fillRect(95, 60 + bounce, 13 + legWobble, 20);
      ctx.fillRect(112, 60 + bounce, 13 - legWobble, 20);

      // Head & glasses
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(110, 24 + bounce, 14, 0, Math.PI * 2);
      ctx.fill();

      // Glasses
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(102, 20 + bounce, 6, 6);
      ctx.strokeRect(112, 20 + bounce, 6, 6);

      // Chin cleft
      ctx.fillStyle = '#000000';
      ctx.fillRect(109, 32 + bounce, 3, 3);

      requestAnimationFrame(renderPeter);
    }
    requestAnimationFrame(renderPeter);
  }

  // 13. Backspace Tax: Erasing Mistakes Costs 2,000 Aura
  initBackspaceTax() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (window.soundEngine) window.soundEngine.playMetalPipe();
        this.deductAura(2000);

        const alertBox = document.createElement('div');
        alertBox.className = 'backspace-tax-alert';
        alertBox.innerText = '💸 BACKSPACE TAX: -2,000 AURA (Stand by your typos)';
        document.body.appendChild(alertBox);

        setTimeout(() => alertBox.remove(), 1000);
      }
    });
  }

  // 14. Auto-Rizzifier Autocorrect
  initAutoRizzAutocorrect() {
    const replacements = {
      'the': 'da',
      'good': 'sigma',
      'bad': 'skibidi',
      'work': 'fanum-tax',
      'money': 'v-bucks',
      'person': 'NPC',
      'hello': 'yo chat',
      'help': 'mewing streak',
      'yes': 'on god',
      'no': 'cap'
    };

    window.addEventListener('input', (e) => {
      if (!e.target.matches('input[type="text"], textarea')) return;
      if (e.data === ' ') {
        // When space is pressed, check last word
        const words = e.target.value.split(' ');
        if (words.length > 1) {
          const lastWord = words[words.length - 2].toLowerCase();
          if (replacements[lastWord]) {
            words[words.length - 2] = replacements[lastWord];
            e.target.value = words.join(' ');
            if (window.soundEngine) window.soundEngine.playBoing();
          }
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.brainrot = new BrainrotEngine();
});
