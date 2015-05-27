$(document).ready(function(){

    var correctNum = 0;
    var guessesLeft = 5;

    var $input = $("#input");
    var $handImage = $("#handImg");
    var $submitButton = $("#submitBtn");

    $submitButton.on("click", function() {
        console.log("submitted");
        var guessNum = $input.val();
        if (guessNum % 1 === 0 && guessNum <= 100 && guessNum >= 1){
            guessesLeft--;
            $("#message").css("display", "inline");
            if (guessesLeft === 0){
                document.getElementById("message").innerHTML = "Sorry, try again.\nAnswer:" + guessNum;
                $(this).disable();
            }else{
                var difference = Math.abs(guessNum-correctNum);
                switch (true) {
                    case difference == 0:
                        document.getElementById("message").innerHTML = "Correct!\nAnswer:" + guessNum;
                        $handImage.attr("src", "handShaka.png");
                        $(this).disable();
                        break;
                    case difference < 6:
                        document.getElementById("message").innerHTML = "You are super hot.\n";
                        break;
                    case difference < 12:
                        document.getElementById("message").innerHTML = "You are hot.\n";
                        break;
                    case difference < 20:
                        document.getElementById("message").innerHTML = "You are warm.\n";
                        break;
                    case difference < 40:
                        document.getElementById("message").innerHTML = "You are cold.\n";
                        break;
                    default:
                        document.getElementById("message").innerHTML = "You are super cold.\n";
                        break;
                }
                if (guessNum - correctNum < 0){
                    document.getElementById("message").innerHTML.concat("Guess Higher.");
                    $handImage.attr("src", "handPointingUp.png");
                    $handImage.toggle( "bounce", { times: 1000 }, 1000 );
                    $input.val("");
                }else if (guessNum - correctNum > 0){
                    document.getElementById("message").innerHTML.concat("Guess Lower.");
                    $handImage.attr("src", "handPointingDown.png");
                    $handImage.toggle( "bounce", { times: 1000 }, 1000 );
                    $input.val("");
                }
            }
        }else{
            Alert("Your input is invalid.");
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
                divisors.concat(', ');
            }
        }
        console.log(correctNum);
        document.getElementById("hint").innerHTML = divisors;
    });

//sets up a new game
    var newGame = function(){
        console.log("new gamed");
        //set the new correctNumber to be between 1 and 100
        correctNum = Math.floor(Math.random()*100)+1;
        guessesLeft = 5;
        $("#submitBtn").enable();
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
