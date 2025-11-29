const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.route.js");
const dashboardRoute = require("./routes/dashboard.route.js");
const resumeRoute = require("./routes/resume.route.js");
const auth = require("./middleware/auth.js");
const connectDB = require("./config/db.js");
dotenv.config();
// Databse Connect
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoute);
app.use("/api/dashboard", auth, dashboardRoute);
app.use("/api/resume", resumeRoute);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is runing at http://localhost:${PORT}`);
});
