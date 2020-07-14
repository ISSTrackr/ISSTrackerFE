var issRoute;

function renderGPX(oData){
  if ( oData.childNodes[1].childNodes[1].childNodes.length ){
    for ( var i = 0; i < oData.childNodes[1].childNodes[1].childNodes.length; i++ )
    {
      if ( oData.childNodes[1].childNodes[1].childNodes[i].childNodes.length )
      {
        for ( var j = 0; j < oData.childNodes[1].childNodes[1].childNodes[i].childNodes.length; j++ ){
          oData.childNodes[1].childNodes[1].childNodes[i].childNodes[j].attributes[0].nodeValue = parse2localTime(oData.childNodes[1].childNodes[1].childNodes[i].childNodes[j].attributes[0].nodeValue);
        }
      }
    }
  }
var j = oData.childNodes[1].childNodes[1].childNodes.length-1;
var k = oData.childNodes[1].childNodes[1].childNodes[j].childNodes.length-1;
var lat = oData.childNodes[1].childNodes[1].childNodes[j].childNodes[k].childNodes[0].innerHTML;
var lon = oData.childNodes[1].childNodes[1].childNodes[j].childNodes[k].childNodes[1].innerHTML;
aIssRouteFirstDraw = L.latLng(parseFloat(lat),parseFloat(lon));
transform3(oData, 'xsl/xml2gpx.xsl', function(gpx){
  if (issRoute)
    issRoute.removeFrom(mymap);

  issRoute = new L.GPX(gpx, {
      async: true, 
      marker_options: {
        startIconUrl: '',
        endIconUrl: '',
        shadowUrl: '',
        className:"waypoints",
        wptIconUrls: {
          '':'images/waypoint.png',          
        }
      },   
        polyline_options: {
          className: "gpx",
          color: 'green',
          opacity: 0.75,
          weight: 3,
          lineCap: 'round'
        }
      }).on('loaded', function(e) {
      mymap.fitBounds(e.target.getBounds());
      document.getElementById("drawISSroute").disabled = false;   
      document.getElementById("loadwrapper").style.display = "none";
    }).addTo(mymap);
  })
};

function callBackEndISSDB(){
  var checkbox =  document.getElementById("drawISSroute")
  if (!checkbox.checked) {    
    if (issRoute)
    issRoute.remove();
    issRouteLive.remove();
    bDrawISSRoute = false;
    bFirstDraw = false;
  } else {
    bDrawISSRoute = true;
    oldLatLng = latlng;
    checkbox.disabled = true;    
    document.getElementById("loadwrapper").style.display="";
    var x =  getCurrentTime();
    var y = getSliderTime();

    var oData = {};
    
    oData.call = "ISSDB";
    oData.data =        "<requestName>ISSDB</requestName>" + 
                            "<params>" +
                              "<startTime>" + getSliderTime() + "</startTime>"+
                              "<endTime>" + getCurrentTime() + "</endTime>"+
                            "</params>";                        
    oData.callback = renderGPX;
    oData.type = "POST";
    ajaxCall(oData);
  }
};