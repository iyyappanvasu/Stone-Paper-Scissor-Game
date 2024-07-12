let score = (
  JSON.parse(localStorage.getItem('score'))) || {
  wins: 0,
  losses: 0,
  ties: 0
};
/*
    if (score === null) {
      score = {
        wins: 0,
        losses: 0,
        ties: 0
      }};*/
updateScore();

document.querySelector('.js-stone-button').addEventListener('click', () => {
  playgame('Stone');
})
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playgame('Paper');
})
document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playgame('Scissor');
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 't') { playgame('Stone'); }
  else if (event.key === 'p') { playgame('Paper'); }
  else if (event.key === 's') { playgame('Scissor'); }
});
function playgame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'Scissor') {
    if (computerMove === 'Stone') {
      result = 'You Lose.';
    }
    else if (computerMove === 'Paper') {
      result = 'You Win...!';
    }
    else if (computerMove == 'Scissor') {
      result = 'Tie.';
    }
  }
  else if (playerMove === 'Paper') {
    if (computerMove === 'Stone') {
      result = 'You Win...!';
    }
    else if (computerMove === 'Paper') {
      result = 'Tie.';
    }
    else if (computerMove == 'Scissor') {
      result = 'You Lose.';
    }
  }
  else if (playerMove === 'Stone') {
    if (computerMove === 'Stone') {
      result = 'Tie.';
    }
    else if (computerMove === 'Paper') {
      result = 'You Lose.';
    }
    else if (computerMove == 'Scissor') {
      result = 'You Win...!';
    }
  }
  if (result === 'You Win...!') {
    score.wins += 1;
  }
  else if (result === 'You Lose.') {
    score.losses += 1;
  }
  else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScore();


  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML =
    `You Picked  <img class="result-img-button class="result-img" src="stone-paper-scissor-images/${playerMove}-emoji.png">
        Computer Picked
    <img class="result-img-button" src="stone-paper-scissor-images/${computerMove}-emoji.png">`;


}
function updateScore() {
  document.querySelector(".js-score").innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses},Ties: ${score.ties}`;

}


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Stone';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissor';
  }
  return computerMove;
}
let isAutoplaying = false;
let intervalId;

function autoplay() {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playgame(playerMove);
    }, 1000);
    isAutoplaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }

  const play = document.querySelector('.auto-play-button');
  if (play.innerText === 'Auto Play') {
    play.innerHTML = 'Stop Play';
  }
  else {
    play.innerHTML = 'Auto Play';
  }
}