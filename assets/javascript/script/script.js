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
var questionRandomizer = 0;
var answerRandomizer = 0;

var questionLoad = function () {
    var randomizeQuestions = function() {
        questionRandomizer = Math.floor(Math.random()* 5);
    };
    var setQuestion = function() {
        document.getElementById("question").textContent = questions[questionRandomizer].q;
    };
    var createButtons = function() {
        for (i = 0; i < 4; i++) {
            var Newbutton = document.createElement("button");
            
            //DOM button element is created.
            var randomizeAnswers = function() {
                // function used to randomize the answer order based on length of items in object
                // stores number of answers remaining in object
                var answerRandomizer = (Math.floor(Math.random() * 4) + 1);
                // creates and stores a random number between 1 and however many answers are in object
                Newbutton.innerHTML = (i + 1) + ". " + questions[questionRandomizer][answerRandomizer];
                // sets the innerHTML of the button element to the value of the answer that was selected
                // for using the answerRandomizer variable
                if (questions[questionRandomizer][answerRandomizer] === questions[questionRandomizer][4]) {
                    questions[questionRandomizer][answerRandomizer] = "undefined-true";
                }
                else {
                    questions[questionRandomizer][answerRandomizer] = "undefined";
                }
                // removes answer item within object array that was used as the value of the button.inner
                // html so that it cannot be used again.

            }
            var createAnswers = function() {
                Newbutton.setAttribute('id','number-' + i);
                answerList.appendChild(Newbutton);
                document.querySelector("#number-" + i).addEventListener("click", function () {
                    if(Newbutton.textContent === "undefined-true") {
                        console.log(questions[questionRandomizer]);
                        console.log(Newbutton.textContent);
                    }
                    else {
                        console.log("goodbye");
                    }
                });
            };
            var testAnswers = function() {
                if (Newbutton.innerHTML === (i + 1) + ". " + "undefined" || Newbutton.innerHTML === (i + 1) + ". " + "undefined-true")  {
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
    };
    var deleteOldQuestion = function() {
        questions[questionRandomizer].q = "undefined";
    };
    var testQuestion = function() {
        if (questions[questionRandomizer].q != "undefined") {
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
}

var beginInterval = function() {
    var interval = setInterval(function(){
        if (timer) {
            timer--;
            document.getElementById("time").textContent = timer;
        }
        else {
            clearInterval(interval);
        }
    }, 1000);
}

document.querySelector("#start").addEventListener("click", function() {
    document.getElementById("beginning-message").remove();
    document.getElementById("start").remove();
    timer = 75;
    beginInterval();
    questionLoad();
});