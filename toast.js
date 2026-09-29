// =========================================================
// AntiOS Non-Blocking Retro Toast Engine
// Completely replaces blocking window.alert, window.confirm, window.prompt
// =========================================================

function showAntiToast(message, type = 'info') {
  const container = document.getElementById('antiToastContainer') || createToastContainer();

  const toast = document.createElement('div');
  toast.className = `anti-toast-item ${type}`;

  const icon = type === 'danger' ? '🚨' : type === 'success' ? '🎉' : '⚠️';
  toast.innerHTML = `
    <div class="toast-titlebar">
      <span>${icon} AntiOS System Notification</span>
      <button class="toast-x-btn">✕</button>
    </div>
    <div class="toast-content">${message}</div>
  `;

  container.appendChild(toast);

  // Play subtle sound without interrupting
  if (window.soundEngine) {
    if (type === 'danger') window.soundEngine.playBuzzer();
    else window.soundEngine.playDing();
  }

  const closeToast = () => {
    toast.style.animation = 'toastSlideOut 0.25s forwards ease-in';
    setTimeout(() => toast.remove(), 250);
  };

  toast.querySelector('.toast-x-btn').addEventListener('click', closeToast);

  // Auto-dismiss after 3.2 seconds so flow is never interrupted
  setTimeout(closeToast, 3200);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'antiToastContainer';
  c.className = 'anti-toast-container';
  document.body.appendChild(c);
  return c;
}

// Override native window methods so NO native popups ever appear
window.alert = function(msg) {
  showAntiToast(msg, 'info');
};

window.confirm = function(msg) {
  showAntiToast(msg, 'warning');
  return true; // auto-accept without blocking
};

window.prompt = function(msg, defaultVal) {
  showAntiToast(msg, 'info');
  return defaultVal || "I SWEAR ON MY MOTHERBOARD I DID NOT SLACK OFF";
};

window.showAntiToast = showAntiToast;
