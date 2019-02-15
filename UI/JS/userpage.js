const navbar = document.querySelector(".navbar");
const navicon = document.querySelector("#navicon");
const navheaders = document.querySelectorAll(".navmenu h2");
let flag = false;

navicon.addEventListener("click", e => {
  flag = !flag;
  if (flag) {
    navicon.className = "close";
    navheaders[0].parentElement.style.left = "0px";
    navheaders.forEach(element => {
      element.style.left = "0px";
    });
  } else {
    navicon.className = "";
    let position = 200;
    navheaders[0].parentElement.style.left = "-25.5%";
    navheaders.forEach(element => {
      element.style.left = `-${position}px`;
      position += 500;
    });
  }
});
