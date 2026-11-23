import { getLaptops } from './api.js';
import { setupUI, showSkeletons, updateFavoriteCount } from './ui.js';
import { isFavorite, addFavorite, removeFavorite } from './storage.js';

setupUI();

async function loadDetails() {
  const container = document.getElementById('details-container');
  showSkeletons(container, 1);
  const laptops = await getLaptops();
  if (!laptops) {
    container.innerHTML = '<p class="p-8 text-red-600">Could not load laptop details. Please refresh.</p>';
    return;
  }

  const id = new URLSearchParams(window.location.search).get('id');
  const laptop = laptops.find(item => String(item.id) === id);
  if (!laptop) {
    container.innerHTML = '<div class="p-8 text-center"><h2 class="text-2xl font-bold">Laptop not found</h2><p class="mt-3">Check the URL or browse all laptops.</p><a href="laptops.html" class="btn-primary mt-5">Browse Laptops</a></div>';
    return;
  }

  const specs = [
    ['ID', laptop.id],
    ['Name', laptop.name],
    ['Brand', laptop.brand],
    ['Price', `$${laptop.price.toLocaleString()}`],
    ['Category', laptop.category],
    ['Processor', laptop.cpu],
    ['RAM', `${laptop.ramGB} GB`],
    ['Storage', `${laptop.storageGB} GB`],
    ['Battery life', `${laptop.batteryHours} hours`],
    ['Weight', `${laptop.weightKg} kg`],
    ['Screen size', `${laptop.screenInches} inches`]
  ];

  container.innerHTML = `
    <article class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="flex items-center justify-center rounded-2xl bg-slate-50 p-5">
          <img src="${laptop.image}" alt="${laptop.name}" class="max-h-96 w-full object-contain">
        </div>
        <div>
          <p class="font-semibold text-pink-600">${laptop.brand} · ${laptop.category}</p>
          <h1 class="mt-2 text-3xl font-extrabold">${laptop.name}</h1>
          <p class="mt-4 text-3xl font-extrabold text-pink-600">$${laptop.price.toLocaleString()}</p>
          <p class="mt-5 leading-relaxed text-slate-600">${laptop.description}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <button type="button" id="detail-favorite" class="btn-primary"></button>
            <button type="button" id="detail-compare" class="btn-secondary">Add to Comparison</button>
          </div>
        </div>
      </div>
      <h2 class="mt-8 mb-4 text-2xl font-bold">Full Specifications</h2>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="w-full text-left">
          <tbody>
            ${specs.map(([label, value]) => `<tr class="border-b border-slate-200"><th scope="row" class="bg-slate-100 p-3 font-semibold">${label}</th><td class="p-3">${value}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </article>
  `;

  const favoriteButton = document.getElementById('detail-favorite');
  function refreshFavoriteButton() {
    favoriteButton.textContent = isFavorite(laptop.id) ? '♥ Remove from Favorites' : '♡ Add to Favorites';
  }
  favoriteButton.addEventListener('click', () => {
    if (isFavorite(laptop.id)) removeFavorite(laptop.id);
    else addFavorite(laptop.id);
    refreshFavoriteButton();
    updateFavoriteCount();
  });
  document.getElementById('detail-compare').addEventListener('click', () => {
    addFavorite(laptop.id); 
    window.location.href = `compare.html?add=${laptop.id}`;
  });
  refreshFavoriteButton();
}

loadDetails();
