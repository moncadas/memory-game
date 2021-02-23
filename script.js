let possibleColors = ['blue', 'pink', 'red', 'green', 'orange', 'purple', 'cyan', 'yellow']
let score = 0
let failedMatch = false

let firstGuess = ''
let secondGuess = ''
let usedNumbers = []
let coupleFound = 0

//---------Start game section---------
function generateCards() {    
    const table = document.getElementById('table')
    //reset the previous game
    if (table.innerHTML !== '') {
        table.innerHTML = ''
        usedNumbers = []
        score = 0
        coupleFound = 0
        updateScore(false)
    }

    const range = document.getElementById('cardNum')
    const cardNumber = range.value    
    //create as many cards as the user choose
    for (let i=0; i<cardNumber; i++) {    
        const card = document.createElement('div')
        card.className = 'cards ' + assignColor(cardNumber) + ' hidden'
        card.setAttribute('onclick','cardClicked(event)')

        table.appendChild(card)
    }
}

function assignColor(cardNum) {
    let rand = getColorNumber(cardNum)
    return possibleColors[rand - 1]
}

function getColorNumber(cardNum) {
    let result = 0
    let cont = 0
    do {
        //get random number between 1 and max number of colors for the game (card number / 2)
        let number = Math.floor(Math.random() * (cardNum / 2) + 1) 
        cont = 0
        //check recurrency of the number in the array that contains every number already used
        for (let i = 0; i < usedNumbers.length; i++) {
            if (usedNumbers[i] === number) {
                cont ++
            }
        }
        //if the number is used less than 2 times, it can be used. otherwise the function will try another number
        if (cont < 2) {
            usedNumbers.push(number)
            result = number
        } else {
            result = 0
        }
    } while (result === 0)
    return result    
}

//---------Player decision section---------
function cardClicked(sender) {
    checkFailedMatch()

    const selectedCard = sender.currentTarget
    selectedCard.className = selectedCard.className.replace('hidden', '')
    const color = selectedCard.className.replace('cards', '').trim()

    if (firstGuess === '') { 
        firstGuess = color
    } else {
        secondGuess = color
        checkMatch()
    } 
}

function checkFailedMatch() {
    if (failedMatch === true) {
        //takes the cards associated to both guesses
        const firstGuessReset = document.getElementsByClassName(firstGuess)
        const secondGuessReset = document.getElementsByClassName(secondGuess)

        coverCards(firstGuessReset)
        coverCards(secondGuessReset)
        failedMatch = false
        firstGuess = secondGuess = ''
    }
}

function coverCards(value) {
    for (let i = 0; i<value.length ; i++) {
        //add the class hidden, that turn the color to gray
        if (!value[i].className.includes('hidden')) {
            value[i].className += 'hidden'
        }
    }
}

function checkMatch() {    
    if (firstGuess === secondGuess) {  
        updateScore(true)
        firstGuess = secondGuess = ''
        coupleFound ++
        checkWin()
    } else { 
        updateScore(false)
        failedMatch = true 
    }  
}

function updateScore(rightGuess) {
    let scoreLabel = document.getElementById('score')
    if (rightGuess === true) {
        score += 100
    } else if (score > 0){        
        score -= 50       
    }
    scoreLabel.innerText = 'Score: ' + score
}

function checkWin() {
    if (coupleFound === (usedNumbers.length / 2)) {
        changePopupVisibility('block')
    }
}

function closePopup() {
    changePopupVisibility('none')
}

function changePopupVisibility(mode) {
    const popup = document.getElementById('pop')
    popup.style.display = mode
}