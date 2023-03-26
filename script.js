const chatbotMessages = document.querySelector(".chatbot-messages");
const chatbotInput = document.querySelector(".chatbot-input input");
const chatbotButton = document.querySelector(".chatbot-input button");
let etapaAtual = "mensagem-inicial";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Etapa atual:", localStorage.getItem("etapa-atual"))
  console.log("Histórico:", localStorage.getItem("historico-conversa"))
  addMessage(
    `Deseja comecar o jogo?\n========================\n[1] Iniciar\n[2] Fechar\n[3] Continuar`,
    "bot"
  );

});

chatbotButton.addEventListener("click", () => {
  const userMessage = `${chatbotInput.value}`;
  const botMessage = getBotMessage(userMessage); 

  if (chatbotInput != "") {
    addMessage("CD:// " + userMessage, "user");
    addMessage(botMessage, "bot");
  }
  if(userMessage == 3){
    alert("Legal, vou carregar o histórico")
  }
  chatbotInput.value = "";
});

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    chatbotButton.click();
  }
});

function addMessage(message, type) {
  const chatbotMessage = document.createElement("div");
  chatbotMessage.classList.add("chatbot-message", "pulsating-cursor", type);

  if (type == "bot") {
    let tempText = "";
    let loopDeTexto = setInterval(() => {
      tempText += message[tempText.length];
      chatbotMessage.textContent = tempText;
      if (tempText == message) {
        clearInterval(loopDeTexto);
        chatbotMessage.classList.remove("pulsating-cursor");
      }
    }, 100);
  } else {
    chatbotMessage.textContent = message;
  }

  chatbotMessages.appendChild(chatbotMessage);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  localStorage.setItem('etapa-atual', etapaAtual);
  localStorage.setItem('historico-conversa', JSON.stringify(["teste", "teste"]));
}

function getBotMessage(message) {
  switch (etapaAtual) {
    case 'mensagem-inicial':
      if(message == "1") {
        etapaAtual = "fase-1";
        return "Bora comer capim!"
      }
      if(message == "2") {
        etapaAtual = "fim";
        return "O jogo acabou, você perdeu"
      }
      break;
    case "fim":
      return "O jogo já acabou cara, supera";
      break;
    case "fase-1": 
      if(message == 'sim'){
        etapaAtual = "fase-2"
        return "hmmmm capinzinho bao"
      }
      break;
    default:
      return "eu não entendi mano"
      break;
  }
  
}
