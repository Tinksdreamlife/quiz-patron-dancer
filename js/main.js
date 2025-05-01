/*----- constants -----*/

const PLAYERS = {
  player1: 'Patron',
  player2: 'Dancer',
};

/*----- state variables -----*/

let board;
let player;
let winner;
let correctScore = 0;
let handle;
let questionArray;

let patronQues = [
  {
    question: 'Patrons should tip dancers.',
    answers: ['True', 'False'],
    correctAnswer: 0, 
    playerAnswer: null,
    gameResponse: 'Tipping shows respect for the entertainer. It is part of club etiquette.'
  },
  {
    question: 'A patron must dress up to enter a club', 
    answers: ['True', 'False'],
    correctAnswer: 1,
    playerAnswer: null, 
    gameResponse: 'Proper hygeniene and dressing nicely is encouraged. But rarely is formal attire required!'
  },
  {
    question: 'You must be rich to visit a club', 
    answers: ['True', 'False'],
    correctAnswer: 1, 
    playerAnswer: null,
    gameResponse: 'You do not have to be wealthy, BUT this is not a free show! Tipping is proper etiquette.'
  },
  {
    question: 'A dancer WANTS to come home with you.',
    answers: ['True', 'False'],
    correctAnswer: 1,
    playerAnswer: null,
    gameResponse: 'Absolutely not, so do not ask. Enjoy the show, and then go home...alone.'
  },
  {
    question: 'If sitting at the stage, you should tip every dancer.', 
    answers: ['True', 'False'],
    correctAnswer: 0, 
    playerAnswer: null, 
    gameResponse: 'It is disrespectful to sit at the stage, and not show appreciation for the performance.'
  },
  {
    question: 'Patrons may take pictures of dancers on the stage.', 
    answers: ['True', 'False'],
    correctAnswer: 1,
    playerAnswer: null, 
    gameResponse: 'Not only is it poor etiquette, it is actually illegal in many states to take photos in a club.'
  },
];

let dancerQues = [
  {
    question: 'Patrons are required to tip dancers.',
    answers: ['True', 'False'],
    correctAnswer: 1,
    playerAnswer: null, 
    gameResponse: 'Patrons are NOT required to tip! But it IS proper ettiquette to tip to show appreciation.'
  },
  {
    question: 'Dancers must offer all club services to all club patrons',
    answers: ['True', 'False'],
    correctAnswer: 1,
    playerAnswer: null,
    gameResponse: 'Dancers may refuse to offer services to anyone for any reason.'
  },
  {
    question: 'You must have a “great” body to be a dancer.',
    answers: ['True', 'False'],
    correctAnswer: 1,
    playerAnswer: null, 
    gameResponse: 'There is no standard dancer look. Patrons enjoy performers of all shapes and sizes.'
  },
  {
    question: 'There is not much room for professional growth as a dancer.',
    answers: ['True', 'False'],
    correctAnswer: 1,
    playerAnswer: null,
    gameResponse: 'Dancers often expand into other areas, i.e. content creation. And many skills also translate well to other industries.'
  },
  {
    question: 'Patrons will always spend more based on looks rather than a connection.',
    answers: ['True', 'False'],
    correctAnswer: 1,
    playerAnswer: null,
    gameResponse: 'Many longtime patrons prefer a deeper connection with a performer.'
  },
  {
    question: 'Patrons may be interested in plus size dancers.',
    answers: ['True', 'False'],
    correctAnswer: 0,
    playerAnswer: null,
    gameResponse: 'Yes! Patrons love performers of all sizes, shapes, and backgrounds!'
  },
];

let curQuestions = [];
let curQuestionIdx = 0;
let correctAnswer;
let playerAnswer = null;

/*----- cached elements  -----*/

const player1Button = document.getElementById('player1');
const player2Button = document.getElementById('player2');
console.log(player1Button);

const playerChoiceSelection = document.getElementById('playerChoice');
const quizArea = document.getElementById('quiz-area');
const header3 = document.querySelector('h3');

const playAgainBtn = document.getElementById('play-again');


/*----- event listeners -----*/

player1Button.addEventListener('click', function () {
  handlePlayerChoice(patronQues, PLAYERS.player1);
});

player2Button.addEventListener('click', function () {
  handlePlayerChoice(dancerQues, PLAYERS.player2);
});

playAgainBtn.addEventListener('click', init);

/*----- functions -----*/

init();

function init() {
  player = null;
  curQuestionIdx = 0;
  curQuestions = [];
  correctScore = 0;
  render();
  player1Button.disabled = false;
  player2Button.disabled = false;
  playerChoiceSelection.style.display = 'block';
  header3.style.display = 'block';
  quizArea.innerHTML = '';
  curQuestionIdx = 0;
  playAgainBtn.style.visibility = 'hidden';
  const previousMessage = document.getElementById('player-message');
  if (previousMessage) previousMessage.remove();
}

function handlePlayerChoice(questionArray, playerName) {

  player = playerName;
  playerChoiceSelection.style.display = 'none';
  header3.style.display = 'none';

  const message = document.createElement('h3');
  message.id = 'player-message';
  message.textContent = `${playerName}`;
  quizArea.appendChild(message);

  curQuestions = questionArray;
  showQuestion();
  player1Button.disabled = true;
  player2Button.disabled = true;

  console.log('handlePlayerChoice triggered with', playerName);

};

function showQuestion() {
  const quizArea = document.getElementById('quiz-area');
  const curQuestion = curQuestions[curQuestionIdx];

  quizArea.innerHTML =
    `<h3>${curQuestion.question}<h3>
      <div class="answer-buttons"> 
        <button id='answer0'>${curQuestion.answers[0]}</button>
        <button id='answer1'>${curQuestion.answers[1]}</button>
      </div> 
      `;

  document.getElementById('answer0').addEventListener('click', () => selectAnswer(0));
  document.getElementById('answer1').addEventListener('click', () => selectAnswer(1));
}


function selectAnswer(answerIdx) {

  const curQuestion = curQuestions[curQuestionIdx];
  curQuestion.playerAnswer = answerIdx;

  const chosenAnswer = curQuestion.answers[answerIdx]; 
  const isCorrectAnswer =curQuestion.correctAnswer === answerIdx;

  let feedback ='';

  if (isCorrectAnswer) {
    correctScore++;
    feedback = `<p style = "color: purple", "text-align: center">You chose "${chosenAnswer}, and that is CORRECT!</p>`;
  } else {
    feedback = `<p style = "color: red", "text-align: center">You chose "${chosenAnswer}, and that is INCORRECT!</p>`;
  }

  const tip = `<p style="text-align: center; font-style: italic;">${curQuestion.gameResponse}</p>`;
  quizArea.innerHTML += feedback + tip;

  curQuestionIdx++;

  if (curQuestionIdx < curQuestions.length) {
    setTimeout(() => {
      showQuestion();
    }, 3500);
  } else {
    setTimeout(() => {

      showResults();
    }, 4500);
  }
}


function showResults() {
  let level = '';

  if (player === PLAYERS.player1) {

    if (correctScore <= 1) {
      level = 'Stay Home';
    } else if (correctScore <= 4) {
      level = 'Cool Patron Status';
    } else {
      level = 'VIP Patron';
    }
  } else if (player === PLAYERS.player2) {

    if (correctScore <= 1) {
      level = 'Rookie Dancer (hang in there)';
    } else if (correctScore <= 4) {
      level = 'Stage DIVA';
    } else {
      level = 'Star Headliner!';
    }
  }

  quizArea.innerHTML = `
    <h3>Congratulations on finishing the quiz, ${player}!</h3>
    <p>You answered ${correctScore} questions correctly.</p>
    <h4>Your level is: ${level}</h4>
    `;

  renderControls();
};


function render() {
  renderControls();
};

function renderControls() {
  if (curQuestionIdx < curQuestions.length) {
    playAgainBtn.style.visibility = 'hidden';
  } else {
    playAgainBtn.style.visibility = 'visible';
  }
};
