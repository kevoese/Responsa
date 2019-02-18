const openComment = document.querySelectorAll(".reply");
const repliesBar = document.querySelector(".solns");
const topic = document.querySelector(".topic");

const navbar = document.querySelector(".navbar");
const navicon = document.querySelector("#navicon");
const navheaders = document.querySelectorAll(".navmenu h2");
let flag = false;
let isClick = false;

topic.addEventListener("click", event => {
  if (event.target.className === "reply") {
    let repliesbar = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(
      ".solnwrapper"
    ).children[1];
    isClick = !isClick;
    if (isClick) {
      repliesbar.style.height = "350px";
      repliesbar.style.opacity = "1";
    } else {
      repliesbar.style.height = "0";
      repliesbar.style.opacity = "0";
    }
  }
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
