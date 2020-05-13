/* List of id used:
error: what's wrong
guess-remaining: output guess remaining
user-guess: number user guess
history: output history of guess
guess: button Guess
reset: delete array and beginning from start
best-score: least guess -> max remaining guess
round: results from each round
time-remain: time remaining for each round
*/
function endRound() {
    let updateText = "";
    guessRemaining--;
    if (guessRemaining>1) {
        updateText += `Remaining Guesses ${guessRemaining}.`;
    } else {
        updateText += `1 Remaining.`;
    }
    document.getElementById("guess-remaining").innerHTML = updateText; 
}

function timecounting() {
    time = 20;
    document.getElementById("start-timer").disabled = true;
    myTime = setInterval(() => {
        document.getElementById('timer').innerHTML = `Time remaining: ${time}` ;
        time--;
        console.log(time)
        if (time === -1) {
            clearInterval(myTime); 
            endRound();
        }
    }, 1000)

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function resetGame() {
    let score = 5-guessRemaining;
    round.push(score);
    if (score<5 && score>1) {
        roundText += `Round ${round.length}: ${score} guesses.<br>`
    } else {
        if (score === 5) {
            roundText += `Round ${round.length}: You didn't win :(<br>`
        } else if (score === 1) {
            roundText += `Round ${round.length}: ${score} guess. <br>`
        } else if (score === 0) {
            roundText += `Round ${round.length}: You didn't try :(. <br>`    
        }
    }
    document.getElementById("round").innerHTML = roundText;
    if (guessRemaining>bestScore) {
        bestScore = guessRemaining;
        document.getElementById("best-score").innerHTML = `You best score is ${score} guesses!`;
    }
    if (bestScore === 0) {
        document.getElementById("best-score").innerHTML = `You haven't won :(`;    
    }
    number = getRandomInt(100) + 1; //random number from 1 to 100
    guessRemaining = 5;
    history = [];
    historyText = "";
    time = 20; // time start from 0
    document.getElementById("error").innerHTML = null;  
    document.getElementById("history").innerHTML = null;
    document.getElementById("guess").disabled = false;
    document.getElementById('timer').innerHTML = null;
    document.getElementById("guess-remaining").innerHTML = `Remaining Guesses 5.`;
    document.querySelector("div").style.backgroundColor = "whitesmoke";
}
function historyUpdate() {
    l = history.length;
    if (l === 1) {
        historyText += history[l-1];
    } else {
        historyText += ", " + history[l-1];
    }
    document.getElementById("history").innerHTML = `${historyText}`
}
function check(x) {
    l = history.length; 
    if (l>0 && Number(x) == history[l-1]) {
        alert("You enter the same number twice! Try again with a different number!");
        document.getElementById("user-guess").value = null;
        return true;
    }
    return false;
}
function guessNumber() { 
    if (time === -1) {
        timecounting();
    } else {
        clearInterval(myTime);
        timecounting();
    }
    let guess = document.getElementById("user-guess").value;
    if (check(guess)) {
        return 0;
    }
    guessRemaining--;
    history.push(guess);
    historyUpdate()
    if (guessRemaining>0) {
        if (Number(guess) === number) {
            document.getElementById("error").innerHTML = null;  
            document.getElementById("guess-remaining").innerHTML = null;
            document.getElementById("guess-remaining").innerHTML = `You Win!`;
            document.getElementById("guess").disabled = true;
            document.querySelector("div").style.backgroundColor = "#04BF8A";
        } else {
            let updateText = "";
            let errorText = "";
            if (Number(guess)<number) {
                errorText = `Too Low with ${guess}<br>`;
            } else {
                errorText = `Too High with ${guess}<br>`;
            }
            if (guessRemaining>1) {
                updateText += `Remaining Guesses ${guessRemaining}.`;
            } else {
                updateText += `1 Remaining.`;
            }
            document.getElementById("error").innerHTML = errorText;  
            document.getElementById("guess-remaining").innerHTML = updateText;   
            document.querySelector("div").style.backgroundColor = "#F20530"; 
        }
    } else {
        document.getElementById("error").innerHTML = null;  
        document.getElementById("guess-remaining").innerHTML = `Out of guesses! You lose :(`;
        document.getElementById("guess").disabled = true;
    }
    document.getElementById("user-guess").value = 0;
}

//init
let number = getRandomInt(100) + 1; //random number from 1 to 100
document.getElementById("guess-remaining").innerHTML = `Remaining Guesses 5`;
document.getElementById("round").innerHTML = `No Round Information`;
let guessRemaining = 5;
let history = [];
let round = [];
let roundText = "";
let bestScore = 0;
let bestText = "";
let historyText = "";
let time; // time start from 0
let myTime;
