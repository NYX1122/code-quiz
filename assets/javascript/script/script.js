// arrays, objects, and variables
var questions = [
    {q: "Commonly used data types do NOT include:",
    1: "strings", 
    2: "booleans", 
    3: "numbers",
    4: "alerts"},
    {q: "The condition in an if / else statement is enclosed with ______.",
    1: "quotes",
    2: "curly brackets",
    3: "square brackets",
    4: "parenthesis"},
    {q: "Arrays in Javascript can be used to store ______.",
    1: "numbers and strings",
    2: "other arrays",
    3: "booleans",
    4: "all of the above"},
    {q: "String values must be enclosed within ______ when being assigned to variables.",
    1: "commas",
    2: "curly brackets",
    3: "parenthesis",
    4: "quotes"},
    {q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    1: "JavaScript",
    2: "terminal/bash",
    3: "for loops",
    4: "console.log"}
];

var timer = 0;
var answerList = document.getElementById("answer-list");
var bigText = document.getElementById("question");
var questionRandomizer = 0;
var answerRandomizer = 0;
var scoreListTime = false;
var rightOrWrong = "";
var message = document.createElement("h4");

var questionLoad = function () {
    var randomizeQuestions = function() {
        questionRandomizer = Math.floor(Math.random()* 5);
    };

    var setQuestion = function() {
        bigText.textContent = questions[questionRandomizer].q;
    };

    var createButtons = function() {
        for (i = 0; i < 4; i++) {
            var newButton = document.createElement("button");
            var randomizeAnswers = function() {
                answerRandomizer = (Math.floor(Math.random() * 4) + 1);
                newButton.innerHTML = (i + 1) + ". " + questions[questionRandomizer][answerRandomizer];
                if (questions[questionRandomizer][answerRandomizer] === questions[questionRandomizer][4]) {
                    questions[questionRandomizer][answerRandomizer] = "used-true";
                }
                else {
                    questions[questionRandomizer][answerRandomizer] = "used";
                }
            };

            var createAnswers = function() {
                if (questions[questionRandomizer][answerRandomizer] === "used-true") {
                    newButton.setAttribute('id','true');
                }
                else {
                    newButton.setAttribute('id','false');
                }
                answerList.appendChild(newButton);
                newButton.addEventListener("click", function () {
                    if(this.getAttribute('id') === "true") {
                        rightOrWrong = "right";
                        deleteButtons();
                        if (questionsChecker()) {
                            questionLoad();
                        }
                        else {
                            displayScoreList();
                            scoreListTime = true;
                        }
                    }
                    else {
                        rightOrWrong = "wrong";
                        timer = timer - 15;
                        deleteButtons();
                        if(questionsChecker()) {
                            questionLoad();
                        }
                        else {
                            displayScoreList();
                            scoreListTime = true;
                        }
                    }
                });
            };

            var testAnswers = function() {
                if (newButton.innerHTML === (i + 1) + ". " + "used" || newButton.innerHTML === (i + 1) + ". " + "used-true")  {
                    randomizeAnswers();
                    testAnswers();
                }
                else{
                    createAnswers();
                };
            }
            randomizeAnswers();
            testAnswers();
        };
        if( rightOrWrong === "") {
        }
        else if (rightOrWrong === "right") {
            message.textContent = "Correct!";
            answerList.appendChild(message);
        }
        else {
            message.textContent = "Wrong!";
            answerList.appendChild(message);
        };
    };

    var deleteOldQuestion = function() {
        questions[questionRandomizer].q = "used";
    };

    var testQuestion = function() {
        if (questions[questionRandomizer].q != "used") {
            setQuestion();
            createButtons();
            deleteOldQuestion();
        }
        else{
            randomizeQuestions();
            testQuestion();
        }
    }
    randomizeQuestions();
    testQuestion();
};

var beginInterval = function() {
    interval = setInterval(function(){
        if (timer > 0 && !scoreListTime) {
            console.log(questionsChecker());
            timer--;
            document.getElementById("time").textContent = timer;
        }
        else if (scoreListTime) {
            clearInterval(interval);
            document.getElementById("time").textContent = timer;
        }
        else {
            deleteButtons();
            displayScoreList();
        };
    }, 1000);
};

var deleteButtons = function() {
    while (answerList.hasChildNodes()) {
        answerList.removeChild(answerList.firstChild);
    };
};

var questionsChecker = function() {
    var tracker = 0;
    for (i = 0; i < 5; i++) {
        if(questions[i].q === "used") {
            tracker++
        }
    }
    if (tracker === 5) {
        return false;
    }
    else {
        tracker = 0;
        return true;
    }
}

var displayScoreList = function () {
    bigText.className = "shift-left";
    bigText.textContent = "All done!";
    var finalScore = document.createElement("h3");
    answerList.appendChild(finalScore);
    finalScore.textContent = "Your final score is " + timer + ".";
    var initials = document.createElement("h3");
    answerList.appendChild(initials);
    initials.textContent = "Enter initials:";
}

document.querySelector("#start").addEventListener("click", function() {
    document.getElementById("beginning-message").remove();
    document.getElementById("start").remove();
    timer = 75;
    beginInterval();
    questionLoad();
});