var bStarted = false;
var bFuture;
var bPast;

// start flyby infos
function getFlyByInfo(latlng,bool){    
    toggleLoading(false,false,true); // start loading animation
    document.getElementById("flyby").innerHTML = "";
    document.getElementById("flyby").innerHTML = loadingAnimation; // small animations
    document.getElementById("pastpasses").innerHTML = "";
    document.getElementById("pastpasses").innerHTML = loadingAnimation; // small animations
    bFuture=false;
    bPast=false;
    callBackEndFutureFlyBy(latlng);    
    if (!bStarted) {   // get left sidebar on first call
      start(bool);
      bStarted=true;
    } else
      toggleNavL(true);
  }

function callBackEndFlyBy(latlng){
    document.getElementById("pastpasses").style.minHeight = "200px"; // heigth for loading animation

    var oData = {}; // object for AJAX call

    oData.call = "ISSpastPasses";
    oData.data =        "<requestName>ISSpastPasses</requestName>" +
                            "<params>" +
                            "<latitude>" + latlng.lat + "</latitude>" +
                            "<longitude>" + latlng.lng + "</longitude>" +
                            "<radius>" + getRadiusSliderValue() + "</radius>" +
                            "</params>";
    oData.callback = renderFlyBy;
    oData.type = "POST";
    ajaxCall(oData);
   }

   function renderFlyBy(oData){   
    var objDiv = document.getElementById("leftBottom");
    objDiv.scrollTop = objDiv.scrollHeight;   
    document.getElementById("pastpasses").innerHTML = "";
    document.getElementById("pastpasses").style.minHeight = "";
    if (oData == "error"){
      document.getElementById("pastpasses").innerHTML = "Server error!";
    }    
    // parse all times in table to locale time
    if(oData.childNodes[1].childNodes[1].childNodes[1].childNodes.length){
    for (var i = 0; i < oData.childNodes[1].childNodes[1].childNodes[1].childNodes.length; i++) {
      if (oData.childNodes[1].childNodes[1].childNodes[1].childNodes[i].childNodes[0].innerHTML)
      oData.childNodes[1].childNodes[1].childNodes[1].childNodes[i].childNodes[0].innerHTML = parse2localTime(oData.childNodes[1].childNodes[1].childNodes[1].childNodes[i].childNodes[0].innerHTML);
      if (oData.childNodes[1].childNodes[1].childNodes[1].childNodes[i].childNodes[1].innerHTML)
        oData.childNodes[1].childNodes[1].childNodes[1].childNodes[i].childNodes[1].innerHTML = parse2localTime(oData.childNodes[1].childNodes[1].childNodes[1].childNodes[i].childNodes[1].innerHTML);
    }}
    transform2(oData, 'xsl/pastpasses.xsl',"pastpasses"); // XSLT
    var objDiv = document.getElementById("leftBottom");
    objDiv.scrollTop = objDiv.scrollHeight;    
    toggleLoading(true); // remove loading screen
    bPast = true;
    if(bPast && bFuture)
      toggleLoading(true);
}

  function callBackEndFutureFlyBy(latlng){
    document.getElementById("flyby").style.minHeight = "200px"; // heigth for loading animation

    var oData = {}; // object for AJAX call
    
    oData.call = "ISSfuturePasses";
    oData.data =        "<requestName>ISSfuturePasses</requestName>" +
                            "<params>" +
                            "<latitude>" + latlng.lat + "</latitude>" +
                            "<longitude>" + latlng.lng + "</longitude>" +
                            "<number>6</number>" +
                            "</params>";
    oData.callback = renderFutureFlyBy;
    oData.type = "POST";
    ajaxCall(oData);
   }
  
   function renderFutureFlyBy(oData){
    var objDiv = document.getElementById("leftBottom");
    objDiv.scrollTop = objDiv.scrollHeight;  
    if (oData) {
      document.getElementById("flyby").innerHTML = "";
      document.getElementById("flyby").style.minHeight = "";

      // parse all times in table to locale time
      for (var i = 0; i < oData.childNodes[1].childNodes[1].childNodes[0].childNodes.length; i++) {
          oData.childNodes[1].childNodes[1].childNodes[0].childNodes[i].firstChild.innerHTML = parse2localTime(oData.childNodes[1].childNodes[1].childNodes[0].childNodes[i].firstChild.innerHTML);
      }

      transform2(oData, 'xsl/flyby.xsl',"flyby"); // XSLT
      }
    else // if no passes
     document.getElementById("flyby").innerHTML = "<h2>No passes in the near future</h2>";

    objDiv.scrollTop = objDiv.scrollHeight;    
    callBackEndFlyBy(latlng);
    bFuture = true;
    if(bPast && bFuture)
      toggleLoading(true);
  }