const questions = [
    {
        question: "What is the smallest bone in the human body?", answers:[
            {text: "Stapes",  correct: true},
            {text: "Femur",  correct: false},
            {text: "Tibia",  correct: false},
            {text: "Humerus",  correct: false},
        ]
    },
    {
       
        question: "Who was the first woman to win a Nobel Prize?", answers:[
            {text: "Marie Curie",  correct: true},
            {text: "Mother Teresa",  correct: false},
            {text: "Margaret Thatcher",  correct: false},
            {text: "Malala Yousafzai",  correct: false},
        ] 
    },
    {
       
        question: "In which year did the Berlin Wall fall, leading to the reunification of Germany?", answers:[
            {text: "1989",  correct: false},
            {text: "1985",  correct: true},
            {text: "1991",  correct: false},
            {text: "1995",  correct: false},
        ] 
    },
    {
       
        question: "Who was the first person to reach the summit of Mount Everest?", answers:[
            {text: "Sir Edmund Hillary",  correct: false},
            {text: "Tenzing Norgay",  correct: true},
            {text: "Reinhold Messner",  correct: false},
            {text: "Sir Chris Bonington",  correct: false},
        ] 
    },
    {
       
        question: "Which African country was formerly known as Abyssinia?", answers:[
            {text: "Ethiopia",  correct: true},
            {text: "Nigeria",  correct: false},
            {text: "Kenya",  correct: false},
            {text: "Tanzania",  correct: false},
        ] 
    }

];

const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("ans-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct; 
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextBtn.style.display = "none";
    while(ansBtn.firstChid){
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtn.firstChild).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML="play again";
    nextBtn.style.display = "block";
}

function handleNextButton (){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


 nextBtn.addEventListener("click", () =>{
     if(currentQuestionIndex<questions.length){
         handleNextButton();
     }else{
         startQuiz();
     }
});
