const login = document.querySelector(".sign");
const loginform = document.querySelector(".login");
const cut = document.querySelector(".cut");
const navbar = document.querySelector(".navbar");
const navicon = document.querySelector("#navicon");
const navheaders = document.querySelectorAll(".navmenu h2");
let flag = false;

login.addEventListener("click", e => {
  loginform.style.right = "0";
  login.style.opacity = "0";
});

cut.addEventListener("click", e => {
  loginform.style.right = "-500px";
  login.style.opacity = "1";
});

window.addEventListener("scroll", e => {
  if (document.documentElement.scrollTop > 550)
    navbar.style.backgroundColor = " rgba(5, 0, 10, 0.9)";
  else navbar.style.backgroundColor = "transparent";
});

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
    loginform.style.right = "-500px";
    login.style.opacity = "1";
    let position = 200;
    navheaders[0].parentElement.style.left = "-25.5%";
    navheaders.forEach(element => {
      element.style.left = `-${position}px`;
      position += 500;
    });
  }
});
