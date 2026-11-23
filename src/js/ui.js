import { getFavorites, getTheme, saveTheme, isFavorite, addFavorite, removeFavorite } from './storage.js';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-mode', theme);
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.textContent = theme === 'battery' ? 'Battery Saver' : 'Performance';
    button.setAttribute('aria-label', `Current theme: ${theme}. Click to switch.`);
  }
}

export function setupUI() {
  applyTheme(getTheme());
  const themeButton = document.getElementById('theme-toggle');
  themeButton?.addEventListener('click', () => {
    const nextTheme = getTheme() === 'battery' ? 'performance' : 'battery';
    saveTheme(nextTheme);
    applyTheme(nextTheme);
  });

  const menuButton = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  menuButton?.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
  });
  updateFavoriteCount();
}

export function updateFavoriteCount() {
  const count = document.getElementById('favorite-count');
  if (count) count.textContent = getFavorites().length;
}

export function showSkeletons(container, count = 4) {
  if (!container) return;
  let markup = '';
  for (let i = 0; i < count; i++) {
    markup += `
    <div class="skeleton-card" aria-label="Loading laptop">
      <div class="skeleton h-44 w-full mb-4"></div>
      <div class="skeleton h-5 w-3/4 mb-3"></div>
      <div class="skeleton h-4 w-1/2 mb-4"></div>
      <div class="skeleton h-8 w-1/3 mb-4"></div>
      <div class="skeleton h-10 w-full"></div>
    </div>
  `;
  }
  container.innerHTML = markup;
}


export function renderLaptopCard(laptop, options = {}) {
  const showRemove = options.showRemove === true;
  const showFavorite = options.showFavorite !== false;
  return `
    <article class="laptop-card">
      <div class="bg-slate-50 h-48 p-4 flex items-center justify-center">
        <img src="${laptop.image}" alt="${laptop.name}" class="h-full w-full object-contain" loading="lazy">
      </div>
      <div class="flex flex-col flex-1 p-4">
        <p class="text-sm font-semibold text-pink-600">${laptop.brand} · ${laptop.category}</p>
        <h3 class="mt-2 text-lg font-bold text-slate-900">${laptop.name}</h3>
        <p class="mt-2 text-sm text-slate-500">${laptop.cpu} · ${laptop.ramGB} GB RAM</p>
        <p class="text-sm text-slate-500">${laptop.storageGB} GB SSD · ${laptop.batteryHours}h battery</p>
        <p class="mt-3 text-2xl font-extrabold text-pink-600">$${laptop.price.toLocaleString()}</p>
        <div class="mt-auto flex flex-wrap gap-2 pt-4">
          <a href="details.html?id=${laptop.id}" class="btn-primary flex-1">View Details</a>
          ${showFavorite ? `<button type="button" class="favorite-btn btn-secondary px-3" data-id="${laptop.id}" aria-label="Toggle favorite: ${laptop.name}" aria-pressed="${isFavorite(laptop.id)}">${isFavorite(laptop.id) ? '♥' : '♡'}</button>` : ''}
          ${showRemove ? `<button type="button" class="remove-favorite btn-secondary px-3" data-id="${laptop.id}">Remove</button>` : ''}
        </div>
      </div>
    </article>
  `;
}

export function bindFavoriteButtons(container, onChange) {
  container.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      if (isFavorite(id)) removeFavorite(id);
      else addFavorite(id);
      button.textContent = isFavorite(id) ? '♥' : '♡';
      button.setAttribute('aria-pressed', String(isFavorite(id)));
      updateFavoriteCount();
      if (onChange) onChange();
    });
  });
}
