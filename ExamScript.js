let body = document.querySelector(".body");
let container = document.querySelector(".container");
let header = document.querySelector(".header");
let quesBody = document.getElementsByClassName("questions-body")[0];
let ansBody = document.getElementsByClassName("answers-body")[0];
let markDiv = document.querySelector(".body .mark-div");
let bulletsDiv = document.querySelector(".bullets .spans");
let timeDiv = document.querySelector(".timer-div span");
let nextbtn = document.querySelector(".next");
let prevbtn = document.querySelector(".prev");
let markbtn = document.querySelector(".mark");
let counter = document.getElementsByClassName("counter")[0];
let submitbtn = document.getElementsByClassName("submit-btn")[0];

let currentIndex = 0;
counter.innerHTML = 1;
let choosenAnswers;
let choosenAnswersArr = [];
let rightAnswersArr = [];
let checkedAnsersArr = [];
let markedBtns = [];
let clickCount = 0;
let secondsCounter = 180;
let result;

async function getQuestions() {
  let response = await fetch("/Exam.json");
  let questionsObject = await response.json();
  questionsObject = questionsObject.sort(() => 0.5 - Math.random());
  let qnum = questionsObject.length;
  addQuestions(questionsObject[currentIndex], qnum);

  nextbtn.addEventListener("click", function (e) {
    let rightAnswer = questionsObject[currentIndex].rightAnswer;
    checkAnswer(rightAnswer, qnum);
    if (currentIndex < qnum - 1) {
      quesBody.innerHTML = "";
      ansBody.innerHTML = "";
      addQuestions(questionsObject[currentIndex + 1]);
      currentIndex++;
      keepCheckedAns();
      counter.textContent = currentIndex + 1;
    } else {
      e.preventDefault();
    }
  });

  prevbtn.addEventListener("click", function (e) {
    if (currentIndex > 0) {
      quesBody.innerHTML = "";
      ansBody.innerHTML = "";
      addQuestions(questionsObject[currentIndex - 1]);
      currentIndex--;
      keepCheckedAns();
      counter.textContent = currentIndex + 1;
    } else {
      e.preventDefault;
    }
  });
  submitbtn.addEventListener("click", function (e) {
    newPage = open("Result.html", "_self", "resultPage");
    newPage.focus();
    setCookie("grades", rightAnswersArr.length, new Date("2/1/2024"));
  });

  markbtn.addEventListener("click", function (e) {
    let newBtn = document.createElement("button");
    newBtn.innerHTML = `<p class="p_mark">Question ${
      currentIndex + 1
    }</p> <button id="removeMark"><i class="fa-solid fa-trash-can"></i></i></button>`;
    newBtn.id = currentIndex + 1;
    newBtn.className = "bttnn";
    newBtn.addEventListener("click", function () {
      quesBody.innerHTML = "";
      ansBody.innerHTML = "";
      counter.innerHTML = newBtn.id;
      addQuestions(questionsObject[newBtn.id - 1]);
      currentIndex = newBtn.id - 1;
    });

    if (markDiv.children.length == 0) {
      markedBtns[currentIndex] = newBtn.id;
      markDiv.appendChild(newBtn);
    } else {
      let flag = 0;
      for (let i = 0; i < markDiv.children.length; i++) {
        if (markDiv.children[i].id == markedBtns[currentIndex]) {
          console.log("sas");
          flag = 1;
          e.preventDefault();
        }
      }
      if (flag == 0) {
        console.log("aaaa");
        markDiv.appendChild(newBtn);
        markedBtns[currentIndex] = newBtn.id;
      }
    }
    let remove = document.querySelectorAll("#removeMark");
    // remove.setAttribute("onclick", "removeMark();");
    remove.forEach((element) => {
      element.addEventListener("click", function () {
        console.log("jj");
        element.parentElement.remove();
      });
    });
  });
}
// second way to remove the mark
// function removeMark(x) {
//   x.parentElement.remove();
// }

function addQuestions(obj) {
  let quest = document.createElement("p");
  let qText = document.createTextNode(obj["question"]); //obj.question
  //append the question to p
  quesBody.appendChild(qText);
  //append p to question div
  quesBody.appendChild(quest);

  for (let i = 1; i <= 4; i++) {
    //create ansDiv
    let asnwerDiv = document.createElement("div");
    asnwerDiv.className = "ans";

    //create input
    let radioInput = document.createElement("input");
    radioInput.name = "answer";
    radioInput.type = "radio";
    radioInput.id = `answer ${i}`;
    radioInput.dataset.answer = obj[`answer ${i}`];

    //create label
    let ansLabel = document.createElement("label");
    ansLabel.htmlFor = `answer ${i}`;
    ansLabel.id = i;
    //add answer to label
    let ansLabelText = document.createTextNode(obj[`answer ${i}`]);
    ansLabel.appendChild(ansLabelText);
    // console.log(obj[`answer ${i}`]);

    //add input and label to ansDiv
    asnwerDiv.appendChild(radioInput);
    asnwerDiv.appendChild(ansLabel);

    //add ansDiv to answers-body
    ansBody.appendChild(asnwerDiv);
  }
}

function checkAnswer(rAnswer, qnum) {
  let answers = document.getElementsByName("answer");
  for (let i = 0; i < 4; i++) {
    if (answers[i].checked) {
      choosenAnswers = answers[i].dataset.answer;
    }
    choosenAnswersArr[currentIndex] = choosenAnswers;
  }
  if (rAnswer == choosenAnswers) {
    rightAnswersArr[currentIndex] = choosenAnswers;
  }
}

function keepCheckedAns() {
  for (i = 0; i < 4; i++) {
    if (
      choosenAnswersArr[currentIndex] ==
      ansBody.children[i].children[1].textContent
    ) {
      ansBody.children[i].children[0].checked = true;
    }
  }
}

let timeCounter = setInterval(function () {
  secondsCounter--;
  displayTime(secondsCounter);

  if (secondsCounter <= 0 || secondsCounter < 1) {
    clearInterval(timeCounter);
    timeFinished();
  }
}, 1000);

function displayTime(sec) {
  let minutes = parseInt(sec / 60);
  let seconds = parseInt(sec % 60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  timeDiv.innerHTML = `${minutes}:${seconds}`;
}

function timeFinished() {
  quesBody.remove();
  ansBody.remove();
  markDiv.remove();
  nextbtn.remove();
  prevbtn.remove();
  nextbtn.remove();
  markbtn.remove();
  bulletsDiv.remove();
  counter.remove();
  header.remove();
  let timeOut = document.createElement("div");
  timeOut.classList.add("finish-time");
  timeOut.innerHTML =
    "<p>Exam time ends, click on submit to see your result</p>";
  timeOut.style.fontSize = "40px";
  // timeOut.style.color = "#333";
  timeOut.style.paddingLeft = "50px";
  container.appendChild(timeOut);
}

getQuestions();
