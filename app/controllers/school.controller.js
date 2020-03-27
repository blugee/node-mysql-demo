const School = require("../models/school.model.js");

// Create and Save a new School
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a School
  const school = new School({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active,
    description: req.body.description
  });

  // Save School in the database
  School.create(school, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the School."
      });
    else res.send(data);
  });
};

// Retrieve all Schools from the database.
exports.findAll = (req, res) => {
  School.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving schools."
      });
    else res.send(data);
  });
};

// Find a single School with a schoolId
exports.findOne = (req, res) => {
  School.findById(req.params.schoolId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found School with id ${req.params.schoolId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving School with id " + req.params.schoolId
        });
      }
    } else res.send(data);
  });
};

// Delete a School with the specified schoolId in the request
exports.delete = (req, res) => {
  School.remove(req.params.schoolId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found School with id ${req.params.schoolId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete School with id " + req.params.schoolId
        });
      }
    } else res.send({ message: `School was deleted successfully!` });
  });
};

// Delete all Schools from the database.
exports.deleteAll = (req, res) => {
  School.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all schools."
      });
    else res.send({ message: `All Schools were deleted successfully!` });
  });
};
