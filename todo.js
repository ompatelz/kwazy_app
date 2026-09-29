// =========================================================
// AntiProductive™ Counter-Productive To-Do List Engine
// Multiplying tasks instead of completing them
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todoList');
  const newTodoInput = document.getElementById('newTodoInput');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const shuffleBtn = document.getElementById('shuffleTodosBtn');
  const delegateBtn = document.getElementById('delegateAllBtn');
  const procrastinateBtn = document.getElementById('procrastinateBtn');

  const bureaucraticObstacles = [
    (task) => `Formally draft committee charter regarding "${task}"`,
    (task) => `File environmental impact assessment on doing "${task}"`,
    (task) => `Schedule 3-hour pre-alignment sync before starting "${task}"`,
    (task) => `Acquire ergonomic clearance from HR to think about "${task}"`,
    (task) => `Draft 42-page post-mortem anticipating failure of "${task}"`,
    (task) => `Send passive-aggressive follow-up email about "${task}"`
  ];

  let todos = [
    { id: 1, title: 'Drink water', tag: 'High Risk', isSub: false, completed: false },
    { id: 2, title: 'Obtain certified notarization that water is H2O', tag: 'Bureaucracy', isSub: true, completed: false },
    { id: 3, title: 'Check in on existential dread', tag: 'Ongoing', isSub: false, completed: false }
  ];

  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `todo-item ${item.isSub ? 'subtask' : ''}`;
      li.innerHTML = `
        <div class="todo-content-col">
          <input type="checkbox" class="todo-checkbox" ${item.completed ? 'checked' : ''} data-index="${index}">
          <span class="todo-title ${item.completed ? 'completed' : ''}">${item.title}</span>
          <span class="todo-tag">${item.tag}</span>
        </div>
        <div class="todo-actions">
          <button class="action-btn danger small-btn del-btn" data-index="${index}">🗑️ Delete (Hard)</button>
        </div>
      `;

      // Checkbox click defiance
      const chk = li.querySelector('.todo-checkbox');
      chk.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.soundEngine) window.soundEngine.playBuzzer();
        const verification = prompt(`⚠️ TASK COMPLETION AUDIT: To mark "${item.title}" complete, type: "I SWEAR ON MY MOTHERBOARD I DID NOT SLACK OFF"`);
        if (verification === "I SWEAR ON MY MOTHERBOARD I DID NOT SLACK OFF") {
          item.completed = true;
          if (window.soundEngine) window.soundEngine.playSuccess();
          alert("🎉 Task approved! However, HR has added 2 mandatory celebration compliance forms.");
          todos.push({
            id: Date.now(),
            title: `File HR celebration risk waiver for "${item.title}"`,
            tag: 'Mandatory',
            isSub: true,
            completed: false
          });
        } else {
          alert("❌ Fraud detected. Task reset to INCOMPLETE and marked Urgent.");
          item.completed = false;
          item.tag = 'FRAUD RISK';
        }
        renderTodos();
      });

      // Delete button defiance
      const del = li.querySelector('.del-btn');
      del.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playBoing();
        const sure = confirm(`Are you sure you want to delete this? Doing so will void your keyboard warranty.`);
        if (sure) {
          todos.splice(index, 1);
          // Spawn replacement task
          todos.push({
            id: Date.now(),
            title: `Regret deleting previous task #${index + 1}`,
            tag: 'Remorse',
            isSub: false,
            completed: false
          });
          renderTodos();
        }
      });

      todoList.appendChild(li);
    });
  }

  // Add Task multiplies work
  function handleAddTask() {
    const text = newTodoInput.value.trim();
    if (!text) {
      alert("Please enter a task before we can make your life harder.");
      return;
    }

    if (window.soundEngine) window.soundEngine.playDing();

    // Add original task
    todos.push({
      id: Date.now(),
      title: text,
      tag: 'Pending Suffer',
      isSub: false,
      completed: false
    });

    // Add 2 bureaucratic subtasks
    const shuffledObs = [...bureaucraticObstacles].sort(() => 0.5 - Math.random());
    todos.push({
      id: Date.now() + 1,
      title: shuffledObs[0](text),
      tag: 'Red Tape',
      isSub: true,
      completed: false
    });
    todos.push({
      id: Date.now() + 2,
      title: shuffledObs[1](text),
      tag: 'Meeting Req.',
      isSub: true,
      completed: false
    });

    newTodoInput.value = '';
    renderTodos();

    if (window.bippy) {
      window.bippy.say(`Great! You added 1 task, so I added 2 extra roadblocks. Synergy!`);
    }
  }

  if (addTodoBtn) addTodoBtn.addEventListener('click', handleAddTask);
  if (newTodoInput) {
    newTodoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAddTask();
    });
  }

  // Shuffle Priorities
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBoing();
      todos.sort(() => 0.5 - Math.random());
      renderTodos();
    });
  }

  // Delegate to Intern
  if (delegateBtn) {
    delegateBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playBuzzer();
      todos = todos.filter(() => Math.random() > 0.5);
      todos.push({
        id: Date.now(),
        title: 'Intern accidentally deleted customer database',
        tag: 'CRITICAL FIRE',
        isSub: false,
        completed: false
      });
      renderTodos();
    });
  }

  // Procrastinate
  if (procrastinateBtn) {
    procrastinateBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playSuccess();
      todos.forEach(t => t.title = `[POSTPONED TO 2035] ${t.title}`);
      renderTodos();
      alert("☕ All tasks postponed indefinitely. You have achieved peak laziness.");
    });
  }

  renderTodos();
});
