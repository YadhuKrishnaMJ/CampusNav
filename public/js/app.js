let map;
let userMarker;
let destinationMarker;

function initMap() {
    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    fetchLocations();
}

function fetchLocations() {
    fetch('/api/locations')
        .then(response => response.json())
        .then(locations => {
            const select = document.getElementById('destination');
            locations.forEach(location => {
                const option = document.createElement('option');
                option.value = `${location.latitude},${location.longitude}`;
                option.textContent = location.name;
                select.appendChild(option);
            });
        });
}

function getDirections() {
    navigator.geolocation.getCurrentPosition(position => {
        const start = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        if (userMarker) {
            map.removeLayer(userMarker);
        }

        userMarker = L.marker([start.lat, start.lng]).addTo(map)
            .bindPopup('Your location').openPopup();

        const destination = document.getElementById('destination').value.split(',');
        const end = {
            lat: parseFloat(destination[0]),
            lng: parseFloat(destination[1])
        };

        if (destinationMarker) {
            map.removeLayer(destinationMarker);
        }

        destinationMarker = L.marker([end.lat, end.lng]).addTo(map)
            .bindPopup('Destination').openPopup();

        const control = L.Routing.control({
            waypoints: [
                L.latLng(start.lat, start.lng),
                L.latLng(end.lat, end.lng)
            ],
            routeWhileDragging: true
        }).addTo(map);
    });
}

document.addEventListener('DOMContentLoaded', initMap);
