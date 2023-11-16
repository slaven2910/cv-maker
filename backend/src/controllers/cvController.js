const CV = require('../models/CV');

// Create a new CV
exports.createCV = async (req, res) => {
  try {
    const newCV = new CV(req.body);
    const savedCV = await newCV.save();
    console.log("req")
    res.json(savedCV);
  } catch (err) {
    console.log("req")

    console.error(err);
    res.status(500).send('Error creating CV');
  }
};

// Get all CVs
exports.getAllCVs = async (req, res) => {
  try {
    const cvs = await CV.find();
    res.json(cvs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching CVs');
  }
};

// Get a specific CV by ID
exports.getCVById = async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv) {
      return res.status(404).send('CV not found');
    }
    res.json(cv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching CV');
  }
};

// Update a CV by ID
exports.updateCV = async (req, res) => {
  try {
    const updatedCV = await CV.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCV);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating CV');
  }
};

// Delete a CV by ID
exports.deleteCV = async (req, res) => {
  try {
    const deletedCV = await CV.findByIdAndRemove(req.params.id);
    if (!deletedCV) {
      return res.status(404).send('CV not found');
    }
    res.json(deletedCV);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting CV');
  }
};
