import { formatNum } from "./modules/format-num.js";

let theMap = L.map('map').setView([1.3521, 103.8198], 11);


//Differernt TIle Layers for prefeRences:)
let osmSimple = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

let smoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
}).addTo(theMap);

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




async function getAddress(e) {
    let theCoordinates = e.latlng
    let theLatitude = theCoordinates.lat;
    let theLongitude = theCoordinates.lng

    let theUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${theLatitude}&lon=${theLongitude}&layer=address`
    let response = await fetch(theUrl)

    return await response.json()
}

async function getCountryData(theAddress) {
    const countryCode = theAddress.address.country_code

    let theResponse = await fetch(`https://api.restcountries.com/countries/v5/codes.alpha_2/${countryCode}?pretty=1`, { headers: { 'Authorization': 'Bearer rc_live_ff75f42828d6448fba2304c585904f05' } }
    ) 
    // Yeah it is open, and go ahead using it :)
    let data = await theResponse.json()
    return data.data.objects[0]
}

const countryName = document.querySelector('#name').lastElementChild
const flagUrl = document.querySelector('#flag').firstElementChild
const currency = document.querySelector('.currency').lastElementChild
const area = document.querySelector('.area')
const population = document.querySelector('.pop')
const capitalList = document.querySelector('.capital').firstElementChild
const timezoneList = document.querySelector('.timezone').firstElementChild


function updatingList(listElement, items) {
        listElement.replaceChildren()
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        })
    }

function updateCountryCard(theData) {
    countryName.innerText = theData.names.common
    flagUrl.src = theData.flag.url_png
    currency.innerText = `${theData.currencies[0].name} (${theData.currencies[0].symbol})`
    area.innerText = `${formatNum(theData.area.kilometers)} km²`
    population.innerText = formatNum(theData.population)

    let capitalArray = theData.capitals.map(capital => capital.name)
    let timezoneArray = theData.timezones

    
    updatingList(capitalList, capitalArray)
    updatingList(timezoneList, timezoneArray)
}

async function onClick(e) {
    const address = await getAddress(e)
    const countryData = await getCountryData(address)

    updateCountryCard(countryData)


}

theMap.on('click', onClick)












