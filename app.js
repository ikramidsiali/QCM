const homeBox = document.querySelector(".home-box");

window.onload = function ()
{
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}
let availableQuestions = [];

function setAvailableQuestions()
{
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i ++)
    {
        availableQuestions.push(quiz[i]);
    }
}

const quizBox = document.querySelector(".quiz-box");

function startQuiz()
{
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions ();
    getNewQuestion ();
    answersIndicator();
}
const questionNumber= document.querySelector(".question-number");
const questionText= document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
let questionCounter = 0;
let currentQuestion;
let availableOptions = [];

function getNewQuestion () 
{
  questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
  const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion=questionIndex;
  questionText.innerHTML=currentQuestion.q;
  const index1 = availableQuestions.indexOf(questionIndex); /*to know the position of the string 0 1 2..*/ 
  availableQuestions.splice(index1,1); /*to remove the displayed questions from the list*/
  const optionLen = currentQuestion.options.length;
  for(let i=0; i<optionLen; i ++)
  {availableOptions.push(i)}
  optionContainer.innerHTML = '';

  let animationDelay = 0.15;
  for(let i=0; i< optionLen; i ++)
  {
    const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 = availableOptions.indexOf(optionIndex);
    availableOptions.splice(index2,1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.15; /*so that options pop after each other*/
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick","getResult(this)");
  }
  questionCounter ++;
}

let correctAnswers = 0;
let attempt = 0;

function getResult(element)
{
    const id = parseInt(element.id); /*the position of the option clicked on*/
    if(id === currentQuestion.answer)
    {
        element.classList.add("correct");
        updateAnswerIndicator("correct"); /*put the image of right*/
        correctAnswers++;
        console.log("correct:" + correctAnswers)
    } 
    else
    {
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");
        
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i ++) /*look for the right one and make it green*/
        {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer)
            {
            optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}


function unclickableOptions() 
{
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i<optionLen; i ++)
    {
       optionContainer.children[i].classList.add("already-answered"); /*pointer-events: none;*/
    }
}

const answersIndicatorContainer = document.querySelector(".answers-indicator");

function answersIndicator()
{
    answersIndicatorContainer.innerHTML ='';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i ++)
    {
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType)
{
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType) /*?????*/
}

function next () 
{
    if(questionCounter === quiz.length)
    {
        console.log("quiz over");
        quizOver();
    }
    else 
    {
        getNewQuestion();
    }
}

const resultBox = document.querySelector(".result-box");

function quizOver()
{
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult()
{ 
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML =correctAnswers +" /" + quiz.length;
}

function resetQuiz()
{
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz()
{
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome()
{
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}

