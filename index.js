let cards = []
let sum = 0
let blackJack = false
let alive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("card-el")
let playerEl = document.getElementById("player-el")

let player = {
    name: "Yoshi",
    chips: 200,
}

function getRandomCard(){
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if(randomNumber > 10){
        return 10
    }
    else if(randomNumber === 1){
        return 11
    }
    else{
        return randomNumber
    }
}

function startGame(){
alive = true 
let firstCard = getRandomCard()
let secondCard = getRandomCard()
cards = [firstCard, secondCard]
sum = firstCard + secondCard
playerEl.textContent = player.name + ": $" + player.chips 
    renderGame()
}
function renderGame(){
    cardsEl.textContent = "Cards: "
    for(let i = 0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <=20){
        message = "Do you want to draw a new card?"
    }
    else if (sum === 21){
        message = "You got Blackjack!"
    }
    else{
        alive = false
        message = "You lost..."
        player.chips -= 50
        playerEl.textContent = player.name + ": $" + player.chips 
    }
    messageEl.textContent = message
}

function newCard(){
    if(alive === true && blackJack === false){
    let newCard = getRandomCard()
    sum += newCard 
    cards.push(newCard)
    renderGame()
    }
}