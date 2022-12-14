function buildMenuItem(camera){
    let menuItem = document.createElement('div');
    menuItem.id = camera.number;
    menuItem.className = 'menu-item';
    menuItem.title = camera.name;
    menuItem.innerText = camera.name;
    // add a new line to the menu item
    menuItem.appendChild(document.createElement('br'));
    menuItem.appendChild(document.createElement('br'));
    return menuItem;
}

function buildMenu(){
    let nav = document.querySelector('nav');

    trafficCameras.forEach(function(camera){
        let cameraMenuItem = buildMenuItem(camera);
        nav.appendChild(cameraMenuItem);
    });

    // add event listeners to each menu item
    nav.addEventListener('click', function(event){
        let cameraNumber = event.target.id;

        let camera = trafficCameras.find(function(camera){
            return camera.number === cameraNumber;
    });
    updateMap(camera.lat, camera.lng);
    updateImages(camera);
    });
}

function updateImages(camera){
    // Update camera image <img> to use the current camera's image url
    let cameraImage = document.querySelector('#camera-image');
    cameraImage.src = camera.getImageUrl();

    // Create <img> elements for all camera directions
    let directionsDiv = document.querySelector('#directions');
    // clear out existing <img> data from the div
    directionsDiv.innerHTML = '';
    let directionsData = camera.getDirectionImages();
    directionsData.forEach(function(data){
        let div = document.createElement('div');
        div.className = 'direction-camera';

        // create <img> element
        let img = document.createElement('img');
        img.src = data.url;
        // put it in directions div
        div.appendChild(img);

        // create <span> element
        let span = document.createElement('span');
        span.innerText = data.direction.toUpperCase();
        // put it in directions div
        div.appendChild(span);
        // put the div in the directions div
        directionsDiv.appendChild(div);
    });

    // Remove the hidden class from the images div
    let imagesDiv = document.querySelector('#images');
    imagesDiv.classList.remove('hidden');
}

let map;
let marker;

function updateMap(lat, lng){
    // if marker exists, update its position
    if(marker){
       marker.setLatLng({lat,lng});
    }else{
        // no marker exists, create one
        marker = L.marker([lat, lng]).addTo(map);
    }
    // update the map's view
    map.setView([lat, lng], 16);
}

function buildMap(){
    let senecaCoords = [43.7952, -79.3497];
    map = L.map('map').setView(senecaCoords, 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

window.onload = function(){
    buildMenu();
    buildMap();
}