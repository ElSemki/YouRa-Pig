'use strict';

// Elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Game initial conditions
let totalScores,
  currentScore,
  activePlayer = 0,
  isPlaying;

function startNewGame() {
  isPlaying = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  totalScores = [0, 0];
  currentScore = 0;
  if (!diceElement.classList.contains('hidden'))
    diceElement.classList.add('hidden');
  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains('player--winner')
  )
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
  if (!player0Element.classList.contains('player--active'))
    player0Element.classList.add('player--active');
  if (player1Element.classList.contains('player--active'))
    player1Element.classList.remove('player--active');
  activePlayer = 0;
}
startNewGame();

function toggleActivePlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

// Click to the rollBtn
rollBtn.addEventListener('click', () => {
  if (isPlaying) {
    // Generate a random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;

    // if the number is 1, switch to the next player, if not - add number to the current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      toggleActivePlayer();
    }
  }
});

// Click to the holdBtn
holdBtn.addEventListener('click', () => {
  if (isPlaying) {
    // Add current score to active player total score
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // if total score of active player => 100, active player win, if not - switch active player
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceElement.classList.add('hidden');
    } else {
      toggleActivePlayer();
    }
  }
});

// Click to the newGameBtn
newBtn.addEventListener('click', startNewGame);
