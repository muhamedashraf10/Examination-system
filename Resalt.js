let stname = document.getElementById("stname");
let score = document.getElementById("score");
let grade = document.getElementById("grade");
let body = document.querySelector(".body");
if (getCookie("grades") < 5) {
  stname.textContent = `${getCookie("fname")} ${getCookie("lname")}`;
  score.textContent = `${getCookie("grades")}`;
  grade.textContent = "C";
  body.style.backgroundImage = 'url("f.jpg")';
} else if (getCookie("grades") > 5 && getCookie("grades") < 10) {
  stname.textContent = `${getCookie("fname")} ${getCookie("lname")}`;
  score.textContent = `${getCookie("grades")}`;
  grade.textContent = "B";
  body.style.backgroundImage = 'url("2.png")';
} else {
  stname.textContent = `${getCookie("fname")} ${getCookie("lname")}`;
  score.textContent = `${getCookie("grades")}`;
  grade.textContent = "A";
  body.style.backgroundImage = 'url("co.jpg")';
}
