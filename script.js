// Select the button and content elements
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Function to make the assistant speak
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = 'hi-GB';
    window.speechSynthesis.speak(text_speak);
}

// Function to greet the user based on the time of day
function wishme() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Hello, GoodMorning");
    } else if (hours >= 12 && hours < 16) {
        speak("Hello, GoodAfternoon ");
    } else {
        speak("Hello, GoodEvening ");
    }
}
window.addEventListener('load',() =>{
    wishme()
})
// Initialize Speech Recognition
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript; // Display the spoken text
    takeCommand(transcript.toLowerCase());
};

// Event listener to start speech recognition when the button is clicked
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

// Function to process the spoken command
function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey") || message.includes("hii")) {
        speak("Hello Ma'am, what can I help you with?");
    } 
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Saloni Ma'am.");
    } 
    else if (message.includes("how are you")) {
        speak("I am fine, what about you");
    } 
    else if (message.includes("can you give me a answer")) {
        speak("yes,  very well");
    } 
    else if (message.includes("i love you")) {
        speak("I love you so much, Saloni baby, you are so cute, beautiful, you are mine only, no one can like you ");
    } 
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/");
    }
     else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://"); // Note: This may not work in all browsers
    }
     else {
        let searchQuery = message.replace(/Vaibhav|web|app/gi, "").trim();
        let finalText = `This is what I found on the internet regarding ${searchQuery}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${searchQuery}`);
    }
}
