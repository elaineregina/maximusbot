function MessageText(textResponse, number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,    
        "text": {
            "preview_url": true,
            "body": textResponse
        },
        "type": "text"
    });
    return data;
}
// function MessageButton(number) {
//   const data = JSON.stringify({
//     messaging_product: "whatsapp",
//     to: number,
//     type: "interactive",
//     interactive: {
//       type: "button",
//       body: {
//         text: "O que você está buscando nesse momento?",
//       },
//       action: {
//         buttons: [
//           {
//             type: "reply",
//             reply: {
//               id: "001",
//               title: "CARDIOVASCULAR",
//             },
//           },
//           {
//             type: "reply",
//             reply: {
//               id: "002",
//               title: "MOBILIDADE",
//             },
//           },
//           {
//             type: "reply",
//             reply: {
//               id: "003",
//               title: "FORTALECIMENTO",
//             },
//           },
//         ],
//       },
//     },
//   });
//   return data;
// }

module.exports = {
  MessageText,
};
