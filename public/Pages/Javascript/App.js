// Models Functionality Hides or Shows Models
let signupModel = document.getElementById("SignupModel");
let signinModel = document.getElementById("SigninModel");
let addJobModel = document.getElementById("addJobModel");
let updateJobOne = document.getElementById("updateJob");
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
      const res = await axios.post(
        "https://ai-powered-resume-analyzer-job-tracker-production.up.railway.app/api/users/signup",
        {
          userName,
          userEmail,
          password,
        }
      );
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
      const res = await axios.post(
        "https://ai-powered-resume-analyzer-job-tracker-production.up.railway.app/api/users/login",
        {
          userEmail,
          password,
        }
      );
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
    if (!token) {
      window.location.href = "../Html/Wellcome.html";
      return;
    }
    const res = await axios.get(
      "https://ai-powered-resume-analyzer-job-tracker-production.up.railway.app/api/dashboard/getdetails",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.href = "../Html/dashboard.html";
  } catch (err) {
    console.log(err);
  }
}

const uploadCV = async () => {
  try {
    const token = localStorage.getItem("token");
    const fileInput = document.getElementById("fileinput");
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select a file!");
      return;
    }
    const formdata = new FormData();
    formdata.append("file", file);
    const jobdes = window.jobDescription;
    console.log("JObWala", jobdes);
    const response = await axios.post(
      "https://ai-powered-resume-analyzer-job-tracker-production.up.railway.app/api/uploadresume/upload",
      formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const aiResponseData = response.data.analysis;
    let clean = aiResponseData.replace(/```json|```/g, "").trim();
    let parsed = JSON.parse(clean);
    console.log(parsed);
    document.getElementById("ats").innerText = parsed["ATS Score"];
    document.getElementById("resumescore").innerText = parsed["Resume Score"];
    // missing Skills
    const missing = document.getElementById("missing");
    missing.innerHTML = "";
    parsed["Missing Skills"].forEach((skills) => {
      skills = skills.replace(/\*/g, "");
      const heading = document.createElement("h1");
      const li = document.createElement("li");
      li.textContent = skills;
      heading.textContent = "Missing Skills:";
      missing.appendChild(heading);
      missing.appendChild(li);
    });
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
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://ai-powered-resume-analyzer-job-tracker-production.up.railway.app/api/jobs/addJob",
        {
          position,
          company,
          jobDescription,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      alert("Your Job is Post Sucessfully");
      addJobModel.classList.add("hide");
      update();
    } catch (err) {
      console.log(err);
    }
  }
};
// View All Jobs
const viewAllJobs = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      "https://ai-powered-resume-analyzer-job-tracker-production.up.railway.app/api/jobs/allJob",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let job = res.data.findJob;
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
            <button class="normalbtn" onclick="updateJob('${jobs._id}')"><i class="fa-solid fa-file-pen"></i></button>
            <button class="normalbtn" onclick="deleteJob('${jobs._id}')"><i class="fa-solid fa-trash"></i></button>
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
// Update Job
const updateJob = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `https://ai-powered-resume-analyzer-job-tracker-production.up.railway.app/api/jobs/singleJob/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data.singleJob;
    const position = (document.getElementById("uposition").value =
      data.position);
    const company = (document.getElementById("ucompany").value = data.company);
    const jobDescription = (document.getElementById("ujobDescription").value =
      data.jobDescription);
    window.jobDescription = jobDescription;
    console.log("Jobdexsss", jobDescription);
    const status = (document.getElementById("ustatus").value = data.status);
    updateJobOne.classList.add("model");
    updateJobOne.classList.remove("hide");
    window.currentJobId = id;
  } catch (err) {
    console.log(err);
  }
};
const update = async () => {
  try {
    const token = localStorage.getItem("token");
    const position = document.getElementById("uposition").value;
    const company = document.getElementById("ucompany").value;
    const jobDescription = document.getElementById("ujobDescription").value;
    const status = document.getElementById("ustatus").value;
    const res = await axios.put(
      `https://ai-powered-resume-analyzer-job-tracker-production.up.railway.app/api/jobs/updateJob/${window.currentJobId}`,
      { position, company, jobDescription, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    updateJobOne.classList.remove("model");
    updateJobOne.classList.add("hide");
    viewAllJobs();
  } catch (err) {
    console.log(err);
  }
};
// deleteJob
const deleteJob = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `https://ai-powered-resume-analyzer-job-tracker-production.up.railway.app/api/jobs/deleteJob/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    viewAllJobs();
  } catch (err) {
    console.log(err);
  }
};
function logout() {
  localStorage.removeItem("token");
  alert("Logout Successfully");
  window.location.href = "../Html/Wellcome.html";
}
function jobdetails() {
  window.location.href = "../Html/jobs.html";
}
// viewAllJobs();
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../Html/Wellcome.html";
  }
}
