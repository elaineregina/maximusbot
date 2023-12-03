const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

async function GetMessageChatGPT(text) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // // Função para encapsular a lógica de interação com a API da OpenAI
  // const chatGPTService = async () => {
  //   try {
  //     // Recuperar um assistente
  //     const myAssistant = await openai.beta.assistants.retrieve(
  //       "asst_rjkua1qK8gAj5OU504OL7eQ1"
  //     );
  //     console.log("Assistant:", myAssistant);

  //     // Criar uma thread
  //     const thread = await openai.beta.threads.create();
  //     console.log("Empty Thread:", thread);

  //     // criar messages

  //     const threadMessages = await openai.beta.threads.messages.create(
  //       thread.id,
  //       {
  //         role: "user",
  //         content: "Oie. Aqui é o Maximus.",
  //       }
  //     );

  //     const run = await openai.beta.threads.runs.create(thread.id, {
  //       assistant_id: myAssistant.id,
  //     });

  //     //     // Recuperar uma thread
  //     //     const threadId = emptyThread.id; // Utilizar o ID da thread recém-criada
  //     //     const myThread = await openai.threads.retrieve(threadId);
  //     //     console.log("Thread:", myThread);

  //     //     // Recuperar mensagens de uma thread
  //     //     // Neste caso, vamos supor que é a última mensagem da thread que acabamos de criar
  //     //     const messageId = myThread.messages[myThread.messages.length - 1].id;
  //     //     const message = await openai.messages.retrieve(threadId, messageId);
  //     //     console.log("Message:", message);

  //     //     // Retornar o assistente, thread e mensagem recuperados
  //     return { myAssistant, thread, threadMessages };
  //   } catch (error) {
  //     console.error("Error in chatGPTService:", error);
  //     return { error: error.message };
  //   }
  //   if (response.status == 200 && createResponseHeaders.data.choice.length > 0)
  //   return response,data,chouces[0].text;

  //   return null;
  // }

  try {
    const myAssistant = await openai.beta.assistants.retrieve(
      "asst_rjkua1qK8gAj5OU504OL7eQ1"
    );
    console.log("Assistant:", myAssistant);

    const thread = await openai.beta.threads.create();
    console.log("Empty Thread:", thread);

    const threadMessages = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: text, // Supondo que 'text' é a mensagem que você quer enviar ao assistente
      }
    );

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: myAssistant.id,
    });

    // Processar a resposta aqui
    // TODO: Substituir 'response' e 'createResponseHeaders' pelas variáveis corretas
    // Se 'run' ou 'threadMessages' contiver a resposta, você deve processá-la aqui

    // Exemplo de retorno, ajuste de acordo com a estrutura real da resposta
    if (run.status == 200 && run.data.choice.length > 0) {
      return run.data.choices[0].text;
    }

    return null;
  } catch (error) {
    console.error("Error in chatGPTService:", error);
    return { error: error.message };
  }
}

module.exports = {
  GetMessageChatGPT,
};
