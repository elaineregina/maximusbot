const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../shared/processMessage")

const VerifyToken = (req, res) => {
  try{
        var accessToken = "AHUHFSDJNVJDSVNOEIFNGLKFDNMB";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if(challenge != null && token != null && token == accessToken){
            res.send(challenge);
        }else{
            res.status(400).send();
        }
    }catch(e){
        res.status(400).send();
    }
}

const ReceivedMessage = (req, res) => {
    try{
        myConsole.log("1")
        var entry = (req.body["entry"])[0];
        myConsole.log("2")
        var changes = (entry["changes"])[0];
        myConsole.log("3")
        var value = changes["value"];
        myConsole.log("4")
        var messageObject = value["messages"];

        if(typeof messageObject != "undefined"){
            var messages = messageObject[0];
            var number = messages["from"];
            myConsole.log(number)


            var text = GetTextUser(messages);
            
            if(text != ""){
                processMessage.Process(text, number);
                myConsole.log("5")
            } 

        }        

        res.send("EVENT_RECEIVED");
    }catch(e){
        myConsole.log("6");
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages) {
    var text = "";
    var typeMessage =  messages ["type"];
    
    if (typeMessage == "text"){
        text = (messages ["text"])["body"];

    }else if (typeMessage == "interactive"){
        var interactiveObject = messages["interactive"];
        var typeInteractive = interactiveObject["type"];
        myConsole.log("7");
        

        if (typeInteractive == "button_reply"){
            text = (interactiveObject ["button_reply"])["title"];
            myConsole.log("8");

        }else if (typeInteractive == "list_reply"){
            text = (interactiveObject ["list_reply"])["title"];
            myConsole.log("9");

        }else{
            myConsole.log("Sem Mensagens")
        }

    }else {
        myConsole.log("Sem Mensagens")
    }
    return text;
}   


module.exports = {
  VerifyToken,
  ReceivedMessage,
};
