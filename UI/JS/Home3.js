const signup = document.querySelector(".my-form");

const getSignupInfo = () => {
  let firstname = document.getElementById("firstName").value.trim();
  let lastname = document.getElementById("lastName").value.trim();
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value.trim();
  let username = document.getElementById("username").value.trim();
  let gender = document.getElementById("gender").value;
  let obj = {};
  obj = { username, email, password, gender, firstname, lastname };
  return obj;
};

const myPOST_register = async (url, details) => {
  let object = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(details)
  };
  let response = await fetch(url, object); // wait for the promise of the request

  let userConfirm = await response.json(); // convert response to a json data and wait for its promise
  if (userConfirm === "Unable to Register") {
    alert(userConfirm);
  } else if (userConfirm != "undefined") {
    localStorage.setItem("token", userConfirm.token);
    window.location.replace("http://localhost:3000/profile");
  }
};

signup.addEventListener("submit", event => {
  event.preventDefault();
  const details = getSignupInfo();
  myPOST_register("http://localhost:3000/signup", details);
});
