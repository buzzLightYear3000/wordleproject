

//CHECK EVAL

//CONSTANTS

const maxGuessCount = 6
const maxGuessCountType = typeof (maxGuessCount)
console.log(maxGuessCountType)
const winningWords = ['banal', 'great', 'teams', 'count', 'tennis']

//VARIABLES

let winningWord
let wordToGuess
let currentLetterIndex = 0
//let currentWordArr

let guessCount
let noOfGuesses

let currentGuessString
let currentGuessArray = []
let board
let greenLetters = []
let usedLettersContainer = []

let winner
let loose

//CACHED ELEMENT REFERENCES

const ltrEls = document.querySelectorAll('.ltr')
console.dir(ltrEls)

const usdltrsEls = document.querySelectorAll('.usdltr')
console.log(usdltrsEls)

const restartbuttonEl = document.querySelector('#restart')
console.log(restartbuttonEl)

const guesscountmsgEl = document.querySelector('#guesscountmessage')
console.log(guesscountmsgEl)

const guessSubmitEl = document.getElementById("form")
console.log(guessSubmitEl)

const currentGuessEl = document.getElementById("guess")
console.log(currentGuessEl)

const subbuttonEl = document.getElementById('submbutton')
console.log(subbuttonEl)

const letterBoxEl = document.querySelector('.letterbox')
console.log(letterBoxEl)




//EVENT LISTENERS

restartbuttonEl.addEventListener("click", init)
form.addEventListener("submit", checkGuess)

//FUNCTIONS

init()

function init() {
    guessCount = Number(0)
    currentGuessString = ""
    currentGuessArray = []
    winner = false
    loose = false
    winningWord = ""
    wordToGuess = []
    board = []
    usedLettersContainer = []
    greenLetters = []
    currentLetterIndex = 0
    console.log('INIT')
    guesscountmsgEl.textContent = 'Lets Play!'
    subbuttonEl.removeAttribute("disabled", "")
    wipeKeyboard()
    chooseNewWord()
    }

console.log(winningWord)
console.log(guessCount)
console.log(board)

function chooseNewWord() {
    let randomIdx = Math.floor(Math.random() * winningWords.length)
    console.log(randomIdx)
    let chooseNewWord = winningWords[randomIdx]
    console.log(chooseNewWord)
    winningWord = chooseNewWord
    wordToGuess = winningWord.split('')
    console.log(winningWord)
}

function wipeKeyboard() {
    usdltrsEls.forEach(key => {
        key.textContent = "";
    })
    ltrEls.forEach((ltrEl) => {
        ltrEl.textContent = "";
        ltrEl.style.backgroundColor = "white";
    })
}

function checkGuess(evt) {
    evt.preventDefault()
    const guessValue = document.getElementById('guess').value
    if (alphabetCheck(guessValue) && guessValue.length === 5) {
        currentGuessString = guessValue
        guessStringToArray()
        console.log(board)
        boardUpdate()
        revwUsedLetters()
        updateMessage(guessCount)
        nextGo()
    } else {
        guessSubmitEl.disabled = false;
        currentGuessEl.value = ""
        currentGuessEl.placeholder = '5 letters and a-z only!'
    }

}


function alphabetCheck(text) {
    const letters = /^[A-Za-z]+$/;
    if (text.match(letters)) {
        console.log('working')
        return true;
    }
    else {
        console.log('error')
        alert("message");
        return false;
    }
}
function guessStringToArray() {
    let type = typeof (currentGuessString)
    console.log(currentGuessString)
    console.log(type)
    currentGuessArray = currentGuessString.split('')
    console.log(board)
    console.log(currentGuessArray)
    currentGuessArray.forEach((letter, index) => {
        board.push(currentGuessArray[index])
        console.log(board[0])
        console.log(board[currentLetterIndex])
    });
}


function boardUpdate() {
    for (let i = 0; i < 5; i++) {
        let currentLetterGuess = board[currentLetterIndex]
        let shade = ltrEls[currentLetterIndex]
        console.log(shade)
        ltrEls[currentLetterIndex]
        ltrEls[currentLetterIndex].textContent = board[currentLetterIndex]
        console.log(currentLetterIndex)
        console.log(board[currentLetterIndex])
        console.log(wordToGuess[i])
        console.log(currentLetterGuess)
        console.log(ltrEls[currentLetterIndex])
        if (wordToGuess[i] === currentLetterGuess) {
            ltrEls[currentLetterIndex].style.color = "black";
            shade.style.backgroundColor = "green";
            greenLetters.push(currentLetterGuess)
            console.log(greenLetters)
            if (!usedLettersContainer.includes(currentLetterGuess)) {
                usedLettersContainer.push(currentLetterGuess)
            }

        } else if (wordToGuess.includes(currentLetterGuess)) {
            ltrEls[currentLetterIndex].style.color = "black";
            shade.style.backgroundColor = "yellow";
            if (!usedLettersContainer.includes(currentLetterGuess)) {
                console.log(usedLettersContainer)
                usedLettersContainer.push(currentLetterGuess)
                console.log(usedLettersContainer)
            }
        } else {
            ltrEls[currentLetterIndex].style.color = "black";
            shade.style.backgroundColor = "grey";
            if (!usedLettersContainer.includes(currentLetterGuess)) {
                usedLettersContainer.push(currentLetterGuess)
                console.log(usedLettersContainer)
            }
        }
        currentLetterIndex++
    }

}

function revwUsedLetters() {
    usdltrsEls.forEach((key, index) => {
        usdltrsEls[index].textContent = usedLettersContainer[index]
        if (greenLetters.includes(usedLettersContainer[index])) {
            usdltrsEls[index].style.color = "green";
        }
    })
}


function updateMessage(guessCount) {
    let guessesRemaining = (maxGuessCount - guessCount - 1)
    if (currentGuessString === winningWord) {
        winner = true
        guesscountmsgEl.textContent = 'You win! Press restart to try again'
        subbuttonEl.setAttribute("disabled", "")
        console.log('winner')
        return
    } else if (guessesRemaining < 1 && winner !== true) {
        guesscountmsgEl.textContent = 'You loose! Press restart to try again'
        subbuttonEl.setAttribute("disabled", "")
        console.log('loose')
        return
    } else {
        let guessType = typeof (guessesRemaining)
        subbuttonEl.removeAttribute("disabled", "")
        console.log(guessType)
        console.log(guessesRemaining)
        console.log(`${guessesRemaining} guesses left!`)
        return guesscountmsgEl.textContent = `${guessesRemaining} guesses left!`


    }

}

function nextGo() {
    if (winner || loose) {
        return
    } else {
        console.log(currentGuessString)
        console.log(guessCount)
        currentGuessEl.placeholder = ""
        guessSubmitEl.reset()
        guessCount += 1
        currentGuessString = ""
        console.log(currentGuessString)
        console.log(guessCount)
    }

}




//