import { startInfo, computerWinInfo, playerWinInfo, restartOrPass } from "./variables.js";

let whotCards = [[1, 'shapes/circle.png'], [2, 'shapes/circle.png'], [3, 'shapes/circle.png'], [4, 'shapes/circle.png'], [5, 'shapes/circle.png'], 
[7, 'shapes/circle.png'], [8, 'shapes/circle.png'], [10, 'shapes/circle.png'], [11, 'shapes/circle.png'], [12, 'shapes/circle.png'], [13, 'shapes/circle.png'], 
[14, 'shapes/circle.png'], [1, 'shapes/triangle.png'], [2, 'shapes/triangle.png'], [3, 'shapes/triangle.png'], [4, 'shapes/triangle.png'], [5, 'shapes/triangle.png'], 
[7, 'shapes/triangle.png'], [8, 'shapes/triangle.png'], [10, 'shapes/triangle.png'], [11, 'shapes/triangle.png'], [12, 'shapes/triangle.png'], [13, 'shapes/triangle.png'], 
[14, 'shapes/triangle.png'], [1, 'shapes/cross.png'], [2, 'shapes/cross.png'], [3, 'shapes/cross.png'], [5, 'shapes/cross.png'], [7, 'shapes/cross.png'], 
[10, 'shapes/cross.png'], [11, 'shapes/cross.png'], [13, 'shapes/cross.png'], [14, 'shapes/cross.png'], [1, 'shapes/square.png'], [2, 'shapes/square.png'], 
[3, 'shapes/square.png'], [5, 'shapes/square.png'], [7, 'shapes/square.png'], [10, 'shapes/square.png'], [11, 'shapes/square.png'], [13, 'shapes/square.png'], 
[14, 'shapes/square.png'], [1, 'shapes/star.png'], [2, 'shapes/star.png'], [3, 'shapes/star.png'], [4, 'shapes/star.png'], [5, 'shapes/star.png'], 
[7, 'shapes/star.png'], [8, 'shapes/star.png'], [20, 'shapes/circle.png'], [20, 'shapes/triangle.png'], [20, 'shapes/cross.png'], [20, 'shapes/square.png'], 
[20, 'shapes/star.png']];

const sliderContainer = document.querySelector('.player-cards-slide-container');
const sliderInner = document.querySelector('.player-cards');
const itemWidth = sliderInner.scrollWidth / sliderInner.children.length;
const computerCardsDisplay = document.querySelector('.computer-cards');
let playerCardsDisplay = document.querySelector('.player-cards');

let marketCard = document.querySelector('.market-card');
let displayCard = document.querySelector('.display-card');

let computerCardsContainer = [];
let playerCardsContainer = [];
let showCard = [];
let trash = [];
let isPlayerTurn;
let isComputerTurn;

function startGameQuestionaire(){
    document.querySelector('.info-container').classList.remove('hide-info-box');
    document.querySelector('.info-box').innerHTML = startInfo;
    document.querySelector('.ok-btn').addEventListener('click', () => {
        document.querySelector('.info-container').classList.add('hide-info-box');
        document.querySelector('.market-cards').style.display = 'block';
        document.querySelector('.display-cards').style.display = 'block';
        document.querySelector('.menu-btn').style.display = 'block';
        startGame();
    })
    document.querySelector('.cancel-btn').addEventListener('click', () => {
        document.querySelector('.info-container').classList.add('hide-info-box');
        window.close();
    })
    
}

function showWinner(info){
    document.querySelector('.info-container').classList.remove('hide-info-box');
    document.querySelector('.info-box').innerHTML = info;
    document.querySelector('.ok-btn').addEventListener('click', () => {
        document.querySelector('.info-container').classList.add('hide-info-box');
        document.querySelector('.market-cards').style.display = 'block';
        document.querySelector('.display-cards').style.display = 'block';
        whotCards = whotCards.concat(playerCardsContainer);
        whotCards = whotCards.concat(computerCardsContainer);
        whotCards = whotCards.concat(showCard);
        showCard.splice(0, showCard.length);
        computerCardsContainer.splice(0, computerCardsContainer.length);
        playerCardsContainer.splice(0, playerCardsContainer.length);
        startGame();
    })
    document.querySelector('.cancel-btn').addEventListener('click', () => {
        document.querySelector('.info-container').classList.add('hide-info-box');
        window.close();
    })
}


window.onload = function(){
    startGameQuestionaire();
}

document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.info-container').classList.remove('hide-info-box');
    document.querySelector('.info-box').innerHTML = restartOrPass;
    document.querySelector('.ok-btn').addEventListener('click', () => {
        document.querySelector('.info-container').classList.add('hide-info-box');
        document.querySelector('.market-cards').style.display = 'block';
        document.querySelector('.display-cards').style.display = 'block';
        whotCards = whotCards.concat(playerCardsContainer);
        whotCards = whotCards.concat(computerCardsContainer);
        whotCards = whotCards.concat(showCard);
        showCard.splice(0, showCard.length);
        computerCardsContainer.splice(0, computerCardsContainer.length);
        playerCardsContainer.splice(0, playerCardsContainer.length);
        startGame();
    })
    document.querySelector('.exit-btn').addEventListener('click', () => {
        document.querySelector('.info-container').classList.add('hide-info-box');
        window.close();
    })
    document.querySelector('.cancel-btn').addEventListener('click', () => {
        document.querySelector('.info-container').classList.add('hide-info-box');
    })

})

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
}

function shuffleCards(whotcards){
    return whotcards.sort(() => Math.random() - 0.5);
}

function shareCards(){
    for (let i of whotCards) {
        computerCardsContainer.push(i);
        whotCards.splice(whotCards.indexOf(i), 1)
        if (computerCardsContainer.length == 5) {
            break;
        }
    }

    for (let i of whotCards) {
        playerCardsContainer.push(i);
        whotCards.splice(whotCards.indexOf(i), 1)
        if (playerCardsContainer.length == 5) {
            break;
        }
    }

    for (let i of whotCards) {
        showCard.push(i);
        whotCards.splice(whotCards.indexOf(i), 1)
        if (showCard.length == 1) {
            break;
        }
    }
}

function updateComputerCards(){
    while (computerCardsDisplay.firstChild){
        computerCardsDisplay.removeChild(computerCardsDisplay.firstChild);
    }
    computerCardsContainer.forEach(item => {
        let cardItem = document.createElement('div');
        cardItem.classList.add('computer-card');
        cardItem.innerHTML = `<p class="computer-card-whot">WHOT</p>`;
        computerCardsDisplay.appendChild(cardItem);
    });
}


function updatePlayerCards(){
    while (playerCardsDisplay.firstChild){
        playerCardsDisplay.removeChild(playerCardsDisplay.firstChild);
    }
    playerCardsContainer.forEach(item => {
        let cardItem = document.createElement('div');
        cardItem.classList.add('player-card');
        cardItem.innerHTML = `<p class="h5 player-card-number">${item[0]}</p>
        <img src="${item[1]}" class="player-card-image" alt="" />
        <p class="h5 player-card-number2">${item[0]}</p>`;
        playerCardsDisplay.appendChild(cardItem);
    });
}

function updateShowCards(){
    for (let i of showCard){
        displayCard.innerHTML = `<p class="h5 display-card-number">${i[0]}</p>
        <img src="${i[1]}" class="display-card-image" alt="" />
        <p class="h5 display-card-number2">${i[0]}</p>`;
    }
}

function playerTurn(){
    let allPlayerCards = document.querySelectorAll('.player-card');
    let allComputerCards = document.querySelectorAll('.computer-card');
    allPlayerCards.forEach(item => {
        item.addEventListener('click', () => {
            if(isComputerTurn == false){
                let cardIndex = Array.prototype.indexOf.call(allPlayerCards, item);
                if(playerCardsContainer[cardIndex][0] == showCard[0][0] || playerCardsContainer[cardIndex][1] == showCard[0][1]) {
                    switch(true){
                        case(playerCardsContainer[cardIndex][0] == 2):
                            item.classList.add('right-card');
                            displayCard.classList.add('right-card');
                            setTimeout(() => {
                                item.classList.remove('right-card');
                                displayCard.classList.remove('right-card');
                                showCard.splice(0, showCard.length);
                                showCard.push(playerCardsContainer[cardIndex]);
                                whotCards.push(playerCardsContainer[cardIndex]);
                                playerCardsContainer.splice(cardIndex, 1);
                                updateShowCards();
                                updatePlayerCards();
                                checkWinner();
                                setTimeout(() => {
                                    if(isPlayerTurn != false){
                                    let _computer2 = new Rules(computerCardsContainer, 'computer-card');
                                    _computer2.pickTwo();
                                    updateComputerCards();

                                    marketCard.classList.add('market');
                                    document.querySelectorAll('.computer-card')[computerCardsContainer.length - 2].classList.add('market');
                                    document.querySelector(`.computer-card:last-of-type`).classList.add('market');
                                    document.querySelector('.computer-added-card-info').style.display = 'block';
                                    document.querySelector('.computer-added-card-info .number').innerHTML = '+2';

                                    setTimeout(() => {
                                        document.querySelector('.computer-added-card-info').style.display = 'none';
                                        marketCard.classList.remove('market');
                                        document.querySelector(`.computer-card:last-of-type`).classList.remove('market');
                                        document.querySelectorAll('.computer-card')[computerCardsContainer.length - 2].classList.remove('market');
                                }, 500)
                            }
                                }, 1000)
                                isPlayerTurn = true;
                                isComputerTurn = false;
                                playerTurn();
                            }, 500)
                            break;
                        case(playerCardsContainer[cardIndex][0] == 14):
                            item.classList.add('right-card');
                            displayCard.classList.add('right-card');
                            setTimeout(() => {
                                item.classList.remove('right-card');
                                displayCard.classList.remove('right-card');
                                showCard.splice(0, showCard.length);
                                showCard.push(playerCardsContainer[cardIndex]);
                                whotCards.push(playerCardsContainer[cardIndex]);
                                playerCardsContainer.splice(cardIndex, 1);
                                updateShowCards();
                                updatePlayerCards();
                                checkWinner();
                                setTimeout(() => {
                                    if(isPlayerTurn != false){
                                    let _computer14 = new Rules(computerCardsContainer, 'computer-card');
                                    _computer14.goToMarket();
                                    updateComputerCards();
                                    marketCard.classList.add('market');
                                    document.querySelector(`.computer-card:last-of-type`).classList.add('market');
                                    document.querySelector('.computer-added-card-info').style.display = 'block';
                                    document.querySelector('.computer-added-card-info .number').innerHTML = '+1';

                                    setTimeout(() => {
                                        document.querySelector('.computer-added-card-info').style.display = 'none';
                                        marketCard.classList.remove('market');
                                        document.querySelector(`.computer-card:last-of-type`).classList.remove('market');
                                }, 500)
                            }
                                }, 1000)

                                isPlayerTurn = true;
                                isComputerTurn = false;
                                playerTurn();
                            }, 500)
                            break;
                        case(playerCardsContainer[cardIndex][0] == 1):
                            item.classList.add('right-card');
                            displayCard.classList.add('right-card');
                            setTimeout(() => {
                                item.classList.remove('right-card');
                                displayCard.classList.remove('right-card');
                                showCard.splice(0, showCard.length);
                                showCard.push(playerCardsContainer[cardIndex]);
                                whotCards.push(playerCardsContainer[cardIndex]);
                                playerCardsContainer.splice(cardIndex, 1);
                                updateShowCards();
                                updatePlayerCards();
                                checkWinner();
                                setTimeout(() => {
                                    if(isPlayerTurn != false){
                                    computerCardsContainer.forEach(item => {
                                        document.querySelectorAll('.computer-card')[computerCardsContainer.indexOf(item)].classList.add('wrong-card');
                                    setTimeout(() => {
                                        document.querySelectorAll('.computer-card')[computerCardsContainer.indexOf(item)].classList.remove('wrong-card');
                                    }, 500)
                                })
                            }
                                }, 1000)

                                isPlayerTurn = true;
                                isComputerTurn = false;
                                playerTurn();
                            }, 500)
                            break;
                        default:
                            item.classList.add('right-card');
                            displayCard.classList.add('right-card');
                            setTimeout(() => {
                                item.classList.remove('right-card');
                                displayCard.classList.remove('right-card');
                                showCard.splice(0, showCard.length);
                                showCard.push(playerCardsContainer[cardIndex]);
                                whotCards.push(playerCardsContainer[cardIndex]);
                                playerCardsContainer.splice(cardIndex, 1);
                                updateShowCards();
                                updatePlayerCards();
                                isComputerTurn = true;
                                isPlayerTurn = false;
                                checkWinner();
                            }, 500)
                            setTimeout(computerTurn, 1000);
                    }
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
    let allPlayerCards = document.querySelectorAll('.player-card');
    let allComputerCards = document.querySelectorAll('.computer-card');
    if (isPlayerTurn == false){
        for(let i of computerCardsContainer){
            if (i[0] == showCard[0][0] || i[1] == showCard[0][1]){
                if(i[0] == 2){
                    displayCard.classList.add('right-card');
                    allComputerCards[computerCardsContainer.indexOf(i)].classList.add('right-card');
                    setTimeout(() => {
                        displayCard.classList.remove('right-card');
                        allComputerCards[computerCardsContainer.indexOf(i)].classList.remove('right-card');
                        showCard.splice(0, showCard.length);
                        showCard.push(i);
                        whotCards.push(i);
                        computerCardsContainer.splice(computerCardsContainer.indexOf(i), 1);
                        updateShowCards();
                        updateComputerCards();
                        checkWinner();
                        isComputerTurn = true;
                        trash.splice(0, trash.length);
                        setTimeout(() => {
                            if(isComputerTurn != false){
                            let _player2 = new Rules(playerCardsContainer, 'player-card');
                            _player2.pickTwo();
                            updatePlayerCards();

                            marketCard.classList.add('market');
                            document.querySelectorAll('.player-card')[playerCardsContainer.length - 2].classList.add('market');
                            document.querySelector(`.player-card:last-of-type`).classList.add('market');
                            document.querySelector('.player-added-card-info').style.display = 'block';
                            document.querySelector('.player-added-card-info .number').innerHTML = '+2';

                            setTimeout(() => {
                                document.querySelector('.player-added-card-info').style.display = 'none';
                                marketCard.classList.remove('market');
                                document.querySelector(`.player-card:last-of-type`).classList.remove('market');
                                document.querySelectorAll('.player-card')[playerCardsContainer.length - 2].classList.remove('market');
                            setTimeout(computerTurn, 500)
                        }, 500)
                    }
                        }, 1000)
                    }, 500)
                    break;
                } else if(i[0] == 14){
                    displayCard.classList.add('right-card');
                    allComputerCards[computerCardsContainer.indexOf(i)].classList.add('right-card');
                    setTimeout(() => {
                        displayCard.classList.remove('right-card');
                        allComputerCards[computerCardsContainer.indexOf(i)].classList.remove('right-card');
                        showCard.splice(0, showCard.length);
                        showCard.push(i);
                        whotCards.push(i);
                        computerCardsContainer.splice(computerCardsContainer.indexOf(i), 1);
                        updateShowCards();
                        updateComputerCards();
                        checkWinner();
                        isComputerTurn = true;
                        trash.splice(0, trash.length);
                        setTimeout(() => {
                            if(isComputerTurn != false){
                            let _player14 = new Rules(playerCardsContainer, 'player-card');
                            _player14.goToMarket();
                            updatePlayerCards();

                            marketCard.classList.add('market');
                            document.querySelector(`.player-card:last-of-type`).classList.add('market');
                            document.querySelector('.player-added-card-info').style.display = 'block';
                            document.querySelector('.player-added-card-info .number').innerHTML = '+1';

                            setTimeout(() => {
                                document.querySelector('.player-added-card-info').style.display = 'none';
                            marketCard.classList.remove('market');
                            document.querySelector(`.player-card:last-of-type`).classList.remove('market');
                            setTimeout(computerTurn, 500)
                        }, 500)
                    }
                        }, 1000)
                    }, 500)
                    break;
                } else if (i[0] == 1){
                    displayCard.classList.add('right-card');
                    allComputerCards[computerCardsContainer.indexOf(i)].classList.add('right-card');
                    setTimeout(() => {
                        displayCard.classList.remove('right-card');
                        allComputerCards[computerCardsContainer.indexOf(i)].classList.remove('right-card');
                        showCard.splice(0, showCard.length);
                        showCard.push(i);
                        whotCards.push(i);
                        computerCardsContainer.splice(computerCardsContainer.indexOf(i), 1);
                        updateShowCards();
                        updateComputerCards();
                        checkWinner();
                        isComputerTurn = true;
                        trash.splice(0, trash.length);
                        setTimeout(() => {
                            if(isComputerTurn != false){
                            playerCardsContainer.forEach(item => {
                                allPlayerCards[playerCardsContainer.indexOf(item)].classList.add('wrong-card');
                            })
                            setTimeout(() => {
                                playerCardsContainer.forEach(item2 => {
                                    allPlayerCards[playerCardsContainer.indexOf(item2)].classList.remove('wrong-card');
                                })
                                setTimeout(computerTurn, 1000);
                        }, 500);
                    }
                        }, 1000)
                    }, 500)
                    break;
                }
                else {
                    displayCard.classList.add('right-card');
                    allComputerCards[computerCardsContainer.indexOf(i)].classList.add('right-card');
                    setTimeout(() => {
                        displayCard.classList.remove('right-card');
                        allComputerCards[computerCardsContainer.indexOf(i)].classList.remove('right-card');
        
                        showCard.splice(0, showCard.length);
                        showCard.push(i);
                        whotCards.push(i);
                        computerCardsContainer.splice(computerCardsContainer.indexOf(i), 1);
                        updateShowCards();
                        updateComputerCards();
                        trash.splice(0, trash.length);
                        isPlayerTurn = true;
                        isComputerTurn = false;
                        checkWinner();
                        playerTurn();
                    },500)
                    break;
                }
            }else {
                trash.push('none');
                if (trash.length == computerCardsContainer.length){

                    computerCardsContainer.push(whotCards[0]);
                    whotCards.splice(0, 1);
                    updateShowCards();
                    updateComputerCards();
                    trash.splice(0, trash.length)
                    marketCard.classList.add('market');
                    document.querySelector(".computer-card:last-of-type").classList.add('market');
                    setTimeout(() => {
                        marketCard.classList.remove('market');
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
    marketCard.addEventListener('click', () => {
        if (isComputerTurn == false){
            playerCardsContainer.push(whotCards[0]);
            whotCards.splice(0, 1);
            updateShowCards();
            updatePlayerCards();

            marketCard.classList.add('market');
            document.querySelector(".player-card:last-of-type").classList.add('market');

            setTimeout(() => {
                marketCard.classList.remove('market');
                document.querySelector(".player-card:last-of-type").classList.remove('market');
            }, 500)

            isPlayerTurn = false;
            isComputerTurn = true;
            setTimeout(computerTurn, 1000);
        } else {
            null;
        }
    })
}

function checkWinner(){
    if (computerCardsContainer.length == 0){
        console.log('computer won')
        showWinner(computerWinInfo);
        isComputerTurn = true;
    } else if (playerCardsContainer.length == 0){
        console.log('you won');
        showWinner(playerWinInfo);
        isPlayerTurn = true;
    }
}

function emptyCardsCheck(){
    if(whotCards.length == 0){
        whotCards = whotCards.concat(backupCards);
        backupCards.splice(0, backupCards.length);
        console.log(whotCards);
    }
    console.log(playerCardsContainer.length, computerCardsContainer.length, whotCards.length, backupCards.length)
}

class Rules{
    constructor(cardcontainer, card){
        this.cardcontainer = cardcontainer;
        this.card = card;
    }
    pickTwo(){
        this.cardcontainer.push(...whotCards.slice(0, 2));
        whotCards.splice(0, 2);
    }

    goToMarket(){
        this.cardcontainer.push(whotCards[0]);
        whotCards.splice(0, 1);
    }
}
