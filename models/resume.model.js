const mongoose = require("mongoose");
const resumeData = mongoose.Schema({
  originalText: {
    type: String,
    required,
  },
  aiImprovedText: {
    type: String,
    required,
  },
  aiScore: {
    type: Number,
    required,
  },
  atsScore: {
    type: Number,
    required,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const resume = mongoose.model("resume", resumeData);
module.exports = resume;
