var issRoute;

function renderGPX(oData){
  if ( oData.childNodes[1].childNodes[1].childNodes.length ){
    for ( var i = 0; i < oData.childNodes[1].childNodes[1].childNodes.length; i++ )
    {
      if ( oData.childNodes[1].childNodes[1].childNodes[i].childNodes.length )
      {
        for ( var j = 0; j < oData.childNodes[1].childNodes[1].childNodes[i].childNodes.length; j++ ){ // parse to locale time
          oData.childNodes[1].childNodes[1].childNodes[i].childNodes[j].attributes[0].nodeValue = parse2localTime(oData.childNodes[1].childNodes[1].childNodes[i].childNodes[j].attributes[0].nodeValue);
        }
      }
    }
  }

var j = oData.childNodes[1].childNodes[1].childNodes.length-1;
var k = oData.childNodes[1].childNodes[1].childNodes[j].childNodes.length-1;
var lat = oData.childNodes[1].childNodes[1].childNodes[j].childNodes[k].childNodes[0].innerHTML;
var lon = oData.childNodes[1].childNodes[1].childNodes[j].childNodes[k].childNodes[1].innerHTML;
aIssRouteFirstDraw = L.latLng(parseFloat(lat),parseFloat(lon)); // point for current route live draw
transform3(oData, 'xsl/xml2gpx.xsl', function(gpx){ // wait for transform then draw GPX
  if (issRoute) // if route is already drawn remove
    issRoute.removeFrom(mymap);

  issRoute = new L.GPX(gpx, { // create new GPX
      async: true, 
      marker_options: {
        startIconUrl: '',
        endIconUrl: '',
        shadowUrl: '',
        className:"waypoints",
        wptIconUrls: {
          '':'images/waypoint.png',  //set waypoint marker        
        }
      },   
        polyline_options: { //overwritten in CSS
          className: "gpx", 
          color: 'green',
          opacity: 0.75,
          weight: 3,
          lineCap: 'round'
        }
      }).on('loaded', function(e) { // set circles for cirst draw
        var wpWidthHeight = (Math.sqrt((mymap.getZoom()/3))*(mymap.getZoom()/3)*(mymap.getZoom()/3)*30).toFixed(0);
        var offset = (wpWidthHeight/2).toFixed(0);
        var waypoints = document.getElementsByClassName("waypoints");
        if (waypoints){
                for (var i = 0; i < waypoints.length; i++){
                waypoints[i].style.height = wpWidthHeight + "px";
                waypoints[i].style.width = wpWidthHeight + "px";
                waypoints[i].style["margin-top"]= -offset + "px";
                waypoints[i].style["margin-left"]= -offset + "px";                
            } 
          } 
          mymap.fitBounds(e.target.getBounds()); //show whole route
          document.getElementById("drawISSroute").disabled = false; // remove 
          if (clickedL)
            toggleNavL();
          if (clickedR)
            toggleNav();
          toggleLoading(true);
    }).addTo(mymap);
  })
};

function callBackEndISSDB(){
  var checkbox =  document.getElementById("drawISSroute");
  var slider = document.getElementById("iss_range");
  if (!checkbox.checked) {    
    if (issRoute)
    issRoute.remove();
    issRouteLive.remove();
    bDrawISSRoute = false;
    bFirstDraw = false;
    slider.disabled = false;
  } else {    
    bDrawISSRoute = true;
    oldLatLng = latlng;
    checkbox.disabled = true;   
    slider.disabled = true;
    toggleLoading(false,true,true);
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