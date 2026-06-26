
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
    "Dark Outline": darkOutline
}
let layerControl = L.control.layers(mapLayers).addTo(theMap);






async function gettingAddress(e) {
    let capitalArray = [];
    let theCoordinates = e.latlng
    let theLatitude = theCoordinates.lat
    let theLongitude = theCoordinates.lng

    let theUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${theLatitude}&lon=${theLongitude}&layer=address`
    let response = await fetch(theUrl)
    let data = await response.json()

    let countryCode = data.address.country_code



    let theResponse = await fetch(`https://api.restcountries.com/countries/v5/codes.alpha_2/${countryCode}?pretty=1`, { headers: { 'Authorization': 'Bearer rc_live_ff75f42828d6448fba2304c585904f05' } }
    ) 
    // Yeah it is open, and go ahead using it :)
    let jsonResponse = await theResponse.json()

    let countryName = jsonResponse.data.objects[0].names.common
    let flagUrl = jsonResponse.data.objects[0].flag.url_png
    let currency = jsonResponse.data.objects[0].currencies[0].name
    let currencySym = jsonResponse.data.objects[0].currencies[0].symbol
    let area  = jsonResponse.data.objects[0].area.kilometers
    let timezoneArray = jsonResponse.data.objects[0].timezones

    capitalArray = jsonResponse.data.objects[0].capitals.map(capital => capital.name) // umm this one was quite hard to grasp coz i didn't knew map() i just found out map is a better way than looping through for    

    // Down here is the country info logging into html to show on the page

    document.querySelector('#name').lastElementChild.innerText = countryName
    
    document.querySelector('#flag').firstElementChild.src = flagUrl
    
    currency = `${currency} (${currencySym})`
    document.querySelector('.currency').children[1].innerText = currency
    

    let capitalList = document.querySelector('.capital').firstElementChild

    capitalList.replaceChildren()

    function addingList(capitalName) {
        const li = document.createElement('li')
        li.innerText = `${capitalName}`
        document.querySelector('.capital').firstElementChild.appendChild(li)
    }
    capitalArray.forEach(addingList)
    
}
theMap.on('click', gettingAddress)












