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

let turn;
let handle;
let questionArray;

let patronQues = [
  {
    question: 'Patrons should tip dancers.', //Text of question 1'
    answers: ['True', 'False'],
    correctAnswer: 0, // index of 'Answer 1'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null,
    gameResponse: 'Tipping shows respect for the entertainment a patron is enjoying. It is part of club etiquette.'
  },
  {
    question: 'A patron must dress up to enter a club', //Text of question 2
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 2'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, 
    gameResponse: 'Proper hygeniene is encouraged. And dressing nicely is appreciated. But rarely is a suit and tie or formal attire required!'
  },
  {
    question: 'You must be rich to visit a club', //Text of question 3
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 3'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null,
    gameResponse: 'You do not have to be wealthy. However, this is not a free show! Therefore plan to spend money and enjoy the experience.'
  },
  {
    question: 'A dancer WANTS to come home with you.', //Text of question 4
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 4'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null,
    gameResponse: 'Absolutely not, so do not ask. A dancer is an entertainer. Period. Enjoy the show, and then go home...alone.'
  },
  {
    question: 'If sitting at the stage, you should tip every dancer.', //Text of question 4
    answers: ['True', 'False'],
    correctAnswer: 0, // index of 'Another Answer 5'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, 
    gameResponse: 'Yes! It is disrespectful to sit at the stage, and not show appreciation for the performance.'
  },
  {
    question: 'Patrons may take pictures of dancers on the stage.', //Text of question 4
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 6'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, 
    gameResponse: 'Not only is it illegal in many states to take photos in a club, but it can be a safety concern for many performers who keep their lives private!'
  },
];

let dancerQues = [
  {
    question: 'Patrons are required to tip dancers.', //Text of question 1'
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Answer 1'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, 
    gameResponse: 'Sadly, they are not required to do so! But it is proper ettiquette for them to show monetary appreciation for our performances.'
  },
  {
    question: 'Dancers must offer all club services to all club patrons', //Text of question 2
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 2'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null,
    gameResponse: 'Dancers may refuse to offer services to anyone for any reason.'
  },
  {
    question: 'You must have a “great” body to be a dancer.', //Text of question 3
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 3'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, 
    gameResponse: 'There is no standard look for a performer. Patrons enjoy dancers of all shapes and sizes.'
  },
  {
    question: 'There is not much room for professional growth as a dancer.', //Text of question 4
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 4'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null,
    gameResponse: 'Not only can dancers grow into other areas of the industry - such as content creation or specialty clubs - but skills such as marketing, performance, and sales, translate well to many other industries.'
  },
  {
    question: 'Patrons will always spend more based on looks rather than a connection.', //Text of question 4
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 5'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null,
    gameResponse: 'Many longtime patrons prefer to have a deeper connection with a performer - which translates to a better and more enjoyable experience for both the patron and the dancer.'
  },
  {
    question: 'Patrons may be interested in plus size dancers.', //Text of question 4
    answers: ['True', 'False'],
    correctAnswer: 0, // index of 'Another Answer 6'
    //How do I add a "response" to give a piece of advice with the answer?
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
  // const isCorrectAnswer = curQuestions[curQuestionIdx].correctAnswer === answerIdx;

  const curQuestion = curQuestions[curQuestionIdx];
  curQuestion.playerAnswer = answerIdx;

  const chosenAnswer = curQuestion.answers[answerIdx]; //get the current answer
  const isCorrectAnswer =curQuestion.correctAnswer === answerIdx;

  let feedback ='';

  if (isCorrectAnswer) {
    correctScore++;
    feedback = `<p style = "color: purple", "text-align: center">You chose "${chosenAnswer}, and that is CORRECT!</p>`;
  } else {
    feedback = `<p style = "color: red", "text-align: center">You chose "${chosenAnswer}, and that is INCORRECT!</p>`;
  }

  // quizArea.innerHTML += `<p style = "color: purple", "text-align: center">You chose "${chosenAnswer}, and that is CORRECT!</p>`;
  // } else {
  //   quizArea.innerHTML += `<p style = "color: red", "text-align: center">You chose "${chosenAnswer}, and that is INCORRECT!</p>`;
  // }

  const tip = `<p style="text-align: center; font-style: italic;">${curQuestion.gameResponse}</p>`;

  quizArea.innerHTML += feedback + tip;

  curQuestionIdx++;

  if (curQuestionIdx < curQuestions.length) {
    setTimeout(() => {
      showQuestion();
    }, 2500);
  } else {
    setTimeout(() => {

      showResults();
    }, 2500);
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
