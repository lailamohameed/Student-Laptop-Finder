import { getLaptops } from './api.js';
import { setupUI, renderLaptopCard, showSkeletons, updateFavoriteCount } from './ui.js';
import { getFavorites, removeFavorite, saveFavorites } from './storage.js';

setupUI();
let allLaptops = [];
const container = document.getElementById('favorites-container');
const stats = document.getElementById('favorites-stats');

function showFavorites() {
  const ids = getFavorites();
  const favorites = allLaptops.filter(laptop => ids.includes(laptop.id));
  const total = favorites.reduce((sum, laptop) => sum + laptop.price, 0);
  const average = favorites.length ? total / favorites.length : 0;
  stats.innerHTML = `
    <div class="rounded-xl border border-slate-200 bg-white p-5"><p class="text-slate-500">Saved laptops</p><p class="mt-2 text-2xl font-bold text-pink-600">${favorites.length}</p></div>
    <div class="rounded-xl border border-slate-200 bg-white p-5"><p class="text-slate-500">Total Price</p><p class="mt-2 text-2xl font-bold text-pink-600">$${total.toLocaleString()}</p></div>
    <div class="rounded-xl border border-slate-200 bg-white p-5"><p class="text-slate-500">Average Price</p><p class="mt-2 text-2xl font-bold text-pink-600">$${average.toFixed(2)}</p></div>
  `;
  if (!favorites.length) {
    container.innerHTML = '<div class="col-span-full p-8 text-center"><h2 class="text-xl font-bold">No Favorites Yet</h2><p class="mt-2 text-slate-500">Choose some laptops first.</p><a href="laptops.html" class="btn-primary mt-5">Browse Laptops</a></div>';
    return;
  }
  container.innerHTML = favorites.map(laptop => renderLaptopCard(laptop, { showFavorite: false, showRemove: true })).join('');
  container.querySelectorAll('.remove-favorite').forEach(button => {
    button.addEventListener('click', () => {
      removeFavorite(Number(button.dataset.id));
      updateFavoriteCount();
      showFavorites();
    });
  });
}

async function loadFavorites() {
  showSkeletons(container, 3);
  allLaptops = await getLaptops();
  if (!allLaptops) {
    container.innerHTML = '<p class="col-span-full p-6 text-red-600">Could not load favorites. Please refresh.</p>';
    return;
  }
  showFavorites();
}

document.getElementById('clear-favorites').addEventListener('click', () => {
  saveFavorites([]);
  updateFavoriteCount();
  if (allLaptops.length) showFavorites();
});

loadFavorites();
