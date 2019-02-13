// if (localStorage.token !== undefined) {
//   window.location.replace("http://localhost:3000/profile");
// }

const signIn = document.querySelector(".login");

const getLoginInfo = () => {
  let password = document.querySelector(".Lpassword").value;
  let email = document.querySelector(".Lemail").value.trim();
  let obj = {};
  obj = { username, password };
  return obj;
};

const myPOST_login = async (url, details) => {
  let object = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(details)
  };
  let response = await fetch(url, object); // wait for the promise of the request

  let userConfirm = await response.json(); // convert response to a json data and wait for its promise
  if (userConfirm == "invalidUser") {
    alert("User does not exist. Please register with us");
  } else if (userConfirm != "undefined") {
    localStorage.setItem("token", userConfirm.token);
    window.location.replace("http://localhost:3000/profile");
  }
};

signIn.addEventListener("submit", event => {
  event.preventDefault();
  const details = getLoginInfo();
  myPOST_login("http://localhost:3000/login", details);
});
