// =========================================================
// Hostile Form & Registration Engine
// Impossible validation, physics runaway buttons, existential captchas
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hostile Name Input: Deletes every 3rd character and adds typo
  const nameInput = document.getElementById('nameDisplay');
  const nameHint = document.getElementById('nameHint');
  let nameKeystrokes = 0;

  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      nameKeystrokes++;
      if (window.soundEngine) window.soundEngine.playClick();
      
      if (nameKeystrokes % 3 === 0 && nameInput.value.length > 1) {
        // Delete a letter or replace with a glyph
        const val = nameInput.value;
        nameInput.value = val.slice(0, -1);
        nameHint.innerText = `⚠️ Character budget exceeded! Letter evaporated. (${nameInput.value.length} chars)`;
        if (window.soundEngine) window.soundEngine.playBuzzer();
      } else {
        nameHint.innerText = `${nameInput.value.length} characters (Tax penalty: \$${(nameInput.value.length * 1.5).toFixed(2)})`;
      }
    });
  }

  // 2. Phone Number Slider (10 digits from 1000000000 to 9999999999)
  const phoneSlider = document.getElementById('phoneSlider');
  const phoneDisplay = document.getElementById('phoneDisplay');

  if (phoneSlider && phoneDisplay) {
    phoneSlider.addEventListener('input', () => {
      const val = phoneSlider.value.toString().padStart(10, '0');
      const formatted = `+1 (${val.substring(0,3)}) ${val.substring(3,6)}-${val.substring(6,10)}`;
      phoneDisplay.innerText = formatted;
      if (window.soundEngine) window.soundEngine.playDialUpBaud();
    });
  }

  // 3. Age Picker (Increments by 1.7, decrements by 3.5, or Roulette)
  const ageDisplay = document.getElementById('ageDisplay');
  const decBtn = document.getElementById('ageDecrementBtn');
  const incBtn = document.getElementById('ageIncrementBtn');
  const randBtn = document.getElementById('ageRandomBtn');
  let currentAge = 24.5;

  if (ageDisplay) {
    decBtn.addEventListener('click', () => {
      currentAge = Math.max(0.1, currentAge - 3.5);
      ageDisplay.innerText = currentAge.toFixed(2);
      if (window.soundEngine) window.soundEngine.playBoing();
    });

    incBtn.addEventListener('click', () => {
      currentAge += 1.7;
      ageDisplay.innerText = currentAge.toFixed(2);
      if (window.soundEngine) window.soundEngine.playBoing();
    });

    randBtn.addEventListener('click', () => {
      currentAge = (Math.random() * 120).toFixed(2);
      ageDisplay.innerText = currentAge;
      if (window.soundEngine) window.soundEngine.playBuzzer();
      if (window.bippy) window.bippy.say(`You are now legally ${currentAge} years old. Hope you enjoy your retirement/diapers.`);
    });
  }

  // 4. Impossible Password Engine
  const passInput = document.getElementById('passwordInput');
  const strengthBar = document.getElementById('passwordStrengthBar');
  const strengthLabel = document.getElementById('passwordStrengthLabel');
  const togglePassBtn = document.getElementById('togglePasswordBtn');

  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      passInput.type = passInput.type === 'password' ? 'text' : 'password';
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  const griefEmojis = ['😡', '😭', '😐', '💔', '💀', '😱', '😫', '🪦'];

  if (passInput) {
    passInput.addEventListener('input', () => {
      const val = passInput.value;
      if (window.soundEngine) window.soundEngine.playClick();

      // Rule 1: Length >= 14
      const ruleLen = val.length >= 14;
      updateRule('rule-len', ruleLen);

      // Rule 2: Prime numbers count >= 2
      const digits = val.match(/\d/g) || [];
      const primeMatches = digits.filter(d => primes.includes(parseInt(d, 10)));
      const rulePrime = primeMatches.length >= 2;
      updateRule('rule-prime', rulePrime);

      // Rule 3: Roman numerals XLII (case-insensitive)
      const ruleRoman = /xlii/i.test(val);
      updateRule('rule-roman', ruleRoman);

      // Rule 4: Grief Emoji
      const ruleGrief = griefEmojis.some(e => val.includes(e));
      updateRule('rule-grief', ruleGrief);

      // Rule 5: NO consecutive vowels
      const hasConsecVowels = /[aeiou]{2}/i.test(val);
      const ruleNoVowels = val.length > 0 && !hasConsecVowels;
      updateRule('rule-no-vowels', ruleNoVowels);

      // Rule 6: Byzantine emperor Justinian or Belisarius
      const ruleByzantine = /justinian|belisarius/i.test(val);
      updateRule('rule-byzantine', ruleByzantine);

      // Calculate strength (inversely proportional or chaotic)
      const passedCount = [ruleLen, rulePrime, ruleRoman, ruleGrief, ruleNoVowels, ruleByzantine].filter(Boolean).length;
      const pct = Math.round((passedCount / 6) * 100);

      strengthBar.style.width = `${pct}%`;
      if (pct === 100) {
        strengthBar.style.background = '#28a745';
        strengthLabel.innerText = "Strength: UNNATURAL GENIUS (100%)";
      } else if (pct > 50) {
        strengthBar.style.background = '#ffc107';
        strengthLabel.innerText = `Strength: Marginally Tolerable (${pct}%)`;
      } else {
        strengthBar.style.background = '#dc3545';
        strengthLabel.innerText = `Strength: Catastrophically Fragile (${pct}%)`;
      }
    });
  }

  function updateRule(elemId, isValid) {
    const el = document.getElementById(elemId);
    if (!el) return;
    if (isValid) {
      el.className = 'valid';
      el.innerText = el.innerText.replace('❌', '✅');
    } else {
      el.className = 'invalid';
      el.innerText = el.innerText.replace('✅', '❌');
    }
  }

  // 5. Terms of Service Scroll Unlock
  const tosScroll = document.getElementById('tosScrollArea');
  const tosCheckbox = document.getElementById('tosCheckbox');
  const tosLabel = document.getElementById('tosLabelText');

  if (tosScroll && tosCheckbox) {
    tosScroll.addEventListener('scroll', () => {
      const scrollPos = tosScroll.scrollTop + tosScroll.clientHeight;
      const scrollHeight = tosScroll.scrollHeight;
      
      if (scrollPos >= scrollHeight - 10) {
        tosCheckbox.disabled = false;
        tosLabel.innerText = "✅ I solemnly surrender all rights under clause 78-B";
        tosLabel.style.color = "#28a745";
        tosLabel.style.fontWeight = "bold";
      }
    });

    tosCheckbox.addEventListener('change', () => {
      if (tosCheckbox.checked) {
        if (window.soundEngine) window.soundEngine.playSuccess();
        // Spontaneous unchecking after 4 seconds to be obnoxious
        setTimeout(() => {
          if (tosCheckbox.checked) {
            tosCheckbox.checked = false;
            tosLabel.innerText = "⚠️ Session timeout! Terms unsigned due to idle hesitation.";
            if (window.soundEngine) window.soundEngine.playBuzzer();
          }
        }, 5000);
      }
    });
  }

  // 6. The Evasive / Runaway Submit Button
  const runawayBtn = document.getElementById('runawayBtn');
  const arena = document.getElementById('submitArena');

  if (runawayBtn && arena) {
    arena.addEventListener('mousemove', (e) => {
      const arenaRect = arena.getBoundingClientRect();
      const mouseX = e.clientX - arenaRect.left;
      const mouseY = e.clientY - arenaRect.top;

      const btnRect = runawayBtn.getBoundingClientRect();
      const btnX = (btnRect.left - arenaRect.left) + btnRect.width / 2;
      const btnY = (btnRect.top - arenaRect.top) + btnRect.height / 2;

      const dist = Math.hypot(mouseX - btnX, mouseY - btnY);

      // If mouse is within 110px, sprint away
      if (dist < 110) {
        if (window.soundEngine) window.soundEngine.playEvade();

        const angle = Math.atan2(btnY - mouseY, btnX - mouseX);
        let newX = btnX + Math.cos(angle) * 130 - btnRect.width / 2;
        let newY = btnY + Math.sin(angle) * 130 - btnRect.height / 2;

        // Keep inside arena borders with padding
        const maxX = arenaRect.width - btnRect.width - 10;
        const maxY = arenaRect.height - btnRect.height - 10;

        if (newX < 10) newX = maxX - 20;
        if (newX > maxX) newX = 20;
        if (newY < 10) newY = maxY - 20;
        if (newY > maxY) newY = 20;

        runawayBtn.style.left = `${newX}px`;
        runawayBtn.style.top = `${newY}px`;

        const taunts = ["NOPE", "TRY HARDER", "TOO SLOW", "ALMOST!", "ACCESS DENIED", "NICE REFLEXES"];
        runawayBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];
      }
    });

    // If user somehow clicks it (e.g. keyboard navigation or insane twitch speed)
    runawayBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playSuccess();
      openCaptchaModal();
    });
  }

  // 7. Existential Captcha Modal Logic
  const captchaModal = document.getElementById('captchaModal');
  const captchaGrid = document.getElementById('captchaGrid');
  const verifyCaptchaBtn = document.getElementById('verifyCaptchaBtn');
  const reloadCaptchaBtn = document.getElementById('reloadCaptchaBtn');
  const closeCaptchaBtn = document.getElementById('closeCaptchaBtn');
  const captchaTimerText = document.getElementById('captchaTimerText');

  const existentialPrompts = [
    { text: "Select all tiles with: 'Mild Disappointment'", targetCategory: 'sad' },
    { text: "Select all tiles with: 'Pointless Bureaucracy'", targetCategory: 'gov' },
    { text: "Select all tiles depicting: 'Unfounded Confidence'", targetCategory: 'ego' }
  ];

  const tilesData = [
    { icon: '🥦', label: 'Cold Broccoli', cat: 'sad' },
    { icon: '📉', label: 'Crypto Portfolio', cat: 'sad' },
    { icon: '📄', label: 'Form 1040-EZ', cat: 'gov' },
    { icon: '👔', label: 'LinkedIn Guru', cat: 'ego' },
    { icon: '🖨️', label: 'Paper Jam Error', cat: 'gov' },
    { icon: '😎', label: 'Unskilled Confidence', cat: 'ego' },
    { icon: '🌧️', label: 'Cancelled Picnic', cat: 'sad' },
    { icon: '🗄️', label: 'Cabinet of Red Tape', cat: 'gov' },
    { icon: '🏆', label: 'Participation Ribbon', cat: 'ego' }
  ];

  let captchaTimerInterval = null;

  window.openCaptchaModal = function() {
    captchaModal.classList.remove('hidden');
    renderCaptchaGrid();
    startCaptchaCountdown();
  };

  function renderCaptchaGrid() {
    captchaGrid.innerHTML = '';
    const shuffled = [...tilesData].sort(() => 0.5 - Math.random());
    shuffled.forEach(item => {
      const tile = document.createElement('div');
      tile.className = 'captcha-tile';
      tile.innerHTML = `<span class="tile-icon">${item.icon}</span><span class="tile-text">${item.label}</span>`;
      tile.addEventListener('click', () => {
        tile.classList.toggle('selected');
        if (window.soundEngine) window.soundEngine.playClick();
      });
      captchaGrid.appendChild(tile);
    });
  }

  function startCaptchaCountdown() {
    let seconds = 7;
    captchaTimerText.innerText = `0:0${seconds}`;
    if (captchaTimerInterval) clearInterval(captchaTimerInterval);

    captchaTimerInterval = setInterval(() => {
      seconds--;
      captchaTimerText.innerText = `0:0${seconds}`;
      if (seconds <= 0) {
        clearInterval(captchaTimerInterval);
        if (window.soundEngine) window.soundEngine.playBuzzer();
        alert("🚨 VERIFICATION TIMEOUT: You hesitated for more than 7 seconds. Humanity revoked. Refreshing captcha...");
        renderCaptchaGrid();
        startCaptchaCountdown();
      }
    }, 1000);
  }

  if (verifyCaptchaBtn) {
    verifyCaptchaBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBuzzer();
      alert("❌ VERIFICATION REJECTED: Your existential despair did not reach the threshold of 94.2%. Try again.");
      renderCaptchaGrid();
      startCaptchaCountdown();
    });
  }

  if (reloadCaptchaBtn) {
    reloadCaptchaBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBoing();
      renderCaptchaGrid();
      startCaptchaCountdown();
    });
  }

  if (closeCaptchaBtn) {
    closeCaptchaBtn.addEventListener('click', () => {
      captchaModal.classList.add('hidden');
      if (captchaTimerInterval) clearInterval(captchaTimerInterval);
    });
  }
});
