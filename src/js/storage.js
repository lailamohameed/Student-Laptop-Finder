const FAVORITES_KEY = 'pixel_favorites';
const THEME_KEY = 'pixel_theme';

export function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error('Could not read saved favorites:', error);
    return [];
  }
}

export function saveFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export const isFavorite = id => getFavorites().includes(id);

export function addFavorite(id) {
  const saved = getFavorites();
  if (!saved.includes(id)) {
    saved.push(id);
    saveFavorites(saved);
  }
}

export const removeFavorite = id => saveFavorites(getFavorites().filter(savedId => savedId !== id));

export function getTheme() {
  try {
    const theme = JSON.parse(localStorage.getItem(THEME_KEY) || '"battery"');
    return theme === 'performance' ? 'performance' : 'battery';
  } catch (error) {
    return 'battery';
  }
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, JSON.stringify(theme));
}
