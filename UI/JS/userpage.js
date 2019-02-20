const openComment = document.querySelectorAll(".reply");
const repliesBar = document.querySelector(".solns");
const topic = document.querySelector(".topic");
const inputs = document
  .querySelector(".createTopic")
  .querySelectorAll(".collect");

const navbar = document.querySelector(".navbar");
const navicon = document.querySelector("#navicon");
const navheaders = document.querySelectorAll(".navmenu h2");
let flag = false;

topic.addEventListener("click", event => {
  if (event.target.className === "reply") {
    let repliesbar =
      event.target.parentElement.parentElement.parentElement.nextElementSibling
        .children[1];
    if (repliesbar.className == "solns") {
      repliesbar.classList.add("open");
    } else {
      repliesbar.classList.remove("open");
    }
  }
});

window.addEventListener("scroll", e => {
  if (document.documentElement.scrollTop > 500) navbar.style.top = " 0";
  else navbar.style.top = "-100px";
});

const title = document.querySelector(".createtopictitle");
const button = document.querySelector(".create");
const content = document.querySelector(".createfield");

const isValid = value => {
  let emptyField = /^\s*$/;
  if (emptyField.test(value)) return false;
  return true;
};

inputs.forEach(element => {
  element.addEventListener("keyup", event => {
    if (event.className != "createimgfile") {
      if (isValid(title.value) && isValid(content.value)) {
        button.style.zIndex = "1";
      } else button.style.zIndex = "-1";
    }
  });
});
// navicon.addEventListener("click", e => {
//   flag = !flag;
//   if (flag) {
//     navicon.className = "close";
//     navheaders[0].parentElement.style.left = "0px";
//     navheaders.forEach(element => {
//       element.style.left = "0px";
//     });
//   } else {
//     navicon.className = "";
//     let position = 200;
//     navheaders[0].parentElement.style.left = "-25.5%";
//     navheaders.forEach(element => {
//       element.style.left = `-${position}px`;
//       position += 500;
//     });
//   }
// });
