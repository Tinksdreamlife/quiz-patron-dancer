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

let patronQues =[
  {
    question: 'Patrons should tip dancers.', //Text of question 1'
    answers: ['True', 'False'],
    correctAnswer: 0, // index of 'Answer 1'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, 
  },
  {
    question: 'A patron must dress up to enter a club', //Text of question 2
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 2'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, // this is the property you update when they
                       // click an answer when this is the current question
  },
  {
    question: 'You must be rich to visit a club', //Text of question 3
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 3'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, // this is the property you update when they
                       // click an answer when this is the current question
  },
  {
    question: 'A dancer WANTS to come home with you.', //Text of question 4
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 4'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, // this is the property you update when they
                       // click an answer when this is the current question
  },
];

let dancerQues =[
  {
    question: 'Patrons are required to tip dancers.', //Text of question 1'
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Answer 1'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null // this is the property you update when they
                       // click an answer when this is the current question
  },
  {
    question: 'Dancers must offer all club services to all club patrons', //Text of question 2
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 2'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null // this is the property you update when they
                       // click an answer when this is the current question
  },
  {
    question: 'You must have a “great” body to be a dancer.', //Text of question 3
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 3'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null // this is the property you update when they
                       // click an answer when this is the current question
  },
  {
    question: 'There is not much room for professional growth as a dancer.', //Text of question 4
    answers: ['True', 'False'],
    correctAnswer: 1, // index of 'Another Answer 4'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null // this is the property you update when they
                       // click an answer when this is the current question
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

  player1Button.addEventListener('click', function() {
    handlePlayerChoice(patronQues, PLAYERS.player1); 
  }); 
  
  player2Button.addEventListener('click', function() {
    handlePlayerChoice(dancerQues, PLAYERS.player2); 
  });
  
  playAgainBtn.addEventListener('click', init); 

  /*----- functions -----*/

   init(); 

   function init() {
    player = null;
    curQuestionIdx = 0;
    curQuestions=[];
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
        <button id='answer0' onclick="selectAnswer(0)">${curQuestion.answers[0]}</button>
        <button id='answer1' onclick="selectAnswer(1)">${curQuestion.answers[1]}</button>
      </div> 
      `;

      document.getElementById('answer0').addEventListener(cancelIdleCallback, () => selectAnswer(0));
      document.getElementById('answer1').addEventListener(cancelIdleCallback, () => selectAnswer(1));
    }
  
   
   function selectAnswer(answerIdx) {
    const isCorrectAnswer = curQuestions[curQuestionIdx].correctAnswer === answerIdx;

    if (isCorrectAnswer){
      correctScore++;
      quizArea.innerHTML += `<p style = "color: purple", "text-align: center">Correct!</p>`;
    } else {
      quizArea.innerHTML += `<p style = "color: red", "text-align: center">Incorrect!</p>`;
    }
   
    curQuestionIdx++; 

      if (curQuestionIdx < curQuestions.length) {
        setTimeout(() => {
          showQuestion();
       }, 1500);
      } else {
      setTimeout(() => {

    showResults();
  }, 1500);
   }
  }
  

  function showResults() {  
    let level = '';

    if (player === PLAYERS.player1) {

      if (correctScore <= 1) {
        level = 'Stay Home';
      } else if (correctScore <= 3) {
        level = 'Cool Patron Status';
      } else {
        level = 'VIP Patron';
      }
     } else if (player === PLAYERS.player2) {

      if (correctScore <= 1) {
        level = 'Rookie Dancer (hang in there)';
      } else if (correctScore <= 3) {
        level = 'Stage DIVA';
      } else {
        level = 'Star Headliner!';
     }
  }

  quizArea.innerHTML =  `
    <h3>Congratulations on finishing the quiz, ${player}!</h3>
    <p>You answered ${correctScore} questions correctly.</p>
    <h4>Your level is: ${level}</h4>
    `; 

    renderControls();
};
    

  function render(){
    renderControls();
  };

  function renderControls() {
    if (curQuestionIdx < curQuestions.length) {
      playAgainBtn.style.visibility = 'hidden';
    } else {
      playAgainBtn.style.visibility = 'visible';
    }
    };
