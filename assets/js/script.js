
/**
 * Change the sound icon when user clicks on it
 * and play sound and vice versa.
 */
const audio = new Audio('assets/audio/heartbeat-sound.mp3');
const soundOn = document.getElementById('sound-on');
const soundOff = document.getElementById('sound-off');

function playSound() {
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


//Click event listenters to sound icons
soundOn.addEventListener('click', playSound);
soundOff.addEventListener('click', playSound);

//Hides the sound-on icon
soundOn.style.display = 'none';

/**
 * Function to display info-text when user clicks on the i/about-button

const infoText = document.getElementById('about-text');
infoText.addEventListener('click', howToPlay);

function howToPlay() {
   
    if (infoText.style.display === 'none') {
        infoText.style.display = 'inline-block';
    } else {
        infoText.style.display = 'none';
    }
}
 */

const modalBox = document.getElementById('modal-box');
const infoButton = document.getElementById('info-btn');
const closeButton = document.getElementById('close-box');

infoButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

function openModal () {
    modalBox.style.display = 'inline-block';
}

function closeModal () {
    modalBox.style.display = 'none';
}


window.addEventListener('click', function (event) {
    if (event.target === modalBox) {
        closeModal();
    }
});

//Connect the html id:s and elements to variables
const startEasy= document.getElementById('start-easy');
const startMedium = document.getElementById('start-medium');
const startHard = document.getElementById('start-hard');
const quizBoard = document.getElementById('quiz-board');
const answerButtons = document.getElementById('answer-btns');
const nextButton = document.getElementById('next-button');
const questionArea = document.getElementById('question-area');
const questionQuiz = document.getElementById('questions');
const countScore = document.getElementById('score');
const resultBoard = document.getElementById('results');
const scoreNumber = document.getElementById('scorenumber');
const finishedText = document.getElementById('feedback-text');
const welcomeId = document.getElementById('welcome-id');


let score = 0;
let currentQuestionIndex = 0;
let shuffledQuestions;
let numberOf = 1;
let maxQuestions = 10;
let difficultyLevel;


/**
 * Event Listeners for each level button on startpage
 * and the level being passed to the StartTheQuiz function
 */
startEasy.addEventListener('click', () => startTheQuiz('easy'));
startMedium.addEventListener('click', () => startTheQuiz('medium'));
startHard.addEventListener('click', () => startTheQuiz('hard'));


// Function with the actions once the quiz has started
function startTheQuiz(level) {
  currentQuestionIndex = 0;
  score = 0;
  startEasy.classList.add('hide');
  startMedium.classList.add('hide');
  startHard.classList.add('hide');
  welcomeId.classList.add('hide');
  resultBoard.classList.add('hide');
  quizBoard.classList.remove('hide');

//This will set the correct array of questions upon start
 if (level === 'easy') {
    difficultyLevel = questionsEasy;
 } else if (level === 'medium')  {
    difficultyLevel = questionsMedium;
 } else if (level === 'hard') {
    difficultyLevel = questionsHard;
 }
 // The questions will be presented in a randomized order
  shuffledQuestions = difficultyLevel.sort(() => Math.random() - .5);
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

    resetAnswers();

    /** Iterates through the an array with answers 
     * Creates the answer buttons with corresponding CSS
     * Sets the text content of the corresponding answer to the butotn
    */
    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.textContent = answers.text;
        button.classList.add("answer-btns");
        answerButtons.appendChild(button);
    });
   showAnswers(currentQuestion.answers);
}

//Next question
nextButton.addEventListener('click', nextQuestion);

function nextQuestion() {
    currentQuestionIndex += 1;
    if(currentQuestionIndex < shuffledQuestions.length) {
        resetAnswers();
        presentQuestions();
    } else {
        quizBoard.classList.add('hide');
        resultBoard.classList.remove('hide');
        // Present the user with different feedback depending on the score.
        if (score >= 0 && score <= 5) {
            finishedText.textContent =`You answered ${score} out of ${maxQuestions} questions right. Give it another go!`;
        } else if (score > 5 && score <=8) {
            finishedText.textContent =`You answered ${score} out of ${maxQuestions} questions right. Nicely done!`;
        } else {
            finishedText.textContent =`You answered ${score} out of ${maxQuestions} questions right. Exellent job!`;
        }
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
        button.disabled = false;
    });
}

/**
 * Increment the score if answer is correct.
 * Displays green color if correct, and red color if incorrect
 * The for each loop will disable all the buttons
 */
function checkAnswer(button) {
    const isCorrect = button.dataset.correct === 'true';
    const buttons = Array.from(answerButtons.children);

    if(isCorrect) {
        button.classList.add('correct');
        score++;
        countScore.textContent = `Score: ${score}/10`;
    } else {
        buttons.forEach((button) => {
            if(button.dataset.correct === 'true') {
                button.classList.add('correct');  
            }    
        });
        button.classList.add('incorrect');
        
    }
    buttons.forEach((button) => {
        button.disabled = true;
    });
    /**
     * Adds a short delay before moving on to the next question
     * so the user have time to see if the answer was correct or not
    
    setTimeout(() => {
        nextButton.click();
    }, 1000); 
   */
}




// Easy questions
const questionsEasy = [
    { //Question 1
        level: 'easy',
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
        question: "Which gas do humans primarily exhale when they breathe out?",
        answers: [
            { text: "Oxygen", correct: false},
            { text: "Carbon dioxide", correct: true},
            { text: "Nitrogen", correct: false},
            { text: "Hydrogen", correct: false},
        ]
    },
    { //Question 6
        question: "Which part of the human body is commonly referred to as the 'windpipe' and carries air to the lungs?",
        answers: [
            { text: "Esophagus", correct: false},
            { text: "Bronchus", correct: false},
            { text: "Trachea", correct: true},
            { text: "Diaphragm", correct: false},
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
        question: "What is the name of the pigment responsible for the color of human skin, hair, and eyes?",
        answers: [
            { text: "Hemoglobin", correct: false},
            { text: "Carotene", correct: false},
            { text: "Melanin", correct: true},
            { text: "Collagen", correct: false,}
        ]
    },
    { //Question 10
        question: "Which of the following is not a taste sensation detected by the taste buds on the human tongue?",
        answers: [
            { text: "Sweet", correct: false},
            { text: "Sour", correct: false},
            { text: "Umami", correct: false},
            { text: "Crunchy", correct: true,}
        ]
    },
];


//Medium questions
const questionsMedium = [
    { //Question 1
        level: 'medium',
        question: "Which of the following bones is the longest in the human body?",
        answers: [
            { text: "Femur", correct: true},
            { text: "Tibia", correct: false},
            { text: "Radius", correct: false},
            { text: "Ulna", correct: false},
        ]
    },
    { //Question 2
        question: "Which of the following is not a type of white blood cell?",
        answers: [
            { text: "Neutrophil", correct: false},
            { text: "Lymphocyte", correct: false},
            { text: "Erythrocyte", correct: true},
            { text: "Monocyte", correct: false,}
        ]
    },
    { //Question 3
        question: "Which gland in the human body regulates metabolism?",
        answers: [
            { text: "Thyroid gland", correct: true},
            { text: "Adrenal gland", correct: false},
            { text: "Pancreas", correct: false},
            { text: "Pituitary gland", correct: false,}
        ]
    },
    { //Question 4
        question: "What is the function of the cochlea in the ear?",
        answers: [
            { text: "Balancing", correct: false},
            { text: "Smelling", correct: false},
            { text: "Hearing", correct: true},
            { text: "Tasting", correct: false,}
        ]
    },
      //Question 5
    {   question: "What is the primary function of the cerebellum in the brain?",
        answers: [
            { text: "Memory storage", correct: false},
            { text: "Vision processing", correct: false},
            { text: "Emotional regulation", correct: false},
            { text: "Balance and coordination", correct: true,}
        ]
    },
    //Question 6
    {   question: "Which part of the human eye allows us to see in dim light and is responsible for black and white vision?",
        answers: [
            { text: "Iris", correct: false},
            { text: "Retina", correct: true},
            { text: "Cornea", correct: false},
            { text: "Sclera", correct: false,}
        ]
    },
    //Question 7
    {   question: "What is the medical term for the 'voice box' located in the human throat?",
        answers: [
            { text: "Larynx", correct: true},
            { text: "Pharynx", correct: false},
            { text: "Trachea", correct: false},
            { text: "Esophagus", correct: false,}
        ]
    },
    { //Question 8
        question: "Which part of the brain is responsible for regulating basic life functions like breathing and heartbeat?",
        answers: [
            { text: "Medulla oblongata", correct: true},
            { text: "Frontal lobe", correct: false},
            { text: "Cerebellum", correct: false},
            { text: "Thalamus", correct: false},
        ]
    },
    { //Question 9
        question: "What is the smallest unit of a muscle fiber?",
        answers: [
            { text: "Myocardium", correct: false},
            { text: "Sarcomere", correct: true},
            { text: "Tendon", correct: false},
            { text: "Ligament", correct: false},
        ]
    },
    { //Question 10
        question: "What is the name of the liquid that lubricates joints and helps reduce friction between bones?",
        answers: [
            { text: "Mucus", correct: false},
            { text: "Lymph", correct: false},
            { text: "Bile", correct: false},
         { text: "Synovial fluid", correct: true},
        ]
    },
];

//Hard questions
const questionsHard = [
    { //Question 1
        level: 'hard',
        question: "What is the medical term for the voice disorder characterized by the involuntary shaking or trembling of the vocal cords during speech?",
        answers: [
            { text: "Dysphagia", correct: false},
            { text: "Aphonia", correct: false},
            { text: "Dysarthria", correct: false},
            { text: "Spasmodic dysphonia", correct: true},
        ]
    },
    { //Question 2
        question: "In the human brain, what is the primary role of the prefrontal cortex, which is responsible for higher-level cognitive functions?",
        answers: [
            { text: "Memory storage", correct: false},
            { text: "Motor coordination", correct: false},
            { text: "Decision-making and personality", correct: true},
            { text: "Visual processing", correct: false,}
        ]
    },
    { //Question 3
        question: "What is the rare, hereditary disorder that causes the body to produce abnormally thick mucus, affecting the respiratory and digestive systems?",
        answers: [
            { text: "Cystic fibrosis", correct: true},
            { text: "Huntington's disease", correct: false},
            { text: "Hemophilia", correct: false},
            { text: "Tay-Sachs disease", correct: false,}
        ]
    },
    { //Question 4
        question: "Which of the following blood types is considered the universal recipient, meaning it can receive blood from any blood type?",
        answers: [
            { text: "A+", correct: false},
            { text: "AB+", correct: true},
            { text: "O+", correct: false},
            { text: "B-", correct: false,}
        ]
    },
      //Question 5
    {   question: "What is the medical term for the condition where there is a loss of bone density, leading to brittle and fragile bones?",
        answers: [
            { text: "Arthritis", correct: false},
            { text: "Osteoarthritis", correct: false},
            { text: "Osteoporosis", correct: true},
            { text: "Rheumatoid arthritis", correct: false,}
        ]
    },
    //Question 6
    {   question: "The pineal gland in the brain is responsible for the secretion of which hormone that helps regulate the body's circadian rhythm?",
        answers: [
            { text: "Melatonin", correct: true},
            { text: "Insulin", correct: false},
            { text: "Growth hormone", correct: false},
            { text: "Calcitonin", correct: false,}
        ]
    },
    //Question 7
    {   question: "Which of the following glands is known as the 'master gland' and controls the functions of other endocrine glands in the body?",
        answers: [
            { text: "Thyroid gland", correct: false},
            { text: "Pituitary gland", correct: true},
            { text: "Adrenal gland", correct: false},
            { text: "Parathyroid gland", correct: false,}
        ]
    },
    { //Question 8
        question: "What is the condition in which the body's immune system attacks its own healthy tissues and organs, resulting in inflammation and damage?",
        answers: [
            { text: "Multiple sclerosis", correct: false},
            { text: "Rheumatoid arthritis", correct: false},
            { text: "Crohn's disease", correct: false},
            { text: "Lupus", correct: true},
        ]
    },
    { //Question 9
        question: "The cranial nerve responsible for the sense of smell is known as:",
        answers: [
            { text: "Vestibulocochlear nerve", correct: false},
            { text: "Optic nerve", correct: false},
            { text: "Trigeminal nerve", correct: false},
            { text: "Olfactory nerve", correct: true},
        ]
    },
    { //Question 10
        question: "The condition known as 'amblyopia' is often referred to by what common name?",
        answers: [
            { text: "Lazy eye", correct: true},
            { text: "Nearsightedness", correct: false},
            { text: "Farsightedness", correct: false},
            { text: "Color blindness", correct: false},
        ]
    },
];
