# The-Map

**The-Map is a map based website, for countries' info and Pinning your future travel places!**  
- **Info Mode:** You click any *country* on the map, and get info like **name, capital, time zones,** etc!
- **Pin Mode:** You click a location on the map, and pin it! It can be your **vacation plans, or trips, anything!**


I have used **Leaflet and OpenStreetMaps** for the Map, **REST Countries API** for Country Info and **Nominatim** for fetching country from **coordinates.**

## To Use

So there are 2 major use-cases  
- First one is you want the **country card**, so that you can get the country's info. **To do that**, you have to toggle to the Info mode(pre-default), and then, **click** on any country. In about ~2 seconds, the info will be available in the left panel!
  
- Second is you want to **pin and mark** a certain location, for maybe **vacation plans, or trips, anything!**, you toglle to the Pin mode. Then, after clicking on any place on the map, a marker will pop-up, and at that time you enter the country details on the left in the notes section. And when you press enter, the note gets saved into the **Saved Pin dropdown!**

**Current Status:** v2 is completed, and the website is fully functional.  

![alt text](./images/image-1.png)
![alt text](./images/image-2.png)

### Data
It's obvious, but for clarity, I don't have access to any of your **saved or pinned locations and notes**. There is no backend(as of v2), and all the data stored is in your **browser's local storage.**  

### For devs
I also have very descriptive commits and have a rough-journal of how I made this, so you can refer to it if you want to understand the website :)