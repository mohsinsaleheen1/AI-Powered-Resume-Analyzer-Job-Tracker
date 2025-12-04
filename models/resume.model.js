const mongoose = require("mongoose");
const resumeData = mongoose.Schema({
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
  suggestions: {
    type:Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const resume = mongoose.model("resume", resumeData);
module.exports = resume;
