// Backendcall for RSS-Feed

var startRss = 0; // start element
var endRss = 5; // end element
var bRSSStart = false;

function rssClick(e){ // paging
    if (e === -1 && startRss !== 0){
        endRss = startRss;
        startRss = startRss - 5;
    }
    else if (e === 1){
        startRss = endRss
        endRss = endRss + 5
    }
    document.getElementById("mySidebar").innerHTML="";
    rssCallBackEnd(startRss, endRss);
}

function rssCall(){
    rssCallBackEnd(0, 5);
}

function rssCallBackEnd(start, end){
    var oData = {};
    oData.call = "RSS-Feed";
    oData.data =      "<requestName>RSS-Feed</requestName>" +
                            "<params>" +
                                "<startID>" + start + "</startID>" +
                                "<endID>" + end + "</endID>" +
                            "</params>";
    oData.callback = RSSCallback;
    oData.type = "POST";
    ajaxCall(oData);
}

function RSSCallback(oData){    
    if (oData.childNodes[1].childNodes[1].childNodes.length > 0) 
    {
        transform2(oData, 'xsl/rssfeednasa.xsl',"mySidebar"); // XSL transformation
        bRSSStart = true;
        // console.log("RSS-Feed");       
    }
    else
    {        
        if (bRSSStart) 
            rssClick(-1); //if element is empty go one page back
        else
            setTimeout(rssCall, 5000); //try to call again if empty
    }
}
