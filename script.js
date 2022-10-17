'use strict';
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const Player1 = document.querySelector('.player--0');
const Player2 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
let winner = null;
let Sn1 = 0;
let Sn2 = 0;
let DiceNumber = Math.floor(Math.random() * 6) + 1;

let diceRoll = function () {
  switch (DiceNumber) {
    case 1:
      dice.src = 'dice-1.png';
      break;
    case 2:
      dice.src = 'dice-2.png';
      break;
    case 3:
      dice.src = 'dice-3.png';
      break;
    case 4:
      dice.src = 'dice-4.png';
      break;
    case 5:
      dice.src = 'dice-5.png';
      break;
    case 6:
      dice.src = 'dice-6.png';
      break;
  }
};
let current = 0;
const beAplayer1 = function () {
  current = 0;
  Player1.classList.add('player--active');
  Player2.classList.remove('player--active');
};
const beAplayer2 = function () {
  current = 0;
  Player1.classList.remove('player--active');
  Player2.classList.add('player--active');
};
const SwitchPlayers = function () {
  if (Player1.classList.contains('player--active')) {
    beAplayer2();
  } else {
    beAplayer1();
  }
};

btnRoll.addEventListener('click', function () {
  if (winner == null) {
    dice.classList.remove('hidden');
    diceRoll();
    console.log(DiceNumber);
    if (DiceNumber !== 1) {
      current += Number(DiceNumber);
      if (Player1.classList.contains('player--active')) {
        currentScore1.textContent = current;
      } else {
        currentScore2.textContent = current;
      }
    } else {
      if (Player1.classList.contains('player--active')) {
        currentScore1.textContent = 0;
      } else {
        currentScore2.textContent = 0;
      }
      SwitchPlayers();
    }

    DiceNumber = Math.floor(Math.random() * 6) + 1;
  }
});

btnHold.addEventListener('click', function () {
  let check = Sn2 + current;
  let check2 = Sn1 + current;
  if (winner == null) {
    if (Player1.classList.contains('player--active')) {
      if (check2 <= 100) {
        Sn1 += current;
        check2 += current;
      } else {
        Sn1 -= current;
        check -= current;
      }

      score1.textContent = Sn1;
      currentScore1.textContent = 0;
    } else {
      if (check <= 100) {
        Sn2 += current;
        check += current;
      } else {
        Sn2 -= current;
        check -= current;
      }

      score2.textContent = Sn2;
      currentScore2.textContent = 0;
    }
    if (Sn1 >= 100) {
      dice.src = 'winner-1.png';
      winner = 'Player1';
      Player1.classList.add('player--winner');
      dice.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
    } else if (Sn2 >= 100) {
      dice.src = 'winner-2.png';
      winner = 'Player2';
      Player2.classList.add('player--winner');
      dice.classList.add('hidden');
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
    } else {
      SwitchPlayers();
    }
  }
});

btnNew.addEventListener('click', function () {
  Sn1 = 0;
  Sn2 = 0;
  winner = null;
  current = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  dice.src = 'dice-1.png';
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  dice.classList.add('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  if (Player1.classList.contains('player--winner')) {
    Player1.classList.remove('player--winner');
  } else if (Player2.classList.contains('player--winner')) {
    Player2.classList.remove('player--winner');
  }
});
