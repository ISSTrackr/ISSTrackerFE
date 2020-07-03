var ajaxCall = function(oData){    
    if(!oData.e)
        oData.e= "";
    if (oData.type == "POST")
     oData.data = "<?xml version='1.0' encoding='UTF-8'?>" + '<!DOCTYPE Request SYSTEM "./DTD/' + oData.call +'.dtd">' + oData.data;
    $.ajax({
        url: 'https://iss-trackr-api.azurewebsites.net/' + oData.call,
        data: oData.data,
        type: oData.type,
        crossDomain: true,
        dataType: 'xml',
        success: function() { console.log(oData.call + " Success!") },
        error: function() { console.log(oData.call + ' Failed!');
                            return; },
        complete: function(oReturnData){ oData.callback(oReturnData, oData.e); }
    });
}
