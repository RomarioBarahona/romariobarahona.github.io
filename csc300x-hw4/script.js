let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let currentPlayerChoice = '';

function playerChoice(choice) {
  currentPlayerChoice = choice; 
  highlightPlayerChoice(choice);
  computerChoice();
}

function highlightPlayerChoice(choice) {
  const choices = document.querySelectorAll('.choices img');
  choices.forEach(img => img.style.border = 'none');
  document.getElementById(choice).style.border = '2px solid orange';
}

function computerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  displayComputerChoice(computerChoice);
  determineWinner(computerChoice);
}

function displayComputerChoice(choice) {
  const computerChoiceImg = document.getElementById('computer-choice');
  computerChoiceImg.src = `images/${choice}.png`;
}

function determineWinner(computerChoice) {
  const playerChoice = currentPlayerChoice;

  let outcome = '';
  if (playerChoice === computerChoice) {
    outcome = 'It\'s a tie!';
    tieScore++;
  } 
  
  else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')) {
    outcome = 'You win!';
    playerScore++;
  } 
  
  else {
    outcome = 'Computer wins!';
    computerScore++;
  }
  
  updateOutcome(outcome);
  updateScoreDisplay();
}

function updateOutcome(outcome) {
  document.getElementById('outcome').textContent = outcome;
}

function updateScoreDisplay() {
  document.getElementById('wins').textContent = playerScore;
  document.getElementById('losses').textContent = computerScore;
  document.getElementById('ties').textContent = tieScore;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;
  updateScoreDisplay();
  updateOutcome('Choose your throw to start the game!');
  document.getElementById('computer-choice').src = 'images/question-mark.png';
  const choices = document.querySelectorAll('.choices img');
  choices.forEach(img => img.style.border = 'none');
}
