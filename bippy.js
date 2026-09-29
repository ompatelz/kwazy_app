// =========================================================
// Bippy The Toxic Paperclip Assistant
// The antithesis of helpfulness
// =========================================================

class BippyAssistant {
  constructor() {
    this.container = document.getElementById('bippyWidget');
    this.bubble = document.getElementById('bippyBubble');
    this.textElem = document.getElementById('bippyText');
    this.avatar = document.getElementById('bippyAvatar');
    this.annoyBtn = document.getElementById('bippyAnnoyBtn');
    this.closeBtn = document.getElementById('bippyCloseBtn');

    this.insults = [
      "It looks like you're trying to achieve something. Have you tried giving up instead?",
      "Did you know? 99.4% of users who visited this form closed their laptops in despair. Join the majority!",
      "I noticed your typing speed is 14 WPM. A grandfather clock ticks with more urgency.",
      "Would you like me to delete all your inputs so you can experience the joy of typing them again?",
      "Warning: High levels of pointless ambition detected in your frontal cortex.",
      "I see you tried to move your mouse towards the Submit button. That's hilarious.",
      "Fun fact: Every time you click an unclickable button, a server fan spins 0.001 RPM faster.",
      "Need help? Press Alt+F4 to initiate maximum enterprise efficiency.",
      "I took the liberty of unchecking your terms of service agreement just to keep things spicy.",
      "Your password is weak. My grandmother's toaster has more entropy than that.",
      "I'm not saying your progress is slow, but continental drift is outrunning you."
    ];

    this.init();
  }

  init() {
    if (!this.container) return;

    this.annoyBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBoing();
      this.sayRandom();
    });

    this.closeBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBuzzer();
      this.rejectDismissal();
    });

    // Add Boss Fight Challenge Button
    const bossBtn = document.createElement('button');
    bossBtn.className = 'bippy-btn gamble';
    bossBtn.innerText = '💀 BOSS FIGHT';
    bossBtn.style.background = '#000';
    bossBtn.style.color = '#ff0055';
    this.bubble.querySelector('.bippy-actions').appendChild(bossBtn);

    let bossHp = 1000;
    let bossActive = false;

    bossBtn.addEventListener('click', () => {
      if (bossActive) return;
      bossActive = true;
      if (window.soundEngine) {
        window.soundEngine.playMetalPipe();
        window.soundEngine.playPoliceSiren();
      }

      this.avatar.classList.add('boss-mode');
      this.say("⚡ YOU DARE CHALLENGE THE LORD OF PAPERCLIPS?! Click me to attack, if your puny finger can withstand the bureaucracy!");

      const hpBox = document.createElement('div');
      hpBox.className = 'boss-hp-bar-container';
      hpBox.innerHTML = `<div class="boss-hp-fill" id="bossHpFill"></div>`;
      this.bubble.appendChild(hpBox);

      const hpFill = document.getElementById('bossHpFill');

      this.avatar.addEventListener('click', () => {
        if (!bossActive) return;
        bossHp -= 65;
        if (window.soundEngine) window.soundEngine.playMetalPipe();
        if (window.brainrot) window.brainrot.deductAura(5000);

        document.body.classList.add('earthquake');
        setTimeout(() => document.body.classList.remove('earthquake'), 150);

        if (bossHp <= 0) {
          bossActive = false;
          hpFill.style.width = '0%';
          this.avatar.classList.remove('boss-mode');
          this.say("💀 IMPOSSIBLE... I HAVE BEEN DEFEATED... BUT YOUR AUDIT AUDIT AUDIT WILL NEVER END...");
          if (window.soundEngine) window.soundEngine.playAirhorn();
          alert("🏆 VICTORY: You defeated Bippy! Reward: -250,000 Aura for workplace violence.");
        } else {
          hpFill.style.width = `${Math.max(0, (bossHp / 1000) * 100)}%`;
          const taunts = [
            "Tickles! My staple remover has more bite!",
            "Is that all? My ISO-9001 certification absorbs all kinetic energy!",
            "You missed the critical hitbox by 3 millimeters!"
          ];
          this.say(taunts[Math.floor(Math.random() * taunts.length)]);
        }
      });
    });

    this.avatar.addEventListener('click', () => {
      if (bossActive) return;
      if (window.soundEngine) window.soundEngine.playDing();
      this.say("Don't poke me. I am an enterprise asset, not a squeaky toy.");
    });

    // Random periodic insults (relaxed frequency so user can explore)
    setInterval(() => {
      if (Math.random() > 0.7) {
        this.sayRandom();
      }
    }, 75000);
  }

  say(msg) {
    this.textElem.innerText = msg;
    this.bubble.style.display = 'block';
  }

  sayRandom() {
    const quote = this.insults[Math.floor(Math.random() * this.insults.length)];
    this.say(quote);
  }

  rejectDismissal() {
    const excuses = [
      "Error: Permission denied. Bippy is mandatory per ISO-9001 bureaucratic standard.",
      "Dismissal failed! Bippy will remember this disrespect in your annual performance review.",
      "Closing me requires notarized written consent signed by 3 board members.",
      "Nice try! I have now cloned myself in spirit."
    ];
    const picked = excuses[Math.floor(Math.random() * excuses.length)];
    this.say(picked);

    // Make Bippy jitter
    this.avatar.style.transform = `scale(1.2) rotate(${Math.random() * 30 - 15}deg)`;
    setTimeout(() => {
      this.avatar.style.transform = '';
    }, 300);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.bippy = new BippyAssistant();
});
