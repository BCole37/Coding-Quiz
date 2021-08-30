// making elements for each id
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // hides the start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // reveals the questions 
  questionsEl.removeAttribute("class");

  // starts timer
  timerId = setInterval(clockCountdown, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // gets current question from question
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // removes old choices
  choicesEl.innerHTML = "";

  // loop through choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);

    choiceButton.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceButton.addEventListener("click", questionClick);

    // display on the page
    choicesEl.appendChild(choiceButton);
  });
}

function questionClick() {
  // check if answer is correct
  if (this.value !== questions[currentQuestionIndex].answer) {
    //remove ten seconds for wrong answer
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Incorrect";
    } else {
    feedbackEl.textContent = "Correct";
    }

  // feedback on if the answer was right or wrong
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // end after last question else move to next question
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}


// switches display from the questions screen to the results screen
function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockCountdown() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get initials
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or set to empty
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format the new score
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // got to highscores page
    window.location.href = "score-Tracker.html";
  }
}

// submit initials
submitBtn.addEventListener("click", saveHighscore);

// start quiz
startBtn.addEventListener("click", startQuiz);

