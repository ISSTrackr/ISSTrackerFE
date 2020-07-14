// functions of the context menu

function setMarker(){
    bContextMenu = true; 
    toggleMenuOn();  
    addMarker(markerLatlng.lat,markerLatlng.lng); // set marker
}

function getPosition(){
   toggleMenuOn();  
   bContextMenu = true;
   document.getElementById("plz").value = markerLatlng.lat +", "+ markerLatlng.lng;  // writes coordinates to search bar  
}