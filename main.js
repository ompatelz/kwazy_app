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

  // 4. Draggable and Minimizable Windows System
  let highestZ = 100;

  function initDraggableWindows() {
    const panels = document.querySelectorAll('.win-panel');

    panels.forEach((panel) => {
      const header = panel.querySelector('.panel-header');
      if (!header) return;

      // Ensure header actions exist
      let actions = header.querySelector('.panel-header-actions');
      if (!actions) {
        actions = document.createElement('div');
        actions.className = 'panel-header-actions';
        actions.innerHTML = `
          <button type="button" class="panel-win-btn minimize" title="Minimize Window">_</button>
          <button type="button" class="panel-win-btn maximize" title="Maximize Window">🗖</button>
          <button type="button" class="panel-win-btn close" title="Close Window">✕</button>
        `;
        header.appendChild(actions);
      }

      const minBtn = actions.querySelector('.panel-win-btn.minimize');
      const maxBtn = actions.querySelector('.panel-win-btn.maximize');
      const closeBtn = actions.querySelector('.panel-win-btn.close');

      // Toggle minimize helper
      function toggleMinimize(e) {
        if (e) e.stopPropagation();
        const isMin = panel.classList.toggle('is-minimized');
        if (isMin) {
          if (panel.classList.contains('is-maximized')) {
            panel.classList.remove('is-maximized');
            if (maxBtn) maxBtn.innerText = '🗖';
          }
          if (minBtn) {
            minBtn.innerText = '🗗';
            minBtn.title = 'Restore Window';
          }
          if (window.soundEngine) window.soundEngine.playBoing();
        } else {
          if (minBtn) {
            minBtn.innerText = '_';
            minBtn.title = 'Minimize Window';
          }
          if (window.soundEngine) window.soundEngine.playDing();
        }
      }

      // Toggle maximize helper
      function toggleMaximize(e) {
        if (e) e.stopPropagation();
        if (panel.classList.contains('is-minimized')) {
          panel.classList.remove('is-minimized');
          if (minBtn) minBtn.innerText = '_';
        }
        const isMax = panel.classList.toggle('is-maximized');
        if (isMax) {
          if (maxBtn) {
            maxBtn.innerText = '🗗';
            maxBtn.title = 'Restore Down';
          }
          if (window.soundEngine) window.soundEngine.playDing();
        } else {
          if (maxBtn) {
            maxBtn.innerText = '🗖';
            maxBtn.title = 'Maximize Window';
          }
          if (window.soundEngine) window.soundEngine.playBoing();
        }
      }

      if (minBtn) {
        minBtn.addEventListener('click', toggleMinimize);
      }

      if (maxBtn) {
        maxBtn.addEventListener('click', toggleMaximize);
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (window.soundEngine) window.soundEngine.playBuzzer();
          alert("❌ Access Denied: AntiOS strictly forbids window closing. Minimizing to background instead.");
          toggleMinimize();
        });
      }

      // Double-click on header to toggle minimize/restore
      header.addEventListener('dblclick', (e) => {
        if (e.target.closest('button, input, select, textarea, a')) return;
        toggleMinimize(e);
      });

      // Bring to front on mousedown
      panel.addEventListener('mousedown', () => {
        highestZ += 2;
        panel.style.zIndex = highestZ;
      });

      // Dragging logic
      let isDragging = false;
      let startPointerX = 0;
      let startPointerY = 0;
      let startPanelX = 0;
      let startPanelY = 0;

      function onPointerDown(e) {
        if (e.button !== undefined && e.button !== 0) return;
        if (e.target.closest('button, input, select, textarea, a, .panel-win-btn')) return;
        if (panel.classList.contains('is-maximized')) return;

        isDragging = true;
        panel.classList.add('is-dragging');
        highestZ += 2;
        panel.style.zIndex = highestZ;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        startPointerX = clientX;
        startPointerY = clientY;

        startPanelX = parseFloat(panel.dataset.x || 0);
        startPanelY = parseFloat(panel.dataset.y || 0);

        window.addEventListener('mousemove', onPointerMove, { passive: false });
        window.addEventListener('mouseup', onPointerUp);
        window.addEventListener('touchmove', onPointerMove, { passive: false });
        window.addEventListener('touchend', onPointerUp);
        window.addEventListener('touchcancel', onPointerUp);
        e.preventDefault();
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const dx = clientX - startPointerX;
        const dy = clientY - startPointerY;

        const newX = startPanelX + dx;
        const newY = startPanelY + dy;

        panel.dataset.x = newX;
        panel.dataset.y = newY;
        panel.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }

      function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        panel.classList.remove('is-dragging');

        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerUp);
        window.removeEventListener('touchcancel', onPointerUp);

        if (window.soundEngine) window.soundEngine.playClick();
      }

      header.addEventListener('mousedown', onPointerDown);
      header.addEventListener('touchstart', onPointerDown, { passive: false });
    });
  }

  initDraggableWindows();

  // Top OS Bar controls
  const minimizeBtn = document.getElementById('minimizeBtn');
  const maximizeBtn = document.getElementById('maximizeBtn');
  const closeWinBtn = document.getElementById('closeWinBtn');

  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBoing();
      const activePanel = document.querySelector('.app-tab.active .win-panel');
      if (activePanel) {
        const minBtn = activePanel.querySelector('.panel-win-btn.minimize');
        if (minBtn) {
          minBtn.click();
        } else {
          activePanel.classList.toggle('is-minimized');
        }
      }
    });
  }

  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playDing();
      const activePanel = document.querySelector('.app-tab.active .win-panel');
      if (activePanel) {
        const maxBtn = activePanel.querySelector('.panel-win-btn.maximize');
        if (maxBtn) {
          maxBtn.click();
        } else {
          activePanel.classList.toggle('is-maximized');
        }
      }
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
