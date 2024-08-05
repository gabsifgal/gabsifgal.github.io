function hexToBase64(hexstring) {
    return btoa(hexstring.match(/\w{2}/g).map(function(a) {
        return String.fromCharCode(parseInt(a, 16));
    }).join(""));
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

async function getToken(){
    var bodyToken = {
        "grant_type": "client_credentials",
        "scope": "https://api.sunat.gob.pe/v1/contribuyente/contribuyentes",
        "client_id": GetURLParameter("client_id"),
        "client_secret": hexToBase64(GetURLParameter("client_secret"))
    };
    var formBody = [];
    for (var property in bodyToken) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(bodyToken[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    tokenResponse = await fetch("https://api-seguridad.sunat.gob.pe/v1/clientesextranet/".concat(
        GetURLParameter("client_id"),"/oauth2/token/"),{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
    token = await tokenResponse.json()
    token = await token.access_token
    document.getElementById("response").innerText = token;
}