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
// 