let sequence = [];
let playerSequence = [];
let level = 0;

const startButton = document.querySelector('.start-button');
const info = document.querySelector('.info');
const heading = document.querySelector('.heading');
const buttonContainer = document.querySelector('.button-container');

function resetGame(text) {
  alert(text);
  sequence = [];
  playerSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'Simon';
  info.classList.add('hidden');
  buttonContainer.classList.add('unclickable');
}

function playerTurn(level) {
  buttonContainer.classList.remove('unclickable');
  info.textContent = `Your turn` //${level} Tap${level > 1 ? 's' : ''}`;//
}

function activateButton(color) {
  const button = document.querySelector(`[data-button='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  button.classList.add('activated');
  sound.play();

  setTimeout(() => {
    button.classList.remove('activated');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateButton(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const button = ['green', 'red', 'blue', 'yellow'];
  const random = button[Math.floor(Math.random() * button.length)];

  return random;
}

function nextRound() {
  level += 1;

  buttonContainer.classList.add('unclickable');
  heading.textContent = `Level ${level} of 20`;


  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    playerTurn(level);
  }, level * 600 + 1000);
}

function handleClick(tile) {
  const index = playerSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  if (playerSequence[index] !== sequence[index]) {
    resetGame('You selected the wrong color. Game over.');
    return;
  }

  if (playerSequence.length === sequence.length) {
    if (playerSequence.length === 20) {
      resetGame('Congrats! You completed all the levels');
      return
    }

    playerSequence = [];
    info.textContent= 'Way to go!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn`;
}

function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = 'Loading';
  nextRound();
}

startButton.addEventListener('click', startGame);
buttonContainer.addEventListener('click', event => {
  const { button } = event.target.dataset;

  if (button) handleClick(button);
});