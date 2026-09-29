// =========================================================
// AntiOS Main Desktop Orchestrator
// Tabs, Boss Key, Themes, Hostile Settings, Cookie Hostage
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Sound Toggle
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const isEnabled = window.soundEngine.toggleSound();
      if (isEnabled) {
        soundToggleBtn.innerText = "🔊 Sound: ON (Suffering)";
        soundToggleBtn.classList.add('active');
      } else {
        soundToggleBtn.innerText = "🔇 Sound: OFF";
        soundToggleBtn.classList.remove('active');
      }
    });
  }

  // 2. Navigation Tabs
  const navTabs = document.querySelectorAll('.nav-tab[data-tab]');
  const appTabs = document.querySelectorAll('.app-tab');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      navTabs.forEach(t => t.classList.remove('active'));
      appTabs.forEach(a => a.classList.remove('active'));

      tab.classList.add('active');
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.add('active');

      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  // 3. Boss Key (Fake Excel Mode)
  const bossOverlay = document.getElementById('bossOverlay');
  const bossKeyBtn = document.getElementById('bossKeyBtn');

  function toggleBossKey() {
    if (bossOverlay.classList.contains('hidden')) {
      bossOverlay.classList.remove('hidden');
    } else {
      bossOverlay.classList.add('hidden');
    }
  }

  if (bossKeyBtn) bossKeyBtn.addEventListener('click', toggleBossKey);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleBossKey();
    }
  });

  // 4. Window Minimise/Close buttons
  const minimizeBtn = document.getElementById('minimizeBtn');
  const maximizeBtn = document.getElementById('maximizeBtn');
  const closeWinBtn = document.getElementById('closeWinBtn');

  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBoing();
      document.body.style.transform = 'scale(0.85)';
      setTimeout(() => document.body.style.transform = '', 1000);
    });
  }

  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playDing();
      document.body.style.transform = 'scale(1.1)';
      setTimeout(() => document.body.style.transform = '', 1000);
    });
  }

  if (closeWinBtn) {
    closeWinBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBuzzer();
      alert("❌ You cannot close AntiOS. AntiOS closes you.");
    });
  }

  // 5. Themes Selection
  const themeBtns = document.querySelectorAll('.theme-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      document.body.className = theme;
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (window.soundEngine) window.soundEngine.playSuccess();
    });
  });

  // 6. Kinetic Screen Tilt on Mouse Move
  const tiltToggle = document.getElementById('screenTiltToggle');
  window.addEventListener('mousemove', (e) => {
    if (tiltToggle && tiltToggle.checked) {
      const cx = window.innerWidth / 2;
      const tilt = ((e.clientX - cx) / cx) * 5; // -5 to +5 deg
      document.body.style.setProperty('--tilt-angle', `${tilt.toFixed(2)}deg`);
      document.body.classList.add('screen-tilting');
    } else {
      document.body.classList.remove('screen-tilting');
    }
  });

  // 7. Micro-Tremor Typing Earthquake
  const jitterToggle = document.getElementById('jitterToggle');
  window.addEventListener('keydown', () => {
    if (jitterToggle && jitterToggle.checked) {
      document.body.classList.add('earthquake');
      setTimeout(() => document.body.classList.remove('earthquake'), 120);
    }
  });

  // 8. Hostile Volume Calibration
  const hostileVol = document.getElementById('hostileVolume');
  const volDisplay = document.getElementById('volDisplay');
  const testToneBtn = document.getElementById('testToneBtn');

  if (hostileVol && volDisplay) {
    hostileVol.addEventListener('input', () => {
      const val = parseInt(hostileVol.value, 10);
      // Inverted logic: 50 is loudest, 0 and 100 are still loud
      const effectiveDb = 100 + Math.abs(50 - val);
      volDisplay.innerText = `Actual Volume: ${effectiveDb}dB (Ear drum damage imminent)`;
      if (window.soundEngine) window.soundEngine.playDialUpBaud();
    });
  }

  if (testToneBtn) {
    testToneBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        window.soundEngine.init();
        window.soundEngine.soundEnabled = true;
        soundToggleBtn.innerText = "🔊 Sound: ON (Suffering)";
        soundToggleBtn.classList.add('active');
        window.soundEngine.playBuzzer();
      }
    });
  }

  // 9. Download More Virtual RAM
  const downloadRamBtn = document.getElementById('downloadRamBtn');
  const ramProgress = document.getElementById('ramProgress');
  const ramStatus = document.getElementById('ramStatusText');

  if (downloadRamBtn) {
    downloadRamBtn.addEventListener('click', () => {
      let pct = 32;
      downloadRamBtn.disabled = true;
      if (window.soundEngine) window.soundEngine.playDialUpBaud();

      const ramInt = setInterval(() => {
        pct += 9;
        if (pct >= 99) {
          clearInterval(ramInt);
          pct = 99;
          ramProgress.style.width = '99%';
          ramStatus.innerText = 'Virtual RAM Downloaded: 99% — CRITICAL ERROR: Insufficient Floppy Disk Space.';
          if (window.soundEngine) window.soundEngine.playBuzzer();
          alert("💥 RAM DOWNLOAD FAILED: Please insert 3.5-inch Diskette #42 into your USB port.");
          downloadRamBtn.disabled = false;
        } else {
          ramProgress.style.width = `${pct}%`;
          ramStatus.innerText = `Virtual RAM Downloaded: ${pct}% (${Math.round(pct * 0.64)}KB / 64KB)`;
        }
      }, 250);
    });
  }

  // 10. Cookie Hostage Banner Logic
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookies = document.getElementById('acceptAllCookiesBtn');
  const customCookies = document.getElementById('customCookieBtn');
  const rejectCookies = document.getElementById('rejectCookiesBtn');

  if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playSuccess();
      cookieBanner.style.display = 'none';
      if (window.bippy) window.bippy.say("Thank you for accepting all 5,491 cookies! We have notified your local advertisers.");
    });
  }

  if (customCookies) {
    customCookies.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBoing();
      alert("Opening individual consent preferences for partner #1 of 5,491: 'AdTrack Global LLC'...");
      alert("Please wait 45 minutes for partner list to synchronize over dial-up.");
    });
  }

  if (rejectCookies) {
    rejectCookies.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBuzzer();
      const guilt = confirm("😢 Grandma spent all morning baking these tracking cookies. Are you sure you want to break grandma's heart?");
      if (!guilt) {
        cookieBanner.style.display = 'none';
      } else {
        alert("Grandma is weeping. Cookie acceptance reinstated automatically.");
        cookieBanner.style.display = 'none';
      }
    });
  }
});
