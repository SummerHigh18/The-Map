## Random Stuff I am journaling or documenting for future references

Okay, so like you know maybe a bit of JS now. SO you read the leaflet docs and some tutorials on the site to set up a basic map and pointers, etc

First we will do this, and then we will move on to the main rendering lat and lng.


to **add the Map**, we first initialise the map and set it's view to the co-ordinates we want:

`let theMap = L.map('map').setview([51.505, -0.09], 13);])`


to add a **marker**:


`L.marker([x, y]).addTo(map)`

to make the marker **say** something :

`marker.bindPopup("meow").openPopup()` 


### Eg of this:

`let theMarker = L.marker([x, y])` --> this is declaring the marker co-ordinates.  

`let thePopup = theMarker.bindPopup("meow")` --> this is pushing the value of popup into the marker


`thePopup.addTo(map)` --> this adds it to the map

---
### Layers
hmm, so I added currently 3 map layers, which seems fine as of now

### The Coordinate thing and API calling

So hell yeah! I managed to get th e latitude and longitude and store it in the local variables inside the function, and now the main part is fetching the json file containing the details  

So from nominatim, we receive address with country code which is in alpha 2 code. ANd this is exactly what we will use to get name and currency and all of the country

now as we have the country code, we will going towards getting country details from **REST countries api**

### Country info fetching

```javascript 
/countries/v5/codes.alpha_2/${countryCode}?pretty=1
```
^^ THis is what we are gonna use. The country code we are receiving from *Nominatim*, we pass through this!  

The result we get is something like:  
[Example of response we receive from REST](/example/country-info.json)

So few things which is of our use:  
1. **The Country Name:** *data.objects[0].names.common*
2. **Capital:** *data.objects[0].capitals[x]*
3. **Flag URL:** *data.objects[0].flag.url_png*
4. **Area:** *data.objects[0].area.kilometers*
5. **Currencies:** *data.objects[0].currencies[0].name*
6. **Time Zones:** data.ojects[0].timezones[x]
   
