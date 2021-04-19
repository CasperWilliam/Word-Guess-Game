

$(document).ready(function () {

    var userGuess = ""

    // create a list of band names 

    var wordArray = ["Converge", "OnBrokenWings", "BleedingThrough", "EveryTimeIDie", "GorillaBiscuits",
        "SickOfItAll", "Terror", "CroMags", "MadBall", "BloodForBlood", "Rammalah", "RememberingNever",
        "KidsLikeUs", "EyeHateGod"]

    // store user guesses
    var guessesRemaining = 12

    // save input of letters guessed
    var guessedLetters = []

    // generate new chosen word to guess from list of words

    var generatedWord = "";

    var gameHasStarted = false

    function audioConfirmationCorrect() {
        var audio = new Audio('eaexcellent.mp3')
        audio.play()
        console.log("hit")
    }

    function audioConfirmationIncorrect() {
        var audio = new Audio('eanoway.mp3')
        audio.play()
        console.log("hit")
    }

    function audioConfirmationVictory() {
        var audio = new Audio('victory-royale.mp3')
        audio.play()
        console.log("hit")
    }
    var answerArr = generatingAnswerBlanks();

    function generateWord(arr) {
        return arr[Math.floor((Math.random() * arr.length))];
    }

    // upon generated word, create blanks for generated word in answer array

    function generatingAnswerBlanks() {
        let tempArray = [];
        for (i = 0; i < generatedWord.length; i++) {
            tempArray.push('_')
        }
        return tempArray;

    }

    // start game on keyup by listing for player input

    $(document).keyup(function (event) {
        if (gameHasStarted === false) {
            startGame(event.keyCode)
        }
    })

    //function empty(arr) {
    //    arr = [];
    //}


    function startGame(keyPressed) {
        if (keyPressed === 13) {
            // generate word
            generatedWord = generateWord(wordArray)
            // generate answer array
            answerArr = generatingAnswerBlanks()
            // reveal answer array
            console.log(generatedWord)
            gameHasStarted = true
            guessesRemaining = 12
            guessedLetters = []
            $("#remaining-guesses-text").text("Guesses left: " + guessesRemaining)
            $("#userguess-text").text(guessedLetters)
            $("#display-letters").text(answerArr.join(' '))
        }
    }
    console.log(generatedWord)
    console.log(answerArr)
    console.log(guessesRemaining)




    // check if player already guessed that letter

    $(document).keypress(function (event) {

        var foundMatch = false

        //prevents "enter" from causing non-intententional game reset

        if (event.keyCode === 13) {
            return
        }
        userGuess = event.key

        if (guessedLetters.includes(userGuess.toLowerCase())) {
            alert("you already guessed that")
            return;
        }
        else {
            guessedLetters.push(userGuess);
        }
        $("#userguess-text").text(guessedLetters)
        // check if letter matches in chosen word

        for (var i = 0; i < generatedWord.length; i++) {
            if (userGuess === generatedWord.charAt(i).toLowerCase()) {
                answerArr[i] = generatedWord.charAt(i)
                foundMatch = true
                $("#display-letters").text(answerArr.join(' '))
                audioConfirmationCorrect()
            }
        }
        if (foundMatch === false) {
            guessesRemaining--
            $("#remaining-guesses-text").text("Guesses left: " + guessesRemaining)
            console.log(guessesRemaining)
            audioConfirmationIncorrect()
        }

        // if player guesses remaining === 0 , alert player they are a loser
        if (guessesRemaining === 0) {
            alert("you lose!")
            gameHasStarted = false
        }
        // if letter is last letter to complete word, alert player wins
        if (answerArr.join('') === generatedWord) {
            audioConfirmationVictory()
            alert("you win!")
            gameHasStarted = false
            
        }

    })

    // upon generating word, generate letters as "blanks" and reveal blanks to player
    // display guesses remaining to user 
    // if letter is in generated word, reveal letter to player
    // if letter is in generated word, play "bill and ted guitar sound"
    // if letter is not in generated word play "fart sound" and remove guess from display div
    // if user correctly guesses word, display picture of generated band (word)
    // if user runs out of guesses, display nuke image 

});