var timeEl = document.querySelector(".time"),
  startQuizEl = document.querySelector("#startQuiz"),
  questionEl = document.querySelector("#H1"),
  paragraphEl = document.querySelector("#paragraph"),
  divEl = document.querySelector("#buttonContainer"),
  tagOl = document.createElement("ol"),
  secondsLeft = questions.length * 15,
  j = 0,
  questionsLength = questions.length,
  initials;

// timer function
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0 || j === questionsLength) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function wrong() {
  var tagHr = document.createElement("hr");
  tagHr.setAttribute("id", "hrEl");
  var tagP = document.createElement("p");
  tagP.setAttribute("id", "pEl");
  document.body.querySelector(".rightWrong").appendChild(tagHr);
  tagP.textContent = "Wrong!";
  document.body.querySelector(".rightWrong").appendChild(tagP);
  cleanPage();
}

function correct() {
  var tagHr = document.createElement("hr");
  tagHr.setAttribute("id", "hrEl");
  var tagP = document.createElement("p");
  tagP.setAttribute("id", "pEl");
  document.body.querySelector(".rightWrong").appendChild(tagHr);
  tagP.textContent = "Correct!";
  document.body.querySelector(".rightWrong").appendChild(tagP);
  cleanPage();
}

function cleanPage() {
  document.querySelectorAll("#liEl").forEach(e => e.parentNode.removeChild(e));
  document.querySelectorAll("#button").forEach(e => e.parentNode.removeChild(e));
  tagOl.remove();
  questionEl.textContent = "";
  setTimeout(function(){ document.querySelector("#hrEl").remove(); }, 800);
  setTimeout(function(){ document.querySelector("#pEl").remove(); }, 800);
}

function finalPage() {
  questionEl.textContent = "All done!";
  var tagP = document.createElement("p");
  if(secondsLeft > 0){
    tagP.textContent = "Your final score is " + (secondsLeft-1);
  } else {
    tagP.textContent = "Your final score is " + (secondsLeft);
  }
  tagP.setAttribute("id","p");
  document.body.querySelector(".main-content").appendChild(tagP);
  var tagForm = document.createElement("form");
  var tagInput = document.createElement("input");
  var submit = document.createElement("input");
  tagForm.setAttribute("id","form");
  //tagForm.setAttribute("action","highscores.html");
  tagInput.setAttribute("id","initials");
  tagInput.setAttribute("type","text");
  tagInput.setAttribute("name","userScore")
  submit.setAttribute("id","submitBt");
  submit.setAttribute("type","submit");
  submit.setAttribute("value","submit");
  document.body.querySelector(".main-content").appendChild(tagForm);
  tagForm.textContent = "Enter initials:";
  tagForm.appendChild(tagInput);
  tagForm.appendChild(submit);
  setTimeout(function(){ document.querySelector(".rightWrong").remove(); }, 800);
  var submitBt = document.querySelector("#submitBt");
  submitBt.addEventListener("click", function(){
    initials = document.querySelector("#initials").value;
    initials = initials.toUpperCase();
    document.querySelector("#form").setAttribute("action","highscores.html");
    localStorage.setItem(initials, secondsLeft);
  });
}

function nextQuestion() {
  // take the title of the question and change the textContent of H1 into it
  questionEl.textContent = questions[j]["title"];
  // create ul and append it to div with class main-content
  document.body.querySelector(".main-content").appendChild(tagOl);
  //create li and buttons elements (as many as the choices) and appends li to ul and buttons to li
  for (i = 0; i < questions[j]["choices"].length; i++) {
    var tagLi = document.createElement("li");
    tagLi.setAttribute("id", "liEl");
    var buttonLi = document.createElement("button");
    //assigns the text content of button equal to corresponding iteration and choice (e.g. 1. "choice1")
    buttonLi.textContent = i + 1 + ". " + questions[j]["choices"][i];
    //sets buttons id equal to "button" for each li button
    buttonLi.setAttribute("id", "button");
    tagLi.appendChild(buttonLi);
    tagOl.appendChild(tagLi);
  }
  // add an event listener to all buttons returned by document.querySelectorAll("button")
  const buttons = document.querySelectorAll("button");
  for (const button of buttons) {
    /* if answer is right goes to next question, if answer is wrong go to next question but reduce secondsLeft
    by 10 */
    button.addEventListener("click", function(event) {
      if (questions[j]["answer"].includes(button.textContent.slice(3))) {
        correct();
        j++;
        if (j < questionsLength && secondsLeft > 0) {
          nextQuestion();
        } else{
          finalPage();
        }
      } else {
        if (secondsLeft > 10) {
          secondsLeft = secondsLeft - 10;
          wrong();
          j++;
          if (j < questionsLength && secondsLeft > 0) {
            nextQuestion();
          } else{
            finalPage();
          }
        } else {
          wrong();
          j++;
          if (j < questionsLength && secondsLeft > 0) {
            nextQuestion();
          } else{
            finalPage();
          }
        }
      }
    });
  }
}

// when user clicks on Start Quiz button timer and Quiz will start
startQuizEl.addEventListener("click", function(event) {
  event.preventDefault();
  setTime();
  // remove <p> elements from the page
  paragraphEl.remove();
  // remove <div> with class buttonContainer
  divEl.remove();
  // remove Start Quiz button from the page
  startQuizEl.remove();
  // take the title of the question and change the textContent of H1 into it
  nextQuestion();
});
