
// Toggles function for sound icons when clicked upon
const audio = new Audio('assets/audio/heartbeat-sound.mp3');
const soundOn = document.getElementById('sound-on');
const soundOff = document.getElementById('sound-off');

function toggleSound() {
    if (audio.paused) {
        audio.play();
        soundOn.style.display = ('inline-block');
        soundOff.style.display = ('none');
    } else {
        audio.pause();
        soundOn.style.display = ('none');
        soundOff.style.dispaly = ('inline-block');
    }
}

// Click event listenters to sound icons
soundOn.addEventListener('click', toggleSound);
soundOff.addEventListener('click', toggleSound);

// Hides the sound-on icon
soundOn.style.display = 'none';



// Quiz questions
const questions = [
    {
        question: "What is the largest organ in the human body?",
        answers: [
            { text: "Heart", correct: false},
            { text: "Lungs", correct: false},
            { text: "Skin", correct: true},
            { text: "Liver", correct: false},
        ]
    },

]



