
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
        soundOff.style.display = ('inline-block');
    }
}


// Click event listenters to sound icons
soundOn.addEventListener('click', toggleSound);
soundOff.addEventListener('click', toggleSound);

// Hides the sound-on icon
soundOn.style.display = 'none';


//Connect the html id:s and elements to variables
const startQuiz = document.getElementById('start-button');
const quizBoard = document.getElementById('quiz-board');
const answerButtons = document.getElementById('answer-btns');
const nextButton = document.getElementById('next-button');
const questionArea = document.getElementById('question-area');
const questionQuiz = document.getElementById('questions');
const countScore = document.getElementById('score');
const resultBoard = document.getElementById('results');
const scoreNumber = document.getElementById('scorenumber');
const scoreText = document.getElementById('score-text');
const finishedText = document.getElementById('finished');
const welcomeId = document.getElementById('welcome-id');

let score = 0;
let currentQuestionIndex = 0;
let shuffledQuestions;
let numberOf = 1;
let maxQuestions = 10;


// Event Listener to start the quiz
startQuiz.addEventListener('click', startTheQuiz)

function startTheQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  startQuiz.classList.add('hide');
  welcomeId.classList.add('hide');
  quizBoard.classList.remove('hide');
  // Sort method to shuffle the questions is used from:https://www.youtube.com/watch?v=riDzcEQbX6k
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  presentQuestions();
}

//Displays the quiz questions
function presentQuestions() {
    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    quizBoard.classList.remove('hide');
    questionNumber = currentQuestionIndex + 1;
    questionQuiz.textContent = currentQuestion.question;
    questionArea.textContent = `Question ${numberOf} out of ${maxQuestions}`;
    numberOf++;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.textContent = answers.text;
        button.classList.add("answer-btns");
        answerButtons.appendChild(button);
    });
}

//Next question
nextButton.addEventListener('click', nextQuestion);

function nextQuestion() {
    currentQuestionIndex += 1;
    if(currentQuestionIndex < questions.length) {
    resetAnswers();
    presentQuestions();
    } else {
        quizBoard.classList.add('hide');
        resultBoard.classList.remove('hide');
    }
}
//This will remove the previous answers
function resetAnswers() {
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Functions to display the correct answer
function showAnswers(answers) {
    const buttons = Array.from(answerButtons.children);

    buttons.forEach((button, index) => {
        button.dataset.correct = answers[index].correct;
        button.addEventListener('click', () => checkAnswer(button));
    });
}

function checkAnswer(button) {
    const isCorrect = button.dataset.correct === 'true';

    if(isCorrect) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
    }
}


// Quiz questions
const questions = [
    { //Question 1
        question: "What is the largest organ in the human body?",
        answers: [
            { text: "Heart", correct: false},
            { text: "Lungs", correct: false},
            { text: "Skin", correct: true},
            { text: "Liver", correct: false},
        ]
    },
    { //Question 2
        question: "Wich of the following is responsible for pumping blood through the body?",
        answers: [
            { text: "Liver", correct: false},
            { text: "Stomach", correct: false},
            { text: "Kidneys", correct: false},
            { text: "Heart", correct: true},
        ]
    },
    { //Question 3
        question: "What is the primary function of the respiratory system?",
        answers: [
            { text: "Digestion", correct: false},
            { text: "Circulation", correct: false},
            { text: "Breathing", correct: true},
            { text: "Vision", correct: false},
        ]
    },
    { //Question 4
        question: "How many bones does the human body have?",
        answers: [
            { text: "213", correct: false},
            { text: "187", correct: false},
            { text: "206", correct: true},
            { text: "167", correct: false},
        ]
    },
    { //Question 5
        question: "What is the smallest unit of a muscle fiber?",
        answers: [
            { text: "Myocardium", correct: false},
            { text: "Sarcomere", correct: true},
            { text: "Tendon", correct: false},
            { text: "Ligament", correct: false},
        ]
    },
    { //Question 6
        question: "Which part of the brain is responsible for regulating basic life functions like breathing and heartbeat?",
        answers: [
            { text: "Medulla oblongata", correct: true},
            { text: "Frontal lobe", correct: false},
            { text: "Cerebellum", correct: false},
            { text: "Thalamus", correct: false},
        ]
    },
    { //Question 7
        question: "How many chambers are there in the human heart?",
        answers: [
            { text: "1", correct: false},
            { text: "2", correct: false},
            { text: "3", correct: false},
            { text: "4", correct: true},
        ]
    },
    { //Question 8
        question: "What is the main function of the kidneys?",
        answers: [
            { text: "To produce insulin", correct: false},
            { text: "To filter blood and remove waste products", correct: true},
            { text: "To digest food", correct: false},
            { text: "To regulate body temperature", correct: false,}
        ]
    },
    { //Question 9
        question: "Which gland in the human body regulates metabolism?",
        answers: [
            { text: "Thyroid gland", correct: true},
            { text: "Adrenal gland", correct: false},
            { text: "Pancreas", correct: false},
            { text: "Pituitary gland", correct: false,}
        ]
    },
    { //Question 10
        question: "What is the function of the cochlea in the ear?",
        answers: [
            { text: "Balancing", correct: false},
            { text: "Smelling", correct: false},
            { text: "Hearing", correct: true},
            { text: "Tasting", correct: false,}
        ]
    },
]



