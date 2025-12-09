const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.route.js");
const dashboardRoute = require("./routes/dashboard.route.js");
const jobsRoute = require("./routes/job.routes.js");
const uploadresume = require("./routes/resume.route.js");
const auth = require("./middleware/auth.js");
const connectDB = require("./config/db.js");
const path = require("path");
const cors = require("cors");
dotenv.config();
// Databse Connect
connectDB();
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoute);
app.use("/api/dashboard", auth, dashboardRoute);
app.use("/api/jobs", auth, jobsRoute);
app.use("/api/uploadresume", auth, uploadresume);
app.get("/", (req, res) => {
  res.send("Deployment is work");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is runing at ${PORT}`);
});
