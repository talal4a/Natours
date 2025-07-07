/* eslint-disable */
const displayMap = (locations) => {
  // 1. Create the map
  const map = L.map('map', {
    scrollWheelZoom: false,
  });

  // 2. Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // 3. Set map bounds
  const bounds = [];

  // 4. Add markers and popups
  locations.forEach((loc) => {
    const coords = [loc.coordinates[1], loc.coordinates[0]];

    L.marker(coords)
      .addTo(map)
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .openPopup();

    bounds.push(coords);
  });

  // 5. Fit map to bounds
  map.fitBounds(bounds, {
    padding: [100, 100],
  });
};

// Make it global
window.displayMap = displayMap;
