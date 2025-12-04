// Models Functionality Hides or Shows Models
let signupModel = document.getElementById("SignupModel");
let signinModel = document.getElementById("SigninModel");
let addJobModel = document.getElementById("addJobModel");
function addJob() {
  addJobModel.classList.remove("hide");
  addJobModel.classList.add("model");
}
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
  addJobModel.classList.add("hide");
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

const uploadCV = async () => {
  try {
    const fileInput = document.getElementById("fileinput");
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select a file!");
      return;
    }
    const formdata = new FormData();
    formdata.append("file", file);
    const response = await axios.post(
      "http://localhost:3000/api/uploadresume/upload",
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
// Create Job
const createJob = async () => {
  const position = document.getElementById("position").value;
  const company = document.getElementById("company").value;
  const jobDescription = document.getElementById("jobDescription").value;
  const status = document.getElementById("status").value;
  console.log(position, company, jobDescription, status);
  if (
    position === "" ||
    company === "" ||
    jobDescription === "" ||
    status === ""
  ) {
    alert("Please Fill Input Fields");
  } else {
    try {
      const res = await axios.post("http://localhost:3000/api/jobs/addJob", {
        position,
        company,
        jobDescription,
        status,
      });
      console.log(res.data);
      alert("Your Job is Post Sucessfully");
      addJobModel.classList.add("hide");
    } catch (err) {
      console.log(err);
    }
  }
};
// View All Jobs
const viewAllJobs = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/jobs/allJob");
    let job = res.data.findJob;
    console.log(job);
    const alljobs = document.getElementById("alljobs");
    alljobs.innerHTML = "";
    job.forEach((jobs) => {
      alljobs.innerHTML += `
      <div class="card">
        <div class="titleJob">
          <h1 class="job-title">
            ${jobs.position}
          </h1>
          <p class="company-name">${jobs.company}</p>
        </div>
        <div class="body">
          <p class="job-description">
            <span>Job Description:</span>
            ${jobs.jobDescription}
          </p>
        </div>
        <div class="job-status">
          <span${jobs.status}</span>
        </div>
        <hr />
        <div class="footertitle">
          <div>
            <p>Date: <span>${jobs.createdAt}</span></p>
          </div>
          <div class="updation">
            <button class="normalbtn"><i class="fa-solid fa-file-pen"></i></button>
            <button class="normalbtn" onclick="deleteJob(${jobs.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <div class="mainfooter">
          <button class="purplebtn">Select Job</button>
        </div>
      </div>
    `;
    });
  } catch (err) {
    console.log(err);
  }
};
// deleteJob
const deleteJob = (id) => {
  console.log(id)
};
function logout() {
  localStorage.removeItem("token");
  alert("Logout Successfully");
  window.location.href = "../Html/Wellcome.html";
}
