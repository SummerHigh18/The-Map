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

const PinIcon = L.divIcon({
            className: 'custom-icon',
            html: `
                <div class="map-marker">
                    <div class="pin-base">
                        <div class="pin-graphic"></div>
                    </div>
                </div>
            `,
            iconSize: [60, 60], 
            iconAnchor: [30, 60],
            popupAnchor: [0, -60] 
        });


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

let mode = "info"

async function pinClick(e) {
    const countryAddress = await getAddress(e)

    let theCountry = countryAddress.address.country
    let theState = countryAddress.address.state
    let theCity = countryAddress.address.city
    let thePlaceholder;

    if (theCity !== undefined) {
        thePlaceholder = `${theCity}, ${theCountry}`
    } else if (theState !== undefined) {
        thePlaceholder = `${theState}, ${theCountry}`
    } else if (theCountry === undefined) {
        thePlaceholder = `${theCountry}`
    } else {
        thePlaceholder = 'Switzerland';
    }

    document.getElementById('form-location').placeholder = thePlaceholder

}

document.querySelector('#check').addEventListener('change', function(){
    if (this.checked) {
        document.querySelector('.indicate').innerText = "It's now in Pin mode..."
        document.querySelector('#indication').innerText = "Click on any place to Pin it on the map!"
        mode = 'pin'
        document.getElementById('notes').style.display = 'block';
        document.getElementById('pins-dropdown').style.display = 'block';
    } else {
        document.querySelector('.indicate').innerText = "It's currently in Info mode..."
        document.querySelector('#indication').innerText = "Click on any country to get it's info!"
        mode = "info"
        document.getElementById('notes').style.display = 'none';
        document.getElementById('pins-dropdown').style.display = 'none';
    }
})


let marker = L.marker([1.3521, 103.8198], {icon: PinIcon})
let markerLocation;
theMap.on('click', function(e) {
    if (mode === 'info') {
        onClick(e)
    } else if (mode === 'pin') {
        pinClick(e)
        marker.setLatLng(e.latlng).addTo(theMap)
        markerLocation = e.latlng
    }
})

let savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [] // So whenever the user 
let pinList = document.getElementById('pin-list');

if (savedNotes.length != 0) {

    savedNotes.forEach(item => {
        let savedItem = document.createElement('li');
        savedItem.classList.add('pin-items')
        savedItem.textContent = item.title
        savedItem.dataset.index = item.i
        pinList.appendChild(savedItem)

        let theMarker = L.marker(item.markerLocation, {
            icon: PinIcon
        }).addTo(theMap)
        theMarker.bindPopup((`<p id="marker-title">${item.title}</p> <p id="popup-location">At: ${item.location}</p>`))
    })
}


let button = document.getElementById('save-btn');

let i = savedNotes.length;


button.addEventListener('click', () => {
    let title = document.getElementById('form-title').value
    let location = document.getElementById('form-location').value
    let notes = document.getElementById('form-notes').value
    let btnText = document.getElementById('btn-text')
    savedNotes.push({
        i, title, location, notes, markerLocation, marker: null
    })

    localStorage.setItem('savedNotes', JSON.stringify(savedNotes))

    const latest = savedNotes.at(-1);
    latest.marker = L.marker(latest.markerLocation, {
        icon: PinIcon
    }).addTo(theMap);

    latest.marker.bindPopup(`<p id="marker-title">${latest.title}</p> <p id="popup-location">At: ${latest.location}</p>`)

    



    // pinList.replaceChildren()
    const li = document.createElement('li')
    li.classList.add('pin-items')
    li.textContent = savedNotes.at(-1).title
    li.dataset.index = i 
    // ^ this thing took me 2hrs T-T 
    // I wasn't able to figure out how do I access each of the list item uniquely
    pinList.appendChild(li)
    
    let listItems = document.querySelectorAll('.pin-items')
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            btnText.textContent = item.textContent   
            pinList.classList.toggle('open')
            toggleBtn.classList.toggle('shadow')
            let theLocation = savedNotes[item.dataset.index].markerLocation
            theMap.flyTo(theLocation, 11)
            savedNotes[item.dataset.index].marker.openPopup()

        })
        
    })
    i = i + 1;
    console.log(savedNotes);
    
})



let toggleBtn = document.getElementById('pin-toggle')


toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('shadow')
    pinList.classList.toggle('open')
})









