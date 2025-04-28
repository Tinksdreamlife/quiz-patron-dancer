 /*----- constants -----*/
const PLAYERS = { 
    player1: 'Patron',
    player2: 'Dancer',
};

console.log(PLAYERS.player2);


  /*----- state variables -----*/
//Define but do not assign to (initialize)
let board; //how do I layout for a quiz game?
let player; // defines whether you get a patron or dancer question
let winner; // TBD whether this is a one player at a time
// game or if players are against each other for knowledge
// null -> no winner or tie, game is in progress; patron/dancer -> the player the won; 'Tie' - > the game is tied
let turn; // patron/dancer -> the player whose turn it is
let handle;
let questionArray; //be the questions set the player gets whether patron or dancer
let patronQues =[
  {
    question: 'Patrons should tip dancers.', //Text of question 1'
    answers: ['True', 'False'],
    correctAnswer: 0, // index of 'Answer 1'
    //How do I add a "response" to give a piece of advice with the answer?
    playerAnswer: null, // this is the property you update when they
                       // click an answer when this is the current question
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
    correctAnswer: 0, // index of 'Answer 1'
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


let curQuestions = []; //the actual questions the player is on
let curQuestionIdx = 0; //for an index of the current question
let correctAnswer; //index of the correct answer in the array
// let showQuestion; // be available to display the next question
let playerAnswer = null; //index of the answer the player has chosen

  /*----- cached elements  -----*/
  
  const player1Button = document.getElementById('player1');
  const player2Button = document.getElementById('player2');
  console.log(player1Button);

  const playerChoiceSelection = document.getElementById('player');
  const quizArea = document.getElementById('quiz-area');
  const header3 = document.querySelector('h3'); 
  // added the three const above to try and get sections to work which will replace
  //the choose your player with a new message once the player is chosen


//   patronQues[ques1, ques2, ques3, ques4]; - waiting on Jim to review
//   dancerQues[ques1, ques2, ques3, ques4];

  /*----- event listeners -----*/

  player1Button.addEventListener('click', function() {
    handlePlayerChoice(patronQues); 
  }); //I need this to do something like choose the question path
  
  player2Button.addEventListener('click', function() {
    handlePlayerChoice(dancerQues); 
  });

  /*----- functions -----*/

   init(); //init's function's purpose is initialize all state, then call render()

   function init() {
      curQuestionIdx = 0;
      curQuestions=[];
    //How do I write that these are the questions if the player chose
    //player1 which is the patron?
   }

   function handlePlayerChoice(questionArray, playerName) {
    console.log('handlePlayerChoice');
    playerChoiceSelection.style.display = 'none'; //this is supposed to hide the buttons
    header3.style.display = 'none'; //supposed to hide the "choose your player" instructions

    const message = document.createElement('h3'); //just learned that create Element adds something
    //new to the existing section
    message.textContent = '${playerName}';
    quizArea.appendChild(message); //makes a new element in the existing structure
      
    curQuestions = questionArray;
    showQuestion();
    player1Button.disabled = true;
    player2Button.disabled = true;
    //looked up how to disable the buttons after clicking them
   };

   function showQuestion() {
    const quizArea = document.getElementById('quiz-area'); 
    // NB: Points to the area I already set up in HTML
    const curQuestion = curQuestions[curQuestionIdx]; 
  
    quizArea.innerHTML = `<h3>
        ${curQuestion.question}
        <button onclick="selectAnswer(0)">${curQuestion.answers[0]}</button>
        <button onclick="selectAnswer(1)">${curQuestion.answers[1]}</button>
      </h3>`
   }
   
   function selectAnswer(answerIdx) {
    if (curQuestions[curQuestionIdx].correctAnswer === answerIdx){
      console.log("Correct!");
    } else {
      console.log("Incorrect");
    }
   }

    // TODO: Initialize other state variables, e.g.,
    // curQuestionIdx = 0;
    // render();  // Always call render after state has been initialized/updated


  //How do I write that these are the questions if the player chose
    //player2which is the dancer?

  /*----- Levels for Patron -----*/
 
    //Write code so if answer 1 ques correct = "Stay home"
    //Two ques correct "Move to stage rail"
    //Three ques correct "You may ask for a dance"
    //Four ques correct "Star patron"


  /*----- Levels for Dancers -----*/

      //Write code so if answer 1 ques correct = "Welcome bby stripper"
    //Two ques correct "Patrons make it rain on your stages"
    //Three ques correct "You've achieved loyal fans"
    //Four ques correct "Hey hey headliner. Vegas is calling!""
