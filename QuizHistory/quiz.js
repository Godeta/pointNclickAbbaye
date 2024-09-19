let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Load questions from the selected language file
async function loadQuestions(language) {
  const response = await fetch(`../${language}.json`);
  const data = await response.json();
  questions = data.quizQuestions; // Access the quizQuestions array
  startQuiz();
}

// Start the quiz
function startQuiz() {
  score = 0; // Reset score for a new quiz
  currentQuestionIndex = 0; // Reset question index
  showQuestion();
}

// Show the current question
function showQuestion() {
  const questionContainer = document.getElementById('question-container');
  const choicesContainer = document.getElementById('choices-container');
  const nextButton = document.getElementById('next-button');

  // Check if there are questions to display
  if (questions.length === 0) {
    questionContainer.innerHTML = "No questions available.";
    choicesContainer.innerHTML = "";
    return;
  }

  questionContainer.innerHTML = questions[currentQuestionIndex].question;
  choicesContainer.innerHTML = '';

  questions[currentQuestionIndex].choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.innerText = choice;
    button.onclick = () => selectAnswer(index);
    choicesContainer.appendChild(button);
  });

  nextButton.style.display = 'none';
}

// Handle answer selection
function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correctIndex;
  if (selectedIndex === correctIndex) {
    score++;
  }

  const nextButton = document.getElementById('next-button');
  nextButton.style.display = 'block';
  nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  };
}

// Show the final score
function showScore() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `<h2>Your Score: ${score} out of ${questions.length}</h2>`;
  
  const restartButton = document.createElement('button');
  restartButton.innerText = "Restart Quiz";
  restartButton.onclick = () => {
    // Clear the quiz container and restart
    quizContainer.innerHTML = `
      <h1 id="quiz-title">Quiz Game</h1>
      <div id="question-container"></div>
      <div id="choices-container"></div>
      <button id="next-button" style="display: none;">Next</button>
      <div id="score-container" style="display: none;"></div>
    `;
    loadQuestions(navigator.language.startsWith('fr') ? 'fr' : 'en');
  };
  
  quizContainer.appendChild(restartButton);
}

// Load the questions based on the user's language preference
const userLanguage = navigator.language.startsWith('fr') ? 'fr' : 'en';
loadQuestions(userLanguage);