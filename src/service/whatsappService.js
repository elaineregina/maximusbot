const https = require ("https");

function SendMessageWhatsApp (textResponse, number){
    const data = JSON.stringify({
    messaging_product: "whatsapp",
    timestamp: Math.floor(Date.now() / 1000),
    to: number,
    text: {
        body: textResponse
},
    "type": "text",
});
    const options = {
        host: "graph.facebook.com",
        path: "/v17.0/ID_HERE/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer TOKEN_HERE"
        }
    };
    const req = https.request(options, res => {res.on ("data", d=> {
        process.stdout.write(d);
    })});

    req.on("error", error => (
      console.error(error)
    ));
        req.write(data);
        req.end();
}
module.exports = {
    SendMessageWhatsApp
}

