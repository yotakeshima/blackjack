let cards = [];
let sum = 0;
let dSum = 0;
let bet = 0;
let blackJack = false;
let alive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("card-el");
let playerEl = document.getElementById("player-el");
let dealerCards = document.getElementById("d-cards");
let dealerSum = document.getElementById("d-sum");
let betEl = document.getElementById("bet-el");

let player = {
  name: "Yoshi",
  chips: 200,
};

let dealer = {
  dCards: [],
};

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

//start the game
function startGame() {
  if (alive === false) {
    alive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    dealer.dCards = [getRandomCard(), getRandomCard()];
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    dSum = dealer.dCards[0] + dealer.dCards[1];
    playerEl.textContent = player.name + ": $" + player.chips;
    betEl.textContent = "Bet: " + 0;
    renderGame();
  }
}

//renders the game
function renderGame() {
  cardsEl.textContent = "Cards: ";
  dealerCards.textContent = "Cards: ";
  for (let i = 0; i < dealer.dCards.length; i++) {
    dealerCards.textContent += dealer.dCards[i] + "  ";
  }
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + "  ";
  }
  sumEl.textContent = "Sum: " + sum;
  dealerSum.textContent = "Sum: " + dSum;
  if (sum <= 20 && alive === true) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    alive = false;
    message = "You got Blackjack!";
  } else if (dSum > 21 || (sum < 21 && sum > dSum)) {
    alive = false;
    message = "You Win!";
    player.chips *= 2;
    playerEl.textContent = player.name + ": $" + player.chips;
  } else {
    alive = false;
    message = "You lost...";
    player.chips -= 50;
    playerEl.textContent = player.name + ": $" + player.chips;
  }

  messageEl.textContent = message;
}

//draws a new card for the player
function newCard() {
  if (alive === true && blackJack === false) {
    let newCard = getRandomCard();
    sum += newCard;
    cards.push(newCard) + renderGame();
  }
}

function dealerTurn() {
  if (alive === true) {
    alive = false;
    while (dSum <= 17) {
      let newCard = getRandomCard();
      dSum += newCard;
      dealer.dCards.push(newCard);
    }
    renderGame();
  }
}

function reset() {
  player.chips = 200;
  alive = false;
  startGame();
}
