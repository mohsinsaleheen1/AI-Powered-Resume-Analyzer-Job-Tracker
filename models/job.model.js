const mongoose = require("mongoose");
const jobData = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Rejected", "Offered"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const job = mongoose.model("job", jobData);
module.exports = job;
