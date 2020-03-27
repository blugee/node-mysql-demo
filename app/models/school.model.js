const sql = require("./db.js");

// constructor
const School = function(school) {
  this.email = school.email;
  this.name = school.name;
  this.active = school.active;
  this.description = school.description;
};

School.create = (newSchool, result) => {
  sql.query("INSERT INTO schools SET ?", newSchool, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created school: ", { id: res.insertId, ...newSchool });
    result(null, { id: res.insertId, ...newSchool });
  });
};

School.findById = (schoolId, result) => {
  sql.query(`SELECT * FROM schools WHERE id = ${schoolId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found school: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found School with the id
    result({ kind: "not_found" }, null);
  });
};

School.getAll = result => {
  sql.query("SELECT * FROM schools", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("schools: ", res);
    result(null, res);
  });
};

School.remove = (id, result) => {
  sql.query("DELETE FROM schools WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found School with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted school with id: ", id);
    result(null, res);
  });
};

School.removeAll = result => {
  sql.query("DELETE FROM schools", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} schools`);
    result(null, res);
  });
};

module.exports = School;
