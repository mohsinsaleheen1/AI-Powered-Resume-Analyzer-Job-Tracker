const jobData = require("../models/job.model.js");
const addJob = async (req, res) => {
  try {
    const { company, position, jobDescription, status, notes } = req.body;
    const job = new jobData({
      company,
      position,
      jobDescription,
      status,
      notes,
      userId: req.user.id,
    });
    const savedJob = await job.save();
    res.send({
      status: 200,
      savedJob,
      message: "Job has been posted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const allJob = async (req, res) => {
  try {
    const findJob = await jobData.find({ userId: req.user.id });
    res.send({
      status: 200,
      findJob,
      message: "All Jobs display",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const singleJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const singleJob = await jobData.findById({
      _id: jobId,
      userId: req.user.id,
    });
    if (!singleJob) {
      res.send({
        status: 404,
        message: "Job Not Founds",
      });
    }
    res.send({
      status: 200,
      singleJob,
      message: "Job has been recieved",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJob = await jobData.findByIdAndUpdate(
      { _id: jobId, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedJob) {
      res.send({
        status: 404,
        message: "Job Not Found",
      });
    }
    res.send({
      status: 200,
      updatedJob,
      message: "Job has been Updated",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await jobData.findByIdAndDelete({
      _id: jobId,
      userId: req.user.id,
    });
    if (!deletedJob) {
      res.send({
        status: 404,
        message: "Job Not Found",
      });
    }
    res.send({
      status: 200,
      deleteJob,
      message: "Job has been Deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { addJob, allJob, singleJob, updateJob, deleteJob };
