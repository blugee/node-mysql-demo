module.exports = app => {
  const schools = require("../controllers/school.controller.js");

  // Create a new Schools
  app.post("/schools", schools.create);

  // Retrieve all Schools
  app.get("/schools", schools.findAll);

  // Retrieve a single School with schoolId
  app.get("/schools/:schoolId", schools.findOne);

  // Delete a Schools with schoolId
  app.delete("/schools/:schoolId", schools.delete);

  // Create a new Schools
  app.delete("/schools", schools.deleteAll);
};
