const specs = [
  ['Brand', 'brand', ''],
  ['Category', 'category', ''],
  ['Price', 'price', 'min'],
  ['Processor', 'cpu', ''],
  ['RAM (GB)', 'ramGB', 'max'],
  ['Storage (GB)', 'storageGB', 'max'],
  ['Battery (hours)', 'batteryHours', 'max'],
  ['Weight (kg)', 'weightKg', 'min'],
  ['Screen (inches)', 'screenInches', '']
];

function findBestValue(laptops, field, direction) {
  const values = laptops.map(laptop => Number(laptop[field]));

  return direction === 'min'
    ? values.reduce((best, value) => Math.min(best, value), Infinity)
    : values.reduce((best, value) => Math.max(best, value), -Infinity);
}

export function createComparisonTable(laptops) {
  if (laptops.length < 2) return '<p class="p-8 text-center">Select at least two favorites.</p>';

  const headings = laptops.map(laptop => `
    <th class="min-w-52 border border-slate-200 p-3 text-center">
      <img src="${laptop.image}" alt="${laptop.name}" class="mx-auto h-32 w-full object-contain">
      <span class="mt-2 block font-semibold">${laptop.name}</span>
    </th>
  `).join('');

  const rows = specs.map(([label, field, direction]) => {
    const best = direction ? findBestValue(laptops, field, direction) : null;
    const values = laptops.map(laptop => {
      const winner = direction && Number(laptop[field]) === best;
      const display = field === 'price' ? `$${laptop[field].toLocaleString()}` : laptop[field];
      return `<td class="border border-slate-200 p-3 text-center ${winner ? 'best-value' : ''}">
        ${display}${winner ? '<span class="mt-1 block text-xs">★ Best Value</span>' : ''}
      </td>`;
    }).join('');
    return `<tr><th scope="row" class="min-w-36 border border-slate-200 bg-slate-100 p-3 text-left">${label}</th>${values}</tr>`;
  }).join('');

  return `<div class="max-w-full overflow-x-auto">
    <table class="w-full min-w-[760px] border-collapse text-sm">
      <thead><tr><th scope="col" class="border border-slate-200 bg-slate-100 p-3 text-left">Specification</th>${headings}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div><p class="p-3 text-sm text-slate-500">★ Best values: lowest price and weight; highest RAM, storage and battery life.</p>`;
}
