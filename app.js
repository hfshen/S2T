const startBtn = document.getElementById("startBtn");
const chatWindow = document.getElementById("chatWindow");

startBtn.addEventListener("click", startListening);

let recognition;

async function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.lang = "ko-KR";
    recognition.interimResults = false;

    recognition.addEventListener("result", async (event) => {
        const text = event.results[0][0].transcript;
        addMessage(text, "user");

        if (text === "댕댕아") {
            const response = "네";
            speakAnswer(response);
            addMessage(response, "bot");
        } else {
            const answer = await findAnswerInWordFile(text);
            speakAnswer(answer);
            addMessage(answer, "bot");
        }
    });

    recognition.addEventListener("end", () => {
        recognition.start();
    });

    try {
        // 마이크 권한 요청
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
    } catch (error) {
        console.error("마이크 권한이 거부되었습니다.", error);
        return;
    }

    recognition.start();
}

startListening();


async function findAnswerInWordFile(question) {
    // 워드 파일에서 답변을 찾는 예제 코드 (실제 구현에서는 파일을 검색하고 결과를 반환해야 합니다)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("워드 파일에서 찾은 답변: " + question);
        }, 1000);
    });
}

// 가져온 답변을 음성으로 변환하여 재생
function speakAnswer(answer) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(answer);
    speechSynthesis.speak(utterance);
}

function addMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(sender);

    if (sender === "user") {
        messageElement.textContent = "You: " + message;
    } else if (sender === "bot") {
        messageElement.textContent = "Bot: " + message;
    }

    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}



recognition.addEventListener("result", async (event) => {
    const text = event.results[0][0].transcript;
    console.log("음성 인식 결과:", text); // 이 부분을 추가합니다.
    addMessage(text, "user");
    recognition.start();
    // ... 이전 코드 ...
});

function addMessage(text, sender) {
    const message = document.createElement("p");
    message.textContent = `[${sender}] ${text}`;
    document.getElementById("recognitionResult").appendChild(message);
}
