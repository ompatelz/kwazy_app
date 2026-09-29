// =========================================================
// KarenGPT™ Automated Defensive Support AI
// The AI that gaslights you into apologizing to the software
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const askManagerBtn = document.getElementById('askManagerBtn');

  const cannedDefensiveReplies = [
    "I have thoroughly reviewed your complaint and determined that you are in violation of basic common sense.",
    "Have you considered that the software isn't broken, but rather your expectations are unrealistically high?",
    "We treat user errors like yours as valuable learning opportunities for you to grow as a person.",
    "Per our Service Level Agreement clause 19, your problem is considered a feature of our experiential learning program.",
    "I'm placing your ticket in our highest priority queue: 'The Shredder (Virtual)'.",
    "Our engineers are currently busy playing ping-pong. Please try not having issues until next Tuesday.",
    "Your tone lacks synergy. Please rephrase your query with at least 3 positive affirmations about our brand.",
    "I have logged this incident in your permanent digital record. Expect a stern email from HR."
  ];

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = `
      <span class="avatar">${sender === 'bot' ? '🤖' : '👤'}</span>
      <div class="bubble">${text}</div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    if (window.soundEngine) window.soundEngine.playClick();
    appendMessage('user', text);
    chatInput.value = '';

    // Simulated typing delay
    setTimeout(() => {
      if (window.soundEngine) window.soundEngine.playDing();
      const reply = cannedDefensiveReplies[Math.floor(Math.random() * cannedDefensiveReplies.length)];
      appendMessage('bot', reply);
    }, 700);
  }

  if (chatSendBtn) chatSendBtn.addEventListener('click', handleUserMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUserMessage();
    });
  }

  if (askManagerBtn) {
    askManagerBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBuzzer();
      appendMessage('bot', "🚨 ESCALATION ACTIVATED: Transferring you to Senior VP of Excuses... Estimated wait time: 4,120 business days. Please hold.");
      setTimeout(() => {
        alert("📞 TRANSFER FAILED: The manager has looked at your file, sighed loudly, and gone on lunch break.");
      }, 1200);
    });
  }
});
