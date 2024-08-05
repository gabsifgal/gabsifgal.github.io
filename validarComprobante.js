

async function validarComprobanteSUNAT(){   
    var bodyToken = {
        numRuc: "20608280333",
        codComp: "03",
        numeroSerie: "BA81",
        numero: "01062239",
        fechaEmision: "03/08/2024",
        monto: "9.90"
    };
    token = getToken().then(function(value){
    console.log(value)
    fetch("https://api.sunat.gob.pe/v1/contribuyente/contribuyentes/miRUC/validarcomprobante",{
        method: 'POST',
        headers: {
            'Content-Type': "raw/json; charset=UTF-8",
            "Authorization": "Bearer ".concat(value)
        },
        body: JSON.stringify(bodyToken)
    })
    }).then(
        function(value){
            document.getElementById("response").value = value
            
        }
    )
}