var ajaxCall = function(oData){    
    if(!oData.e)
        oData.e= "";
    if (oData.type == "POST")
    {
     oData.data = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>' + '<!DOCTYPE Request SYSTEM \'./DTD/' + oData.call + '.dtd\'>' + oData.data;
        $.ajax({
            url: 'https://iss-trackr-api.azurewebsites.net/' + oData.call,        
            data: oData.data,
            type: oData.type,
            headers: {
                "Content-Type": "text/xml",
                "Access-Control-Allow-Origin": "*"
              },
            crossDomain: true,
            dataType: 'xml',
            success: function(oReturnData) { console.log(oData.call + " Success!")
                                            oData.callback(oReturnData, oData.e); },
            error: function(oReturnData) { console.log(oData.call + ' Failed!'); }      
        });
    }
    else
    {
        $.ajax({
            url: 'https://iss-trackr-api.azurewebsites.net/' + oData.call,        
            data: oData.data,
            type: oData.type,            
            crossDomain: true,
            dataType: 'xml',
            success: function(oReturnData) { console.log(oData.call + " Success!")
                                            oData.callback(oReturnData, oData.e); },
            error: function(oReturnData) { console.log(oData.call + ' Failed!'); }      
        });
    }

}

