const https = require ("https");

function SendMessageWhatsApp (textResponse, number){
    const data = JSON.stringify({
    "messaging_product": "whatsapp",
    "timestamp": Math.floor(Date.now() / 1000),
    "to": number,
    "text": {
        "body": textResponse
},
    "type": "text",
});
    const options = {
        host: "graph.facebook.com",
        path: "/v17.0/192706353914950/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAADWmvCQ6vABO1tf2f30owxiitZA4OevPwQ59pdLW56aEEess15D3l5MAB474ZCsFxZAFQshFQWuHNsUQgrcb8mpqHkHJFAOlP1VMcOljHc1gRMVnVjlee7W5kI6FoZAkRFAQFCjBjQpl2Mk1CvxZAeNCqNJxvXvBFeZBvHxLrHydowvMnogakxJLZBshLOk7S3"
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

