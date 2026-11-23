import { getLaptops } from './api.js';
import { setupUI, renderLaptopCard, showSkeletons, bindFavoriteButtons } from './ui.js';

setupUI();
let laptops = [];
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const ramFilter = document.getElementById('ram-filter');
const batteryFilter = document.getElementById('battery-filter');
const sortFilter = document.getElementById('sort-filter');
const container = document.getElementById('laptops-container');
const count = document.getElementById('results-count');

function showFilteredLaptops() {
  const search = searchInput.value.toLowerCase().trim();
  let results = laptops.filter(laptop =>
    laptop.name.toLowerCase().includes(search) || laptop.brand.toLowerCase().includes(search)
  );

  if (categoryFilter.value !== 'all') results = results.filter(item => item.category === categoryFilter.value);
  if (priceFilter.value !== 'all') results = results.filter(item => item.price <= Number(priceFilter.value));
  if (ramFilter.value !== 'all') results = results.filter(item => item.ramGB >= Number(ramFilter.value));
  if (batteryFilter.value !== 'all') results = results.filter(item => item.batteryHours >= Number(batteryFilter.value));

  const sortOptions = {
    'price-low': (a, b) => a.price - b.price,
    'price-high': (a, b) => b.price - a.price,
    'battery-low': (a, b) => a.batteryHours - b.batteryHours,
    'battery-high': (a, b) => b.batteryHours - a.batteryHours,
    'weight-low': (a, b) => a.weightKg - b.weightKg,
    'weight-high': (a, b) => b.weightKg - a.weightKg
  };

  if (sortOptions[sortFilter.value]) results = [...results].sort(sortOptions[sortFilter.value]);

  count.textContent = `${results.length} laptops found`;
  if (!results.length) {
    container.innerHTML = '<p class="col-span-full rounded-xl bg-white p-8 text-center text-slate-700">No laptops match your search and filters. Try different options.</p>';
    return;
  }
  container.innerHTML = results.map(laptop => renderLaptopCard(laptop)).join('');
  bindFavoriteButtons(container);
}

async function loadCatalogue() {
  showSkeletons(container, 8);
  laptops = await getLaptops();
  if (!laptops) {
    container.innerHTML = '<p class="col-span-full p-6 text-red-600">Unable to load laptop data. Start a local server and refresh the page.</p>';
    count.textContent = 'Unable to load results';
    return;
  }
  showFilteredLaptops();
}

[searchInput, categoryFilter, priceFilter, ramFilter, batteryFilter, sortFilter].forEach(input => {
  input.addEventListener(input === searchInput ? 'input' : 'change', showFilteredLaptops);
});

document.getElementById('reset-filters').addEventListener('click', () => {
  searchInput.value = '';
  categoryFilter.value = 'all';
  priceFilter.value = 'all';
  ramFilter.value = 'all';
  batteryFilter.value = 'all';
  sortFilter.value = 'default';
  showFilteredLaptops();
});

loadCatalogue();
