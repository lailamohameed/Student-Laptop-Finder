import { getLaptops } from './api.js';
import { setupUI, renderLaptopCard, showSkeletons, bindFavoriteButtons } from './ui.js';

setupUI();

async function loadHomePage() {
  const container = document.getElementById('featured-laptops');
  showSkeletons(container, 4);
  const laptops = await getLaptops();
  if (!laptops) {
    container.innerHTML = '<p class="col-span-full text-red-600">Could not load laptop data. Please try again.</p>';
    return;
  }

  document.getElementById('total-laptops').textContent = laptops.length;
  document.getElementById('lowest-price').textContent = laptops.length
    ? `$${laptops.reduce((lowest, laptop) => Math.min(lowest, laptop.price), Infinity).toLocaleString()}`
    : '$0';
  container.innerHTML = laptops.slice(0, 4).map(laptop => renderLaptopCard(laptop)).join('');
  bindFavoriteButtons(container);
}

loadHomePage();
