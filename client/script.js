const url = 'http://localhost:3000/games';

// ===== MODAL =====
const feedbackModal = document.getElementById('feedbackModal');
const feedbackTitle = document.getElementById('feedbackTitle');
const feedbackText = document.getElementById('feedbackText');
const closeModalBtn = document.getElementById('closeModal');

closeModalBtn.addEventListener('click', () => {
  feedbackModal.classList.add('hidden');
  feedbackModal.classList.remove('flex');
});

function showMessage(title, message) {
  feedbackTitle.textContent = title;
  feedbackText.textContent = message;
  feedbackModal.classList.remove('hidden');
  feedbackModal.classList.add('flex');
}

// ===== ELEMENTS =====
const gameForm = document.getElementById('gameForm');
const listContainer = document.getElementById('listContainer');
const gameIdInput = document.getElementById('gameId');

// ===== HELPERS =====
function platformStyle(platform) {
  switch (platform) {
    case 'pc':
      return 'bg-slate-200 text-slate-900 border-slate-400';
    case 'ps5':
      return 'bg-purple-200 text-purple-900 border-purple-400';
    case 'xbox':
      return 'bg-green-200 text-green-900 border-green-400';
    case 'switch':
      return 'bg-red-200 text-red-900 border-red-400';
    case 'mobile':
      return 'bg-yellow-200 text-yellow-900 border-yellow-400';
    default:
      return 'bg-gray-200 text-gray-900 border-gray-400';
  }
}

// ===== READ =====
window.addEventListener('load', fetchData);

function fetchData() {
  fetch(url)
    .then(res => res.json())
    .then(games => {
      if (!games.length) {
        listContainer.innerHTML = `<p class="text-center opacity-70 mt-6">No games yet</p>`;
        return;
      }

      let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;

      games.forEach(game => {
        const style = platformStyle(game.platform);

        html += `
          <li class="basis-1/4 p-2 rounded-md border-2 ${style} flex flex-col justify-between">
            <div>
              <h3 class="font-semibold">${game.title}</h3>
              <p class="text-sm">Studio: ${game.studio}</p>
              <p class="text-sm">Genre: ${game.genre}</p>
              <p class="text-sm">Platform: ${game.platform}</p>
            </div>
            <div class="mt-2 flex gap-2">
              <button class="bg-white/50 px-2 py-1 rounded border"
                data-edit="${game.id}">
                Edit
              </button>
              <button class="bg-white/50 px-2 py-1 rounded border"
                data-delete="${game.id}">
                Delete
              </button>
            </div>
          </li>`;
      });

      html += `</ul>`;
      listContainer.innerHTML = html;
    });
}

// ===== EDIT / DELETE (event delegation) =====
listContainer.addEventListener('click', e => {
  if (e.target.dataset.edit) {
    loadGame(e.target.dataset.edit);
  }
  if (e.target.dataset.delete) {
    deleteGame(e.target.dataset.delete);
  }
});

function loadGame(id) {
  fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(game => {
      gameForm.title.value = game.title;
      gameForm.studio.value = game.studio;
      gameForm.genre.value = game.genre;
      gameForm.platform.value = game.platform;
      gameIdInput.value = game.id;
    });
}

// ===== DELETE =====
function deleteGame(id) {
  fetch(`${url}/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      fetchData();
      showMessage('Game deleted', data.message || 'Game removed');
      gameForm.reset();
      gameIdInput.value = '';
    });
}

// ===== CREATE / UPDATE =====
gameForm.addEventListener('submit', e => {
  e.preventDefault();

  const game = {
    title: gameForm.title.value,
    studio: gameForm.studio.value,
    genre: gameForm.genre.value,
    platform: gameForm.platform.value
  };

  const id = gameIdInput.value;
  if (id) game.id = id;

  fetch(url, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game)
  })
    .then(res => res.json())
    .then(data => {
      fetchData();
      showMessage(id ? 'Game updated' : 'Game added', data.message);
      gameForm.reset();
      gameIdInput.value = '';
    });
});