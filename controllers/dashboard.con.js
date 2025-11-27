const dashboard = async (req, res) => {
  try {
    res.json({ message: "Wellcome Dashboard" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = dashboard;
