let theMap = L.map('map').setView([1.3521, 103.8198], 11);


// this is the simple osm one 
let osmSimple = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(theMap)


// this one is the smooth dark one for maybe like those who are obsessed w dark mode ig(I like this too lol!)

let smoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

// this one is dark but with better country view 

let darkOutline = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

let mapLayers = {
    "OpenStreetsMap": osmSimple,
    "Smooth Dark": smoothDark,
    "Dark Outline": darkOutline
}

let layerControl = L.control.layers(mapLayers).addTo(theMap);



let testMarker = L.marker([1.3521, 103.8198])

let testPop = testMarker.bindPopup("This is Singapore!")

testPop.addTo(theMap)