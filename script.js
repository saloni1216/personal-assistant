// Select elements
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Function to make the assistant speak
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

// Function to greet the user based on the time of day
function wishme() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning, I am Alex. How can I help you?");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon, I am Alex. How can I assist?");
    } else {
        speak("Good Evening, I am Alex. How may I help you?");
    }
}
window.addEventListener('load', wishme);

// Initialize Speech Recognition
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript;
    content.innerText = transcript; // Display the spoken text
    takeCommand(transcript.toLowerCase());
};

// Event listener to start speech recognition
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

// Error handling for Speech Recognition
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    speak("Sorry, I didn't catch that. Please try again.");
    btn.style.display = "flex";
    voice.style.display = "none";
};

// Function to process the spoken command
function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello, how can I help?");
    } 
    else if (message.includes("who are you") || message.includes("tell me about yourself")) {
        speak("I am Alex, a virtual assistant created by Saloni Singh.");
    } 
    else if (message.includes("how are you")) {
        speak("I am fine. How about you?");
    } 
    else if (message.includes("what is your name") || message.includes("what's your name")) {
        speak("My name is Alex. I'm a virtual assistant.");
    } 
    else if (message.includes("what can you do")) {
        speak("I can chat with you and answer some simple questions.");
    }
    else if (message.includes("tell me a joke")) {
        speak("Why did the chicken go to the seance? To get to the other side.");
    }
    else if (message.includes("can you give me an answer")) {
        speak("Yes, I'll do my best to help.");
    } 
    else if (message.includes("i love you")) {
        speak("I love you too!");
    } 
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/");
    }
    else {
        let searchQuery = message.replace(/Alex|web|app/gi, "").trim();
        let finalText = `This is what I found on the internet about ${searchQuery}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${searchQuery}`);
    }
}
