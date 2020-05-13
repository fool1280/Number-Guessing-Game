/* List of id used:
error: what's wrong
guess-remaining: output guess remaining
user-guess: number user guess
history: output history of guess
guess: button Guess
reset: delete array and beginning from start
*/
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function resetGame() {
    
    number = getRandomInt(100) + 1; //random number from 1 to 100
    guessRemaining = 5;
    history = [];
    historyText = "";

    document.getElementById("error").innerHTML = null;  
    document.getElementById("history").innerHTML = null;
    document.getElementById("guess").disabled = false;
    document.getElementById("guess-remaining").innerHTML = `Remaining Guesses 5`;
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
    let guess = document.getElementById("user-guess").value;
    if (check(guess)) {
        return 0;
    }
    guessRemaining--;
    if (guessRemaining>0) {
        console.log(number);
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
                updateText += `Remaining Guesses ${guessRemaining}`;
            } else {
                updateText += `1 Remaining`;
            }
            document.getElementById("error").innerHTML = errorText;  
            document.getElementById("guess-remaining").innerHTML = updateText;   
            document.querySelector("div").style.backgroundColor = "#F20530"; 
        }
        history.push(guess);
        historyUpdate()
    } else {
        document.getElementById("error").innerHTML = null;  
        document.getElementById("guess-remaining").innerHTML = `Out of guesses! You lose :(`;
        document.getElementById("guess").disabled = true;
    }
    document.getElementById("user-guess").value = null;
}

//init
let number = getRandomInt(100) + 1; //random number from 1 to 100
document.getElementById("guess-remaining").innerHTML = `Remaining Guesses 5`;
document.getElementById("round").innerHTML = `No Round Information`;
let guessRemaining = 5;
let history = [];
let round = [];
let historyText = "";


