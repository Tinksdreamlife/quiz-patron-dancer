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
let patronQues; //for an array of patron questions
let dancerQues; // for an array of dancer questions
let curQuestionIdx; //for an index of the current question
let correctAnswer; //index of the correct answer in the array
let playerAnswer; //index of the answer the player has chosen

  /*----- cached elements  -----*/
  
//   patronQues[ques1, ques2, ques3, ques4]; - waiting on Jim to review
//   dancerQues[ques1, ques2, ques3, ques4];

  /*----- event listeners -----*/

  
  /*----- functions -----*/



  /*----- Questions for Patron -----*/



  /*----- Questions for Dancers -----*/
