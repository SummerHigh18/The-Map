let theMap = L.map('map').setView([1.3521, 103.8198], 11);


//Differernt TIle Layers for prefeRences:)
let osmSimple = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(theMap)

let smoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

let darkOutline = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});
//Will add more tile layers maybe..


let mapLayers = {
    "OpenStreetsMap": osmSimple,
    "Smooth Dark": smoothDark,
    "Dark Outline": darkOutline}
let layerControl = L.control.layers(mapLayers).addTo(theMap);


let countryCode;

async function gettingAddress(e) {
    let theCoordinates = e.latlng
    let theLatitude = theCoordinates.lat
    let theLongitude = theCoordinates.lng

    let theUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${theLatitude}&lon=${theLongitude}&layer=address`
    let response = await fetch(theUrl)
    let data = await response.json()

    countryCode = data.address.country_code
    console.log(countryCode);
    
}

theMap.on('click', gettingAddress)






