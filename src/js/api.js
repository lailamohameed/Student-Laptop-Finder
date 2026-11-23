export async function getLaptops() {
    try {
        const response = await fetch('./data/laptops.json');
        if (!response.ok) throw new Error(`Laptop data request failed (${response.status})`);
        const laptops = await response.json();
        if (!Array.isArray(laptops)) throw new Error('Laptop data is not a valid list');
        return laptops;
    } catch (error) {
        console.error('Could not load laptop data:', error);
        return null;
    }
}
