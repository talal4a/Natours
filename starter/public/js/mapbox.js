/* eslint-disable */
const displayMap = (locations) => {
  try {
    // Check if map container exists
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map container not found');
      return;
    }

    // Initialize the map
    const map = L.map('map', {
      scrollWheelZoom: false,
      zoomControl: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      touchZoom: 'center',
      boxZoom: true,
    });

    // Add OpenStreetMap tile layer with proper attribution
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      detectRetina: true
    }).addTo(map);

    // Create an array to store the bounds
    const bounds = [];
    const markers = [];

    // Process each location and add markers
    locations.forEach((loc) => {
      try {
        // Ensure coordinates are in the correct format [lat, lng]
        const coords = [loc.coordinates[1], loc.coordinates[0]];
        
        // Create custom icon
        const customIcon = L.divIcon({
          className: 'marker',
          html: '<div class="marker-pin"></div>',
          iconSize: [30, 42],
          iconAnchor: [15, 42],
          popupAnchor: [0, -45]
        });

        // Create marker with custom icon
        const marker = L.marker(coords, { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `<div class="popup">
              <p class="popup__text">Day ${loc.day}: ${loc.description}</p>
            </div>`,
            {
              className: 'custom-popup',
              closeButton: true,
              offset: [0, -20]
            }
          );

        markers.push(marker);
        bounds.push(coords);
      } catch (err) {
        console.error('Error processing location:', loc, err);
      }
    });

    // Fit map to bounds if we have valid locations
    if (bounds.length > 0) {
      // Add some padding around the bounds
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 12,
        animate: true
      });
    } else {
      // Set default view if no valid locations
      map.setView([0, 0], 2);
    }

    // Add zoom control
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // Add scale control
    L.control.scale({
      imperial: false,
      metric: true,
      position: 'bottomright'
    }).addTo(map);

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        map.invalidateSize();
        if (bounds.length > 0) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }, 250);
    });

  } catch (error) {
    console.error('Error initializing map:', error);
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.innerHTML = `
        <div class="map-error">
          <p>Unable to load the map. Please try again later.</p>
        </div>
      `;
    }
  }
};

// Make it globally available
window.displayMap = displayMap;
