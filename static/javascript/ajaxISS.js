function ajaxISSCall(oData){
    var date = new Date;  
    $.ajax({
        crossDomain: true,            
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