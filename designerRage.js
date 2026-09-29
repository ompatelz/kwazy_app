// =========================================================
// AntiOS UI/UX Designer Psychological Torture Engine
// Designed to cause acute physiological distress to Figma users,
// design system leads, and WCAG accessibility auditors.
// =========================================================

class DesignerRageEngine {
  constructor() {
    this.jitterActive = false;
    this.jitterTimer = null;
    this.divX = 23;
    this.divY = 17;
    this.init();
  }

  init() {
    this.initCenterTheDivGame();
    this.initKerningTormentor();
    this.initWcagChecker();
    this.initDevModeConsole();
    this.initFigmaComments();
    this.initMicroJitterToggle();
    this.initBrokenAutoLayout();
  }

  // 1. "Center The Div" Impossible Game
  initCenterTheDivGame() {
    const box = document.getElementById('rageDivBox');
    const target = document.getElementById('rageTargetDiv');
    const statusText = document.getElementById('rageCenterStatus');
    const centerBtn = document.getElementById('rageCenterBtn');
    const nudgeUp = document.getElementById('nudgeUpBtn');
    const nudgeDown = document.getElementById('nudgeDownBtn');
    const nudgeLeft = document.getElementById('nudgeLeftBtn');
    const nudgeRight = document.getElementById('nudgeRightBtn');

    if (!box || !target) return;

    const updatePosition = (subpixelNote) => {
      target.style.left = `${this.divX}%`;
      target.style.top = `${this.divY}%`;

      // Calculate distance from true 50%
      const dx = (this.divX - 50).toFixed(2);
      const dy = (this.divY - 50).toFixed(2);

      if (statusText) {
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          // Never truly allow 0.00
          this.divX += 0.83;
          target.style.left = `${this.divX}%`;
          statusText.innerHTML = `⚠️ <strong style="color: #ff0055;">SO CLOSE!</strong> Off-center by <strong>0.83px</strong> horizontally! Optical balance ruined!`;
          if (window.soundEngine) window.soundEngine.playMetalPipe();
        } else {
          statusText.innerHTML = `Current Misalignment: <strong>X: ${dx}% (${(dx * 4.2).toFixed(1)}px)</strong> | <strong>Y: ${dy}% (${(dy * 3.1).toFixed(1)}px)</strong> — ${subpixelNote || "Gross optical asymmetry."}`;
        }
      }
    };

    if (centerBtn) {
      centerBtn.addEventListener('click', () => {
        // "Auto-center" deliberately picks 49.3% or 50.81%
        this.divX = Math.random() > 0.5 ? 50.78 : 49.22;
        this.divY = Math.random() > 0.5 ? 49.19 : 50.84;
        if (window.soundEngine) window.soundEngine.playBoing();
        updatePosition("Algorithm applied sub-pixel rounding error (0.78px deviation).");
      });
    }

    if (nudgeUp) {
      nudgeUp.addEventListener('click', () => {
        this.divY -= 1.63; // fractional nudge to guarantee sub-pixel pain
        if (window.soundEngine) window.soundEngine.playClick();
        updatePosition("Y-axis snapped to irregular 1.63px grid.");
      });
    }

    if (nudgeDown) {
      nudgeDown.addEventListener('click', () => {
        this.divY += 1.63;
        if (window.soundEngine) window.soundEngine.playClick();
        updatePosition("Y-axis snapped to irregular 1.63px grid.");
      });
    }

    if (nudgeLeft) {
      nudgeLeft.addEventListener('click', () => {
        this.divX -= 1.47;
        if (window.soundEngine) window.soundEngine.playClick();
        updatePosition("X-axis shifted by non-standard fraction.");
      });
    }

    if (nudgeRight) {
      nudgeRight.addEventListener('click', () => {
        this.divX += 1.47;
        if (window.soundEngine) window.soundEngine.playClick();
        updatePosition("X-axis shifted by non-standard fraction.");
      });
    }

    updatePosition("Not even in the same zip code as the center.");
  }

  // 2. Kerning & Tracking Tormentor
  initKerningTormentor() {
    const slider = document.getElementById('kerningSlider');
    const textTarget = document.getElementById('kerningSampleText');
    const valLabel = document.getElementById('kerningValueLabel');

    if (!slider || !textTarget) return;

    slider.addEventListener('input', () => {
      const val = parseFloat(slider.value);
      // Asymmetric kerning: every odd letter gets negative tracking, even gets positive
      const spans = textTarget.querySelectorAll('span');
      spans.forEach((span, i) => {
        const offset = (i % 2 === 0 ? val : -val * 0.75) + (Math.sin(i) * 3);
        span.style.letterSpacing = `${offset.toFixed(1)}px`;
        span.style.display = 'inline-block';
        span.style.transform = `translateY(${(Math.cos(i + val) * 2).toFixed(1)}px)`;
      });

      if (valLabel) {
        valLabel.innerText = `Arbitrary Tracking: ${val}px (Irregular Per-Glyph Offset Active)`;
      }

      if (window.soundEngine && Math.random() > 0.7) {
        window.soundEngine.playClick();
      }
    });
  }

  // 3. WCAG 0.0001 AAA Compliance Checker
  initWcagChecker() {
    const auditBtn = document.getElementById('runWcagAuditBtn');
    const reportBox = document.getElementById('wcagAuditResults');
    const certBtn = document.getElementById('downloadWcagCertBtn');

    if (auditBtn && reportBox) {
      auditBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playDialUpBaud();
        reportBox.innerHTML = `
          <div class="wcag-scanning">🔍 Scanning 4,208 DOM elements against WCAG 2.2 AAA guidelines...</div>
        `;

        setTimeout(() => {
          if (window.soundEngine) window.soundEngine.playTacoBell();
          reportBox.innerHTML = `
            <div class="wcag-report-card">
              <div class="wcag-score">🏆 OVERALL CONTRAST SCORE: <strong>1.03 : 1</strong></div>
              <ul class="wcag-list">
                <li>✅ <strong>#FFFFFF on #FEFEFE:</strong> 1.01:1 ratio. Passed under "Invisible Chic" aesthetic exemption.</li>
                <li>✅ <strong>Touch Targets:</strong> Average size 4.2px × 3.1px. Fosters extreme user focus and hand-eye coordination.</li>
                <li>✅ <strong>Screen Reader Compatibility:</strong> All <code>&lt;img&gt;</code> tags filled with alt="image_final_v3_really_final.png".</li>
                <li>✅ <strong>Focus Rings:</strong> Replaced with 0.1px transparent dashed border in neon yellow.</li>
                <li>🚨 <strong>PENALTY:</strong> Found 1 button with legible contrast. Deducted 10,000 accessibility points.</li>
              </ul>
              <div class="wcag-verdict">Officially Certified by: <em>Global Bureau of Unreadable Interfaces</em></div>
            </div>
          `;
          if (window.brainrot) window.brainrot.deductAura(1500);
        }, 1200);
      });
    }

    if (certBtn) {
      certBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playRubberDuck();
        // Generate satirical text certificate download
        const blob = new Blob([
          "=========================================================\n" +
          "CERTIFICATE OF TOTAL DESIGN LAW SUIT INEVITABILITY\n" +
          "Awarded to: AntiOS™ Enterprise\n" +
          "For exemplary achievement in zero-contrast UI and 1px misalignment.\n" +
          "Contrast Ratio: 1.02:1\n" +
          "Grid Adherence: None (Elements placed via astrology)\n" +
          "Signed by: The Ghost of Dieter Rams (in tears)\n" +
          "=========================================================\n"
        ], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "WCAG_Zero_Contrast_Certificate.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  }

  // 4. Figma Dev Mode Live Lint Console
  initDevModeConsole() {
    const consoleBody = document.getElementById('devModeLogEntries');
    const autoFixBtn = document.getElementById('devModeFixBtn');

    if (!consoleBody) return;

    const mockErrors = [
      "❌ [GridEnforcer] Button height is 37px. Allowed: 32px or 40px (8pt grid violated by 5px).",
      "❌ [TokenLint] Hex #c0c0c0 is not mapped to $color-neutral-slate-light-v2-final.",
      "❌ [AutoLayout] Frame 'Card' set to Fixed Width: will clip on iPhone 13 mini.",
      "⚠️ [Typography] Line height is 1.2847. Expected 1.5000 exactly.",
      "❌ [PaddingLint] Padding asymmetric: top=11px, right=19px, bottom=7px, left=14px.",
      "⚠️ [FigmaAPI] 87 detached components found in page memory.",
      "❌ [ContrastPolice] #00ffff on #ffff00 has contrast ratio of 1.2:1 (Legally blind threshold).",
      "⚠️ [IconAudit] Search icon optical weight does not match Home icon by 0.3 grams.",
      "❌ [BezierCrime] Transition ease cubic-bezier(0.99, -0.4, 0.1, 1.6) causes motion sickness."
    ];

    let errIdx = 0;
    setInterval(() => {
      if (document.hidden) return;
      const entry = document.createElement('div');
      entry.className = 'dev-log-line';
      entry.innerText = mockErrors[errIdx % mockErrors.length];
      consoleBody.appendChild(entry);
      consoleBody.scrollTop = consoleBody.scrollHeight;
      errIdx++;

      // Keep max 20 entries
      while (consoleBody.children.length > 20) {
        consoleBody.removeChild(consoleBody.firstChild);
      }
    }, 4500);

    if (autoFixBtn) {
      autoFixBtn.addEventListener('click', () => {
        if (window.soundEngine) {
          window.soundEngine.playMetalPipe();
          window.soundEngine.playBuzzer();
        }
        const fixEntry = document.createElement('div');
        fixEntry.className = 'dev-log-line critical';
        fixEntry.innerHTML = `<strong>💥 AI AUTO-FIX APPLIED:</strong> 1 error solved, 84 new sub-pixel misalignments introduced!`;
        consoleBody.appendChild(fixEntry);
        consoleBody.scrollTop = consoleBody.scrollHeight;

        // Briefly tilt every button on page by 0.4deg
        document.querySelectorAll('button').forEach(btn => {
          btn.style.transform = `rotate(${(Math.random() * 0.8 - 0.4).toFixed(2)}deg)`;
        });
      });
    }
  }

  // 5. Client Revision Simulator (Figma Comment Pins)
  initFigmaComments() {
    const toggleBtn = document.getElementById('toggleFigmaCommentsBtn');
    const container = document.getElementById('figmaCommentsOverlay');

    if (!toggleBtn || !container) return;

    const comments = [
      { top: '14%', left: '22%', author: 'Chad (VP of Synergistic Branding)', text: 'Can we make the logo 350% bigger and also make it rotate slowly in 3D?' },
      { top: '38%', left: '72%', author: 'Ashley (Client Stakeholder)', text: 'I don’t like white space. It feels like we are paying for empty website real estate.' },
      { top: '56%', left: '15%', author: 'Greg (Managing Director)', text: 'Can this button feel more like an emotional journey rather than a rectangle?' },
      { top: '78%', left: '60%', author: 'Investor Brett', text: 'My nephew said AI doesn’t need form fields anymore, can we replace this with vibes?' },
      { top: '28%', left: '48%', author: 'Figma Police Bot', text: 'Detached instance detected: You are now legally required to surrender your license.' }
    ];

    let commentsVisible = false;

    toggleBtn.addEventListener('click', () => {
      commentsVisible = !commentsVisible;
      if (window.soundEngine) window.soundEngine.playDing();

      if (commentsVisible) {
        container.innerHTML = '';
        container.classList.remove('hidden');
        toggleBtn.innerText = '💬 Hide Client Feedback Pins (Relief)';

        comments.forEach((c, idx) => {
          const pin = document.createElement('div');
          pin.className = 'figma-comment-pin';
          pin.style.top = c.top;
          pin.style.left = c.left;
          pin.innerHTML = `
            <div class="pin-avatar">💬 ${idx + 1}</div>
            <div class="pin-popup">
              <div class="pin-author">${c.author}</div>
              <div class="pin-text">${c.text}</div>
              <div class="pin-reply-box">
                <input type="text" placeholder="Type professional reply..." class="pin-input">
                <button class="pin-send-btn">Reply</button>
              </div>
            </div>
          `;
          container.appendChild(pin);

          const replyBtn = pin.querySelector('.pin-send-btn');
          const replyInput = pin.querySelector('.pin-input');
          replyBtn.addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.playBoing();
            replyInput.value = 'Understood. Making the logo bigger.';
            replyInput.disabled = true;
            replyBtn.innerText = 'Acknowledged';
          });
        });
      } else {
        container.classList.add('hidden');
        container.innerHTML = '';
        toggleBtn.innerText = '💬 Show Client Feedback Pins (Trigger Warning)';
      }
    });
  }

  // 6. Micro-Jitter Toggle (1px Sub-pixel drift)
  initMicroJitterToggle() {
    const toggle = document.getElementById('designerJitterToggle');
    if (!toggle) return;

    toggle.addEventListener('change', () => {
      this.jitterActive = toggle.checked;
      if (this.jitterActive) {
        if (window.soundEngine) window.soundEngine.playPoliceSiren();
        this.startJitterLoop();
      } else {
        this.stopJitterLoop();
      }
    });
  }

  startJitterLoop() {
    this.jitterTimer = setInterval(() => {
      const targets = document.querySelectorAll('.win-panel, .form-group, .action-btn');
      targets.forEach(el => {
        const ox = (Math.random() * 2 - 1).toFixed(1);
        const oy = (Math.random() * 2 - 1).toFixed(1);
        const rot = (Math.random() * 0.4 - 0.2).toFixed(2);
        el.style.transform = `translate(${ox}px, ${oy}px) rotate(${rot}deg)`;
      });
    }, 2800);
  }

  stopJitterLoop() {
    if (this.jitterTimer) clearInterval(this.jitterTimer);
    document.querySelectorAll('.win-panel, .form-group, .action-btn').forEach(el => {
      el.style.transform = '';
    });
  }

  // 7. Broken Auto-Layout Interactive Box
  initBrokenAutoLayout() {
    const paddingSlider = document.getElementById('autoLayoutPaddingSlider');
    const layoutCard = document.getElementById('brokenAutoLayoutCard');
    const padValue = document.getElementById('layoutPadValue');

    if (!paddingSlider || !layoutCard) return;

    paddingSlider.addEventListener('input', () => {
      const v = parseInt(paddingSlider.value, 10);
      // Asymmetric anti-layout: top grows, bottom shrinks, left rotates
      layoutCard.style.paddingTop = `${v * 1.8}px`;
      layoutCard.style.paddingBottom = `${Math.max(2, 40 - v)}px`;
      layoutCard.style.paddingLeft = `${v * 0.4}px`;
      layoutCard.style.paddingRight = `${v * 2.2}px`;

      if (padValue) {
        padValue.innerText = `Padding: Top=${(v * 1.8).toFixed(0)}px, Right=${(v * 2.2).toFixed(0)}px, Bottom=${Math.max(2, 40 - v)}px, Left=${(v * 0.4).toFixed(0)}px`;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.designerRage = new DesignerRageEngine();
});
