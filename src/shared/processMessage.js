const whatsappModel = require("../shared/whatsappModel");
const whatsappService = require("../service/whatsappService");
const chatGPTService = require("../service/chatgpt-service");

async function Process(textUser, number) {
  textUser = textUser.toLowerCase();
  var models = [];

  try {
    const resultChatGpt = await chatGPTService.GetMessageChatGPT(textUser); 

    if (resultChatGpt != null) {
      var model = whatsappModel.MessageText(resultChatGpt, number);
      models.push(model);
    } else {
      models.push(whatsappModel.MessageText("algo deu errado", number));
    }
  } catch (error) {
    console.error("Erro no processamento:", error.message);
    models.push(
      whatsappModel.MessageText("Erro ao processar a mensagem.", number)
    );
  }

  models.forEach((model) => {
    whatsappService.SendMessageWhatsApp(model);
  });
  return models;
}

//TESTE CHATGPT 01
// async function Process(textUser, number)
//   console.log("Texto recebido:", textUser);
//   if (typeof textUser === "string") {
//     textUser = textUser.toLowerCase().trim();
//   } else if (Array.isArray(textUser) && textUser.length > 0) {
//     // Se for um array, pegue o primeiro elemento e assuma que é uma string
//     textUser = textUser[0].toLowerCase().trim();
//   } else {
//     // Se não for string nem array, ou se o array estiver vazio, retorne um erro ou uma mensagem padrão
//     console.error("textUser não é uma string ou um array válido");
//     return;
//   }

//   var models = [];

//   try {
//     // Interagir com a API da OpenAI e obter a resposta do assistente
//     // console.log("Chamando chatGPTService com:", textUser);
//     const resultChatGpt = await chatGPTService.GetMessageChatGPT(textUser);

//     if (resultChatGpt != null) {
//       var model = whatsappModel.MessageText(resultChatGpt, number);
//       models.push(model);
//     } else {
//       var model = whatsappModels.MessageText(
//         "Resposta do assistente não encontrada.",
//         number
//       );
//       models.push(model);
//     }
//   } catch (error) {
//     console.error("Erro ao obter resposta do assistente:", error);
//     var model = whatsappModels.MessageText(
//       "Algo saiu errado, tente mais tarde.",
//       number
//     );
//     models.push(model);
//   }

//# sem chagpt
// if (textUser.includes("olá")) {
//   var model = whatsappModels.MessageText("Olá, bom te ver", number);
//   models.push(model);
//   var modelButton = whatsappModels.MessageButton(number);
//   models.push(modelButton);
// } else if (
//   textUser.includes("Tchau") ||
//   textUser.includes("Show") ||
//   textUser.includes("Valeu")
// ) {
//   var model = whatsappModels.MessageText("Bons treinos", number);
//   models.push(model);
// } else {
//   var model = whatsappModels.MessageText("Não Compreendi", number);
//   models.push(model);
// }
module.exports = {
  Process,
};
