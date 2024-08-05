function validarComprobanteSUNAT(){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", concat(
        "https://api-seguridad.sunat.gob.pe/v1/clientesextranet/",
        document.getElementById("client_id").innerText,
        "/oauth2/token/"
    ));
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    
    const bodyToken = JSON.stringify({
        grant_type: "client_credentials",
        scope: "https://api.sunat.gob.pe/v1/contribuyente/contribuyentes",
        client_id: "96418da2-b6b2-4625-b03b-ae48b45ace51",
        client_secret: "nWZlYDYEKVC9SbVxuiyO3Q=="
      });
      xhr.send(bodyToken);
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 201) {
          token = JSON.parse(xhr.responseText).access_token;
          alert(token)
        } else {
          alert("Error")
        }
      };
      
    
    const xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "https://api.sunat.gob.pe/v1/contribuyente/contribuyentes/10712900801/validarcomprobante");
    xhr2.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    
    const body = JSON.stringify({
        numRUC: "20608280333",
        codComp: "03",
        numeroSerie: "BA81",
        numero: "01062239",
        fechaEmision: "03/08/2024",
        monto: "9.90"
      });
      xhr2.setRequestHeader("Authorization", concat("Bearer ",token));
      xhr2.send(body);
      xhr2.onload = () => {
        if (xhr2.readyState == 4 && xhr2.status == 201) {
            document.getElementById("response").innerText = xhr.responseText
        } else {
          console.log(`Error: ${xhr2.status}`);
        }
      };
      
      
}