let cards = [];
let sum = 0;
let dSum = 0;
let global_bet = 0;
let betPlaced = false;
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

//random number generator
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
function placeBet(bet) {
  let temp = bet;
  if (temp === 1) {
    temp = player.chips;
  }
  if (alive === true && global_bet + temp <= player.chips) {
    global_bet += temp;
    betEl.textContent = "Bet: $" + global_bet;
  }
}

function done() {
  if (global_bet > 0) {
    betPlaced = true;
    renderGame();
  }
}

function clearBet() {
  global_bet = 0;
  betEl.textContent = "Bet: $0";
}

//start the game
function startGame() {
  if (alive === false) {
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    dealer.dCards = [getRandomCard(), getRandomCard()];
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    dSum = dealer.dCards[0] + dealer.dCards[1];
    if (sum === 22 || dSum === 22) {
      if (sum === 22) {
        cards[0] = 1;
        cards[1] = 11;
        sum = cards[0] + cards[1];
      } else {
        dealer.dCards[0] = 1;
        dealer.dCards[1] = 11;
        dSum = dealer.dCards[0] + dealer.dCards[1];
      }
    }
    playerEl.textContent = player.name + ": $" + player.chips;
    betEl.textContent = "Bet: $" + global_bet;
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

  if (alive === false && betPlaced === false) {
    messageEl.textContent = "Place Your Bet";
    alive = true;
  } else {
    if (sum <= 20 && alive === true) {
      message = "Do you want to draw a new card?";
    } else if (sum === 21 && dSum != 21) {
      dealerTurn();
      if (dSum != 21) {
        alive = false;
        betPlaced = false;
        message = "You got Blackjack!";
        global_bet *= 2;
        player.chips += global_bet;
        playerEl.textContent = player.name + ": $" + player.chips;
        global_bet = 0;
      }
    } else if (dSum > 21 || (sum < 21 && sum > dSum)) {
      alive = false;
      betPlaced = false;
      message = "You Win!";
      global_bet *= 2;
      player.chips += global_bet;
      playerEl.textContent = player.name + ": $" + player.chips;

      global_bet = 0;
    } else if (sum === dSum) {
      alive = false;
      betPlaced = false;
      message = "Draw...";
      global_bet = 0;
    } else {
      alive = false;
      betPlaced = false;
      message = "You lost...";
      player.chips -= global_bet;
      playerEl.textContent = player.name + ": $" + player.chips;
      global_bet = 0;
    }

    messageEl.textContent = message;
  }
}

//draws a new card for the player
function newCard() {
  if (alive === true && blackJack === false && betPlaced === true) {
    let newCard = getRandomCard();
    sum += newCard;
    cards.push(newCard) + renderGame();
  }
}

//After a players turn is finished
function dealerTurn() {
  if (alive === true) {
    alive = false;
    while (dSum < 17) {
      let newCard = getRandomCard();
      dSum += newCard;
      dealer.dCards.push(newCard);
    }
    renderGame();
  }
}

//resets the game and chips
function reset() {
  location.reload();
}
