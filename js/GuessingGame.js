// ---------------------------------------------
// SECTION #1:  generateWinningNumber Function
// ---------------------------------------------

/*

PURPOSE:

returns a random number between 1 and 100

Math.random returns a decimal from 0 up to but not including 100

There is a tiny chance that Math.random will return 0. In this case, your function should return 1

*/

// Math.random will return a random number from 0 to 1 (including 0, but NOT including 1)
// round down, but since there could be a 0
// add 1 to result
function generateWinningNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

let randomNum = generateWinningNumber();

// console.log(randomNum);




// ---------------------------------------------
// SECTION #2:  shuffle function
// ---------------------------------------------

/*

PURPOSE:

shuffles an array in place using Math.random() and the Fisher–Yates shuffle algorithm

(see https://bost.ocks.org/mike/shuffle/ for reference)

*/

function shuffle(array) {

    let n = array.length;
    let swap;
    let i;
  
    // While there remain elements to shuffle…
    while (n) {
  
      // generate a random number and set i to equal that index number
      i = Math.floor(Math.random() * n);

      // decrement counter n
      n--;
  
      // And swap it with the current element.
      // set swap to equal element at last index location
      swap = array[n];

      // set last element location to equal element at randomly generated i position
      array[n] = array[i];

      // set the position that used to be at randomly generated i position to equal swapped element (last element)
      array[i] = swap;
    }
  
    return array;
  }

let shuffledArray = shuffle([20, 50, 70]);
// console.log(shuffledArray);



// ---------------------------------------------
// SECTION #3:  game constructor funtion
// ---------------------------------------------


/* 

create Game constructor function

playersGuess property: will hold player's number guess

pastGuesses [array]:  holds all of the player's past guesses

winningNumber property, which calls generateWinningNumber

*/


function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

// let game = new Game();

// methods on Game.prototype

// ---------------------------------------------------------------------------------------------
// difference method:  returns the absolute value of the difference between the playersGuess and winningNumber
// ---------------------------------------------------------------------------------------------

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber);
}

// hard coded values to test
// game.playersGuess = 20;
// game.winningNumber = 10;
// console.log(game.difference());


// ---------------------------------------------------------------------------------------------
// isLower method:  returns true if the playersGuess is lower than winningNumber, and false if not.
// ---------------------------------------------------------------------------------------------

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
}

// game.playersGuess = 20;
// game.winningNumber = 10; 
// console.log(game.isLower());
// false

// game.winningNumber = 30;
// console.log(game.isLower());
// true


// ---------------------------------------------------------------------------------------------
// playersGuessSubmission method
// ---------------------------------------------------------------------------------------------

/* 

takes a number as an argument and sets that as playersGuess

throws error 'That is an invalid guess.'

for the following
  less than 1, greater than 100, or not a number

return value of playersGuessSubmissions is the return value of checkGuess.

*/

Game.prototype.playersGuessSubmission = function(num) {

    // check for invalid num arg entries and throw error as noted below
    if(num <= 0 || num > 100 || isNaN(num)) {
        throw "That is an invalid guess.";
        // return 'invalid number';
    }

    // set value of num arg to playersGuess
    this.playersGuess = num;

    // calling the method and passing in 'this'
    return this.checkGuess();

}

// console.log(game.playersGuessSubmission(0));
// Throw("That is an invalid guess.");

// console.log(game.playersGuessSubmission(-1));
// Throw("That is an invalid guess.");

// game.playersGuessSubmission(101);
// Throw("That is an invalid guess.");

// game.playersGuessSubmission("not a number");
// Throw("That is an invalid guess.");


// ---------------------------------------------------------------------------------------------
// checkGuess method
// ---------------------------------------------------------------------------------------------

/* 

on Game.prototype

is called in playersGuessSubmission method above

compares playersGuess and returns appropriate string

if playersGuess isn\'t the winningNumber or a duplicate, add it to pastGuesses

*/



Game.prototype.checkGuess = function() {

    // returns "You Win!" if playersGuess equals winningNumber'
    if(this.playersGuess === this.winningNumber) {
        return 'You Win!';
    }

    //returns "You have already guessed that number." if playersGuess is in pastGuesses
    else if(this.pastGuesses.includes(this.playersGuess)) {
        return 'You have already guessed that number.';
    }

    else {

        // add guess to playersGuesses array
        this.pastGuesses.push(this.playersGuess);

        // returns "You Lose" if this is the players 5th guess'
        if(this.pastGuesses.length === 5) {
            return 'You Lose.';
        }

        // returns "You\'re burning up!" if the difference between playersGuess and winningGuess is less than 10
        else if(this.difference() < 10) {
            return "You\'re burning up!";
        }

        // returns "You\'re lukewarm." if the difference between playersGuess and winningGuess is less than 25
        else if(this.difference() < 25) {
            return "You\'re lukewarm.";
        }

        // returns "You\'re a bit chilly." if the difference between playersGuess and winningGuess is less than 50'
        else if(this.difference() < 50) {
            return "You\'re a bit chilly.";
        }

        // returns "You\'re ice cold!" if the difference between playersGuess and winningGuess is less than 100'
        else if(this.difference() < 100) {
            return "You\'re ice cold!";
        }

    }

}

// game.winningNumber = 42;
// let outputTest = game.playersGuessSubmission(42);
// console.log(outputTest);
// 'You Win!'

// game.winningNumber = 42;
// game.playersGuessSubmission(36);
// console.log(game.playersGuessSubmission(36));
// 'You have already guessed that number.'

// game.winningNumber = 42;
// console.log(game.playersGuessSubmission(36));
// console.log(game.pastGuesses);
// expect(game.pastGuesses.indexOf(36)).toBeGreaterThan(-1);


// game.winningNumber = 42;
// game.playersGuessSubmission(1);
// game.playersGuessSubmission(2);
// game.playersGuessSubmission(3);
// game.playersGuessSubmission(4);
// console.log(game.playersGuessSubmission(5));
// console.log(game.pastGuesses);
// 'You Lose.'


// game.winningNumber = 42;
// console.log(game.playersGuessSubmission(45));
// 'You\'re burning up!'

// game.winningNumber = 42;
// console.log(game.playersGuessSubmission(62));
// 'You\'re lukewarm.'

// game.winningNumber = 42;
// console.log(game.playersGuessSubmission(72));
// 'You\'re a bit chilly.'

// game.winningNumber = 42;
// console.log(game.playersGuessSubmission(92));
// 'You\'re ice cold!'


// ---------------------------------------------------------------------------------------------
// newGame method
// ---------------------------------------------------------------------------------------------

/* 

creates a new instance of the Game constructor function

*

let newGame = function() {
    
    // returns new instance of constructor function Game
    return new Game();

}

// create new instance of Game
game = newGame();

// console.log(game.playersGuess);
// null
// console.log(game.pastGuesses.length);
// 0



// ---------------------------------------------------------------------------------------------
// provideHint method
// ---------------------------------------------------------------------------------------------

/* 

on Game.prototype

generates an array with length of 3

includes the winning number

calls generateWinningNumber to fill the rest of the hint array with random numbers


*/

Game.prototype.provideHint = function() {

    // will hold three values
    let array = [];

    // value 0:  winningNumber random value in game instance
    array.push(this.winningNumber);

    // value 1:  a random number produced with generateWinningNumber (outside of game instance object)
    array.push(generateWinningNumber());

    // value 2:  a random number produced with generateWinningNumber (outside of game instance object)
    array.push(generateWinningNumber());

    // calls the shuffle function on the array
    let shuffledArray = shuffle(array);

    // returns shuffled array
    return shuffledArray;

}

// let hintArray = game.provideHint();

// console.log(hintArray.indexOf(game.winningNumber));
// toBeGreaterThan(-1)



// --------------------------------------------------------------------------
// jQuery
// --------------------------------------------------------------------------

// executes jQuery code once document is load (DOM is ready)
$(document).ready(function() {


    // create new game instance after document has loaded / ready
    let game = new Game();

    console.log(game.winningNumber);

    // callback function: to be used either when #submit is clicked or enter is pressed on #player-input
    let submitGuess = function() {

        // assign value of #player-input input element to guess
        let guess = $("#player-input").val();
        
        // convert string text value of element to a number
        guess = Number(guess);

        // clear value of input element
        $("#player-input").val("");
        
        // pass guess to playres guess submission method and log returned string result
        let output = game.playersGuessSubmission(guess);

        if(output === 'You have already guessed that number.') {
            $("#main-title").text("You have already guessed that number.");
        }

        // else if(output === 'invalid number') {
        //     $("#main-title").text("Please enter a number from 1 to 100.").css('color', 'red');
        // }

        else if(output !== "You have already guessed that number.") {

            // holds all <li> elements with class of '.guess'
            let guessBoxes = document.getElementsByClassName("guess");

            // loop through all guesseBoxes elements
            for (let i = 0; i < guessBoxes.length; i++) {

                // if <li> element has dash replace with guess value
                if(guessBoxes[i].textContent === "—") {
                    guessBoxes[i].textContent = guess;
                }

                // <li> element, does not have a dash, continue to next one
                else {
                    continue;
                }

                // if element has value placed, break out of loop
                break;

            }

            // if player wins...
            if(output === 'You Win!') {

                // change main title text display to you win
                $("#main-title").text("You Win!");

                // change sub title text display to reset
                $("#sub-title").text("Click the Reset button to play again.");
                
                // disable submit and hint buttons
                $("#submit", "#hint").prop("disabled", true);

            }
    
            // if player loses...
            else if(output === 'You Lose.') {

                // change main title text display to you lose
                $("#main-title").text("You Lose.");

                // change sub title text display to reset
                $("#sub-title").text("Click the Reset button to play again.");

                // disable submit and hint button             
                $("#submit", "#hint").prop("disabled", true);
                
            }

            // respond with 'hinter' responses for guess
            else {

                // display output result (i.e. cold, luke-warm, hot, etc) in main title
                $("#main-title").text(output);

                // use isLower to determine if guess is generically lower or higher
                // if lower, modify #sub-title to display hinter guess higher
                if(game.isLower()) {
                    $("#sub-title").text("Guess Higher");
                }

                // if higher, modify #sub-title to display hinter guess lower
                else {
                    $("#sub-title").text("Guess Lower");
                }
            }

        }

    }

    // if #submit is clicked, run submitGuess
    $("#submit").click(submitGuess);
    
    // if enter is pressed on #player-input, run submitGuess
    $("#player-input").keyup(function(event) {

            let code = event.which;

            if(code === 13) {
                submitGuess();
            }

        }
    
    );

    // $("#reset").click(function() {
    //     location.reload();
    // });

    // *** RESET GAME ***

    // reste game callback function
    let resetGame = function() {

        // create new game instance
        game = new Game();

        // change main title text back to default
        $("#main-title").text("Play the Guessing Game");

        // change sub title text back to default
        $("#sub-title").text("Guess a number between 1 and 100");

        // enable submit and hint buttons
        $("#submit", "#hint").prop("disabled", false);

            // change guess <li> elemnet back to dashes
            $(".guess").text("—");
    }

    // invoke resetGame callback function with #reset button is clicked
    $("#reset").click(function() {
        resetGame();
    });

    // generate hint array;
    let hintArray = game.provideHint();

    // when #hint button is clicked, display elements of hint array in main title
    $("#hint").click(function() {
        $("#main-title").text("The winning number is " + hintArray[0] + ", " + hintArray[1] + ", or " + hintArray[2])
    });

})