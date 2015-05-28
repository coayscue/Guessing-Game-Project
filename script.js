

$(document).ready(function(){

    var correctNum = 0;
    var guessesLeft = 5;
    var guesses = [];
    var hotGuesses = "";
    var coldGuesses = "";

    var $input = $("#input");
    var $handImage = $("#handImg");
    var $submitButton = $("#submitBtn");


    //animation that bounces the hand
    $handImage.bounceHand = function(){
        $(this).animate({
            top: "-=20px"
        },500, "swing", function(){
            $(this).animate({
                top: "+=20px"
            }, 500, "swing", function(){
                $handImage.bounceHand();
            })
        })
    };


    $submitButton.on("click", function() {
        console.log("submitted");
        var guessNum = $input.val();
        if (guessNum % 1 === 0 && guessNum <= 100 && guessNum >= 1 && $.inArray(guessNum, guesses) === -1){
            guesses.push(guessNum);
            guessesLeft--;
            document.getElementById("hint").innerHTML = guessesLeft.toString().concat(" Guesses Remaining");
            $("#message").css("display", "inline");
            if (guessesLeft === 0 && Math.abs(guessNum-correctNum) !== 0 ){
                document.getElementById("message").innerHTML = "Sorry, try again.\nAnswer: " + correctNum;
                $handImage.css("display", "none");
                $(this).prop("disabled", true);
            }else{
                var difference = Math.abs(guessNum-correctNum);
                switch (true) {
                    case difference === 0:
                        document.getElementById("message").innerHTML = "Correct!<br>  Answer: " + guessNum;
                        $handImage.attr("src", "handShaka.png");
                        $handImage.css("display", "inline");
                        //stop animations and disable submit button
                        $(this).prop("disabled", true);
                        $(this).disable();
                        break;
                    case difference < 6:
                        document.getElementById("message").innerHTML = "You are super hot.<br>";
                        if (hotGuesses.length === 0){
                            hotGuesses += ("  " + guessNum.toString());
                        }else{
                            hotGuesses += (",  " + guessNum.toString());
                        }
                        break;
                    case difference < 12:
                        document.getElementById("message").innerHTML = "You are hot.<br>";
                        if (hotGuesses.length === 0){
                            hotGuesses += ("  " + guessNum.toString());
                        }else{
                            hotGuesses += (",  " + guessNum.toString());
                        }
                        break;
                    case difference < 25:
                        document.getElementById("message").innerHTML = "You are warm.<br>";
                        if (hotGuesses.length === 0){
                            hotGuesses += ("  " + guessNum.toString());
                        }else{
                            hotGuesses += (",  " + guessNum.toString());
                        }
                        break;
                    case difference < 40:
                        document.getElementById("message").innerHTML = "You are cold.<br>";
                        if (coldGuesses.length === 0){
                            coldGuesses += ("  " + guessNum.toString());
                        }else{
                            coldGuesses += (",  " + guessNum.toString());
                        }
                        break;
                    default:
                        document.getElementById("message").innerHTML = "You are super cold.<br>";
                        if (coldGuesses.length === 0){
                            coldGuesses += ("  " + guessNum.toString());
                        }else{
                            coldGuesses += (",  " + guessNum.toString());
                        }
                        break;
                }
                if (guessNum - correctNum < 0){
                    document.getElementById("message").innerHTML += ("Guess Higher.<br>Your Hot Guesses:   " + hotGuesses + "<br>Your Cold Guesses:   " + coldGuesses);
                    $handImage.attr("src", "handPointingUp.png");
                    $handImage.css("dispay", "inline");

                    if ($handImage.bouncing){

                    }else{
                        $handImage.bouncing = true;
                        $handImage.bounceHand();

                    }


                    $input.val("");
                }else if (guessNum - correctNum > 0){
                    document.getElementById("message").innerHTML += ("Guess Lower.<br>Your Hot Guesses:   " + hotGuesses + "<br>Your Cold Guesses:   " + coldGuesses);
                    $handImage.attr("src", "handPointingDown.png");
                    $handImage.css("display", "inline");
                    if ($handImage.bouncing){

                    }else{
                        $handImage.bouncing = true;
                        $handImage.bounceHand();
                    }
                    $input.val("");
                }
            }
        }else if($.inArray(guessNum, guesses) !== -1){
            alert("You already guessed that!");
        }else {
            alert("Your input is invalid.");
        }
    });

//when user presses enter from input area
    $input.keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            $submitButton.click();
        }
    });

//shows the hint
    $("#hintBtn").on("click", function(){
        console.log("hinted");
        var divisors = "Divisors: 1 ";
        for (var i = 2; i < 10; i++){
            console.log("1");
            if (correctNum % i === 0){
                console.log("2");
                divisors = divisors.concat(", ", i);
            }
        }
        divisors = divisors.concat("<br>Answer: ", correctNum);
        console.log(correctNum);
        document.getElementById("hint").innerHTML = divisors;
    });


//sets up a new game
    var newGame = function(){
        console.log("new gamed");
        //set the new correctNumber to be between 1 and 100
        correctNum = Math.floor(Math.random()*100)+1;
        //resets game variables
        guessesLeft = 5;
        guesses = [];
        hotGuesses = "";
        coldGuesses = "";
        $("#message").css("display", "none");
        //$handImage.css("display","none");
        $handImage.attr("src", "");
        $handImage.stop();
        $submitButton.prop("disabled", false);
        document.getElementById("hint").innerHTML = guessesLeft.toString() + " Guesses Remaining";
    };


//restarts the game
    $("#restartBtn").on("click", function(){
        console.log("restart");
        if (confirm("Are you sute you want to restart?")) {
            newGame();
        }
    });

//start new game when document loads
    newGame();
});
