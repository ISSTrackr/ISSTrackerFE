function countriesCallBackEnd(){
    var oData = {};
    oData.call = "GeoJson";
    oData.data =        "<Request>"+
                            "<requestName>GeoJson<requestName>"+
                            "<params>"+
                                "<country>all</country>"+
                            "</params>"+
                        "</Request>",
    oData.callback = countriesCallback;
    oData.type = "POST";
    ajaxCall(oData);
}

function countriesCallback(oData){
    var xmlString = oData.responseText;
    var parser = new DOMParser;
    var xmlDoc = parser.parseFromString(xmlString, "text/xml"); // XML creation
    transform2(xmlDoc, 'xsl/countries.xsl',"countries"); // XSL transformation
    console.log("country dropdown");
    //waitForXSL();
}

function callGeoCoding(){
    s = document.getElementById('plz').value;

    if (document.getElementById('plz').value.indexOf(",") < 0)
        geoCodingCallBackEnd(addressParser());
    else
    {
        var sLatlon = document.getElementById('plz').value;
        sLatlon = sLatlon.split(",");  
        var lat = sLatlon[0];
        var lon = sLatlon[1];
        var lat = parseFloat(lat);
        var lon = parseFloat(lon);
        addMarker(lat,lon,true);
    }
}



function addressParser(){
    var zipCode = document.getElementById('plz').value;
    var country = document.getElementById('country').value;
    return "" + zipCode + ", " + country;
}

function geoCodingCallBackEnd(q){
    var oData = {};
    
    oData.call = "GeocodingAddress";
    oData.data =        "<Request>" +
                            "<requestName>Geocoding<requestName>" +
                            "<params>" +
                            "<q>" + q +"</q>"+
                            "</params>" +
                        "</Request>";
    oData.callback = geoCodingCallBack;
    oData.type = "POST";
    ajaxCall(oData);
}

function geoCodingCallBack(oData){
  var xmlString = oData.responseText;
  var parser = new DOMParser; 
  var xmlDoc = parser.parseFromString(xmlString, "text/xml"); // XML creation
  var lat = parseFloat(xmlDoc.childNodes[0].childNodes[1].childNodes[0].innerHTML);
  var lon = parseFloat(xmlDoc.childNodes[0].childNodes[1].childNodes[1].innerHTML);
  var latlng = L.latLng(lat, lon);
  addMarker(lat,lon);
  mymap.flyTo(latlng,5);
  console.log("geoCodingCallBack"); 
}