import { getLaptops } from './api.js';
import { setupUI, showSkeletons } from './ui.js';
import { getFavorites } from './storage.js';
import { createComparisonTable } from './compare-utils.js';

setupUI();
const selection = document.getElementById('compare-selection');
const message = document.getElementById('compare-message');
const results = document.getElementById('compare-results');
let favoriteLaptops = [];
let selectedIds = [];

function renderCompare() {
  message.textContent = `${selectedIds.length} selected · Select 2 to 4 favorites`;
  results.innerHTML = selectedIds.length < 2
    ? '<p class="p-8 text-center text-slate-500">Choose at least two laptops to compare.</p>'
    : createComparisonTable(favoriteLaptops.filter(laptop => selectedIds.includes(laptop.id)));
}

function showChoices() {
  if (!favoriteLaptops.length) {
    selection.innerHTML = '<p class="col-span-full p-5 text-center">No favorites yet. Add some from the catalogue.</p>';
    results.innerHTML = '<p class="p-8 text-center">Go to Favorites or Laptops to choose laptops.</p>';
    message.textContent = '0 selected';
    return;
  }

  selection.innerHTML = favoriteLaptops.map(laptop => `
    <label class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 hover:bg-pink-50">
      <input type="checkbox" class="compare-checkbox rounded" value="${laptop.id}" ${selectedIds.includes(laptop.id) ? 'checked' : ''}>
      <span><span class="block font-semibold">${laptop.name}</span><span class="text-sm text-slate-500">$${laptop.price.toLocaleString()} · ${laptop.ramGB} GB RAM</span></span>
    </label>
  `).join('');

  selection.querySelectorAll('.compare-checkbox').forEach(box => {
    box.addEventListener('change', () => {
      const id = Number(box.value);
      if (box.checked) {
        if (selectedIds.length === 4) {
          box.checked = false;
          message.textContent = 'Maximum 4 laptops. Please deselect one before adding another.';
          return;
        }
        selectedIds.push(id);
      } else {
        selectedIds = selectedIds.filter(value => value !== id);
      }
      renderCompare();
    });
  });
  renderCompare();
}

async function loadCompare() {
  showSkeletons(results, 2);
  const allLaptops = await getLaptops();
  if (!allLaptops) {
    results.innerHTML = '<p class="p-8 text-red-600">Could not load laptop data. Please refresh.</p>';
    selection.innerHTML = '';
    return;
  }
  favoriteLaptops = allLaptops.filter(laptop => getFavorites().includes(laptop.id));
  const addedId = Number(new URLSearchParams(window.location.search).get('add'));
  if (favoriteLaptops.some(laptop => laptop.id === addedId)) selectedIds = [addedId];
  showChoices();
}

document.getElementById('clear-compare').addEventListener('click', () => {
  selectedIds = [];
  selection.querySelectorAll('.compare-checkbox').forEach(box => { box.checked = false; });
  renderCompare();
});

loadCompare();
