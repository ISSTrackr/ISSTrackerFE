// jQuery AJAX call to back end. 

var ajaxCall = function(oData){
    var date = new Date;    // date for time stamp
    if(!oData.e) // if event is associated with call
        oData.e= "";
    if (oData.type == "POST") // post call
    {
     oData.data =   '<?xml version=\'1.0\' encoding=\'UTF-8\'?>' + 
                    '<!DOCTYPE Request SYSTEM \'./DTD/' + oData.call + '.dtd\'>' + 
                    "<Request>" +
                       oData.data +
                    "</Request>";
        $.ajax({
            crossDomain: true, // CORS
            contentType: "application/xml; charset=utf-8",    
            type: oData.type,
            url: 'https://iss-trackr-api.azurewebsites.net/' + oData.call,        
            xml: "application/xml",
            dataType: 'xml',
            cache: false,
            headers: {  'Access-Control-Allow-Origin': 'https://iss-trackr-api.azurewebsites.net/' + oData.call},   // CORS
            data: oData.data,
            success: function(oReturnData) { console.log(date.toLocaleTimeString() + " | " +  oData.call + " Success!")
                                            oData.callback(oReturnData, oData.e); },
            error: function(oReturnData) {  console.log(oData.call + ' Failed!');
                                            oData.callback("error", "");
                                            console.log(oReturnData) }      
        });
    }
    else // get call
    {
        $.ajax({
            crossDomain: true,  // CORS        
            type: oData.type,            
            url: 'https://iss-trackr-api.azurewebsites.net/' + oData.call, 
            xml: "application/xml",       
            dataType: 'xml',         
            success: function(oReturnData) { console.log(date.toLocaleTimeString() + " | " + oData.call + " Success!")
                                             oData.callback(oReturnData, oData.e); },
            error: function(oReturnData)   {console.log(oData.call + ' Failed!');                                         
                                            console.log(oReturnData) }   
        });
    }
}