// Models Functionality Hides or Shows Models
let signupModel = document.getElementById("SignupModel");
let signinModel = document.getElementById("SigninModel");
function showSignupModel() {
  signupModel.classList.remove("hide");
  signupModel.classList.add("model");
}
function showSignModel() {
  signinModel.classList.remove("hide");
  signinModel.classList.add("model");
}
function ReplaceshowSignModel() {
  signupModel.classList.add("hide");
  signupModel.classList.remove("model");
  signinModel.classList.add("model");
  signinModel.classList.remove("hide");
}
function ReplaceshowSignUpModel() {
  signupModel.classList.add("model");
  signupModel.classList.remove("hide");
  signinModel.classList.add("hide");
  signinModel.classList.remove("model");
}
function closebtn() {
  signupModel.classList.add("hide");
  signinModel.classList.add("hide");
}
// Signup Functionality
async function signupForm() {
  const userName = document.getElementById("userName").value;
  const userEmail = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;
  console.log(userName, userEmail, password);
  if (userName === "" || userEmail === "" || password === "") {
    alert("Please Fill Out All Input Fields");
  } else {
    try {
      const res = await axios.post("http://localhost:3000/api/users/signup", {
        userName,
        userEmail,
        password,
      });
      alert("Your Account Create Suucessfully");
      ReplaceshowSignModel();
    } catch (err) {
      console.log(err);
    }
  }
}
// Login Functionality
async function loginForm() {
  const userEmail = document.getElementById("sEmail").value;
  const password = document.getElementById("sPassword").value;
  if (userEmail === "" || password === "") {
    alert("Please Fill Out All Input Fields");
  } else {
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        userEmail,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      alert("User Login Successfully");
      getToken();
    } catch (err) {
      console.log(err);
    }
  }
}
// Get Token
async function getToken() {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      return (window.location.href = "../Html/Wellcome.html");
    } else {
      const res = await axios.get(
        "http://localhost:3000/api/dashboard/getdetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!window.location.href.includes("dashboard.html")) {
        window.location.href = "../Html/dashboard.html";
      }
    }
  } catch (err) {
    console.log(err);
  }
}
function logout() {
  localStorage.removeItem("token");
  alert("Logout Successfully");
  window.location.href = "../Html/Wellcome.html";
}