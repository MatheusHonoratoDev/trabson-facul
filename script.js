const chatbotMessages = document.querySelector(".chatbot-messages");
const chatbotInput = document.querySelector(".chatbot-input input");
const chatbotButton = document.querySelector(".chatbot-input button");
let etapaAtual = "mensagem-inicial";
let input = document.querySelector("#teste");

document.addEventListener("DOMContentLoaded", function () {
  console.log("Etapa atual:", localStorage.getItem("etapa-atual"));
  console.log("Histórico:", localStorage.getItem("historico-conversa"));
  addMessage(
    `Deseja comecar o jogo?\n========================\n[1] Iniciar\n[2] Fechar\n[3] Continuar`,
    "bot"
  );
});

chatbotButton.addEventListener("click", () => {
  const userMessage = `${chatbotInput.value}`;
  const botMessage = getBotMessage(userMessage);

  if (chatbotInput != "") {
    addMessage("CD:\\User> " + userMessage, "user");
    addMessage(botMessage, "bot");
  }
  if (userMessage == 3) {
    alert("Legal, vou carregar o histórico");
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
    input.disabled = true;
    let loopDeTexto = setInterval(() => {
      tempText += message[tempText.length];
      chatbotMessage.textContent = tempText;
      if (tempText == message) {
        clearInterval(loopDeTexto);
        chatbotMessage.classList.remove("pulsating-cursor");
        input.disabled = false;
        input.focus() 
      }
    }, 50);
  } else {
    chatbotMessage.textContent = message;
  }

  chatbotMessages.appendChild(chatbotMessage);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  localStorage.setItem("etapa-atual", etapaAtual);
  localStorage.setItem(
    "historico-conversa",
    JSON.stringify(["teste", "teste"])
  );
}

function getBotMessage(message) {
  switch (etapaAtual) {
    case "mensagem-inicial":
      if (message == "1") {
        etapaAtual = "fase-1";
        return "Bora comer capim! [1]sim [2]nao";
      }
      if (message == "2") {
        etapaAtual = "fim";
        return "O jogo acabou, você perdeu";
      } 
      else {
        return "Tem parada errada ai, pfv esolha uma opção:\n---------------------------\n[1] Iniciar\n[2] Fechar\n[3] Continuar";
      }
      break;

    case "fim":
      etapaAtual = "continua"
      return "O jogo já acabou cara, supera";
      break;
    case "continua":
      etapaAtual = "desenho"
      return "voce esta insistindo muito, realmente quer continuar? [Digite sim ou nao]"  
    break

    case "desenho":
      if (message == 'sim'){
        etapaAtual = "comecar"
      return `
      ───▄█▌─▄─▄─▐█▄
      ───██▌▀▀▄▀▀▐██
      ───██▌─▄▄▄─▐██
      ───▀██▌▐█▌▐██▀
      ▄██████─▀─██████▄
         CARREGANDO...`}
        else {
          etapaAtual = "mensagem-inicial"
          return "desistiu ne? se cagou de medo... \npfv esolha uma opção:\n---------------------------\n[1] Iniciar\n[2] Fechar\n[3] Continuar"
        }
    break
    case "fase-1":

      if (message == "1") {
        etapaAtual = "fase-2";
        return "hmmmm capinzinho bao quer mais?";
      } 
      if (message == "2"){
        return "fela diz sim"
      }
      else{
        return "mensagem nao encontrada";
      }
    
      break;

    case "fase-2":

    if (message == "sim") {
      etapaAtual = "mensagem-inicial";
      return "hmmmmmm eita capinzinho bao \nacabou o jogo parceiro. \n esolha uma opção:\n---------------------------\n[1] Iniciar\n[2] Fechar\n[3] Continuar";
    } else {
      return "mensagem nao encontrada \nhmmmm capinzinho bao quer mais?";
    }
    break;

    case "fase-3":
      etapaAtual = "mensagem-inicial";
      return "acabou o jogo parceiro.\n esolha uma opção:\n---------------------------\n[1] Iniciar\n[2] Fechar\n[3] Continuar"
    break;
    default:
      return "eu não entendi mano";
      break;
  }
}
