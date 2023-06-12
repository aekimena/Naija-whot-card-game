import { whotCards } from "./cards.js";

const sliderContainer = document.querySelector('.player-cards-slide-container');
const sliderInner = document.querySelector('.player-cards');
const itemWidth = sliderInner.scrollWidth / sliderInner.children.length;
const computerCardsDisplay = document.querySelector('.computer-cards');
let playerCardsDisplay = document.querySelector('.player-cards');

let backupCards = [];
let computerCardsContainer = [];
let playerCardsContainer = [];
let showCard = [];
let trash = [];
let isPlayerTurn;
let isComputerTurn;

// function checkoverflow(element){
//     return element.scrollWidth > element.clientWidth;
// };

// function overflowCheck(){
//     if (checkoverflow(computerCardsDisplay)){
//         document.querySelector('.hide').style.display = 'block';
//         document.querySelector('.length-display-info').innerHTML = `${computerCardsDisplay.scrollWidth - computerCardsDisplay.clientWidth}`
//     } else {
//         document.querySelector('.hide').style.display = 'none';
//     }
// }
// overflowCheck();

function startGame(){
    isPlayerTurn = true;
    isComputerTurn = false;
    shuffleCards(whotCards);
    shareCards();
    updateComputerCards();
    updatePlayerCards();
    updateShowCards();
    playerTurn();
    goMarket();
    // computerTurn();
}

function shuffleCards(whotcards){
    return whotcards.sort(() => Math.random() - 0.5);
}

function shareCards(){
    for (let i of whotCards) {
        computerCardsContainer.push(i);
        backupCards.push(i);
        whotCards.splice(whotCards.indexOf(i), 1)
        if (computerCardsContainer.length == 5) {
            break;
        }
    }

    for (let i of whotCards) {
        playerCardsContainer.push(i);
        backupCards.push(i);
        whotCards.splice(whotCards.indexOf(i), 1)
        if (playerCardsContainer.length == 5) {
            break;
        }
    }

    for (let i of whotCards) {
        showCard.push(i);
        backupCards.push(i);
        whotCards.splice(whotCards.indexOf(i), 1)
        if (showCard.length == 1) {
            break;
        }
    }
}

function updateComputerCards(){
    computerCardsContainer.forEach(item => {
        let cardItem = document.createElement('div');
        cardItem.classList.add('computer-card');
        cardItem.innerHTML = `<p class="computer-card-whot">WHOT</p>`;
        computerCardsDisplay.appendChild(cardItem);
    });
}

function updatePlayerCards(){
    playerCardsContainer.forEach(item => {
        let cardItem = document.createElement('div');
        cardItem.classList.add('player-card');
        cardItem.innerHTML = `<p class="h3 player-card-number">${item[0]}</p>
        <p class="player-card-shape">${item[1]}</p>`;
        playerCardsDisplay.appendChild(cardItem);
    });
}

function updateShowCards(){
    for (let i of showCard){
        document.querySelector('.display-card').innerHTML = `<p class="h3 display-card-number">${i[0]}</p>
        <p class="display-card-shape">${i[1]}</p>`
    }
}

function removeComputerCard(){
    while (computerCardsDisplay.firstChild){
        computerCardsDisplay.removeChild(computerCardsDisplay.firstChild);
    }
    updateShowCards();
}

function removePlayerCard(){
    while (playerCardsDisplay.firstChild){
        playerCardsDisplay.removeChild(playerCardsDisplay.firstChild);
    }
    updateShowCards();
}

function playerTurn(){
    emptyCardsCheck();
    let cardsDiv = document.querySelectorAll('.player-card');
    cardsDiv.forEach(item => {
        item.addEventListener('click', () => {
            if(isComputerTurn == false){
                let cardIndex = Array.prototype.indexOf.call(cardsDiv, item);
                console.log(cardIndex);
                if(playerCardsContainer[cardIndex][0] == showCard[0][0] || playerCardsContainer[cardIndex][1] == showCard[0][1]) {
                    item.classList.add('right-card');
                    document.querySelector('.display-card').classList.add('right-card');
                    setTimeout(() => {
                        item.classList.remove('right-card');
                        document.querySelector('.display-card').classList.remove('right-card');
                        showCard.splice(0, showCard.length);
                        showCard.push(playerCardsContainer[cardIndex]);
                        backupCards.push(playerCardsContainer[cardIndex]);
                        playerCardsContainer.splice(cardIndex, 1);
                        removePlayerCard();
                        updatePlayerCards();
                        isComputerTurn = true;
                        isPlayerTurn = false;
                        checkWinner();
                    }, 500)
                    setTimeout(computerTurn, 1000);
                } else {
                    item.classList.add('wrong-card');
                    setTimeout(() => {
                        item.classList.remove('wrong-card')
                    },1000/6)
                }
            }
        })
    })
}
            


function computerTurn(){
    emptyCardsCheck();
    if (isPlayerTurn === false){
        for(let i of computerCardsContainer){
            if (i[0] == showCard[0][0] || i[1] == showCard[0][1]){
                document.querySelector('.display-card').classList.add('right-card');
                document.querySelectorAll('.computer-card')[computerCardsContainer.indexOf(i)].classList.add('right-card');
                setTimeout(() => {
                    document.querySelector('.display-card').classList.remove('right-card');
                    document.querySelectorAll('.computer-card')[computerCardsContainer.indexOf(i)].classList.remove('right-card');
    
                    showCard.splice(0, showCard.length);
                    showCard.push(i);
                    backupCards.push(i);
                    computerCardsContainer.splice(computerCardsContainer.indexOf(i), 1);
                    removeComputerCard();
                    updateComputerCards();
                    trash.splice(0, trash.length);
                    isPlayerTurn = true;
                    isComputerTurn = false;
                    checkWinner();
                    playerTurn();
                },500)
                break;
            }else {
                trash.push('none');
                if (trash.length == computerCardsContainer.length){

                    computerCardsContainer.push(whotCards[0]);
                    backupCards.push(whotCards[0]);
                    whotCards.splice(0, 1);
                    removeComputerCard();
                    updateComputerCards();
                    trash.splice(0, trash.length)
                    document.querySelector('.market-card').classList.add('market');
                    document.querySelector(".computer-card:last-of-type").classList.add('market');
                    setTimeout(() => {
                        document.querySelector('.market-card').classList.remove('market');
                        document.querySelector(".computer-card:last-of-type").classList.remove('market');
                    }, 600)
                    isPlayerTurn = true;
                    isComputerTurn = false;
                    playerTurn();
                    break;
                }
            }
        }
    }
}

function goMarket(){
    document.querySelector('.market-card').addEventListener('click', () => {
        playerCardsContainer.push(whotCards[0]);
        backupCards.push(whotCards[0]);
        whotCards.splice(0, 1);
        removePlayerCard();
        updatePlayerCards();

        document.querySelector('.market-card').classList.add('market');
        document.querySelector(".player-card:last-of-type").classList.add('market');

        setTimeout(() => {
            document.querySelector('.market-card').classList.remove('market');
            document.querySelector(".player-card:last-of-type").classList.remove('market');
        }, 500)

        isPlayerTurn = false;
        isComputerTurn = true;
        setTimeout(computerTurn, 1000);
    })
}

function checkWinner(){
    if (computerCardsContainer.length == 0){
        console.log('computer won')
        isComputerTurn = true;
    } else if (playerCardsContainer.length == 0){
        console.log('you won');
        isPlayerTurn = true;
    }
}

function emptyCardsCheck(){
    if(whotCards.length == 0){
        whotCards = whotCards.concat(backupCards);
    }
}

startGame();
