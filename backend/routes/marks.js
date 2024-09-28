const express = require('express');
const db = require('../db/db.js')
const router = express.Router();


router.get("/students/results", (req, res) => {
  const query = "SELECT * FROM result";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching results:", err);
      return res.status(500).json({ error: "Error fetching results" });
    }
    res.json(results);
  });
});

router.post("/students/results", (req, res) => {
  const { StudentId, StudentName, StudentResult, StudentAttendance } = req.body;
  const query =
    "INSERT INTO result (StudentId, StudentName, StudentResult, StudentAttendance) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [StudentId, StudentName, StudentResult, StudentAttendance],
    (err) => {
      if (err) {
        console.error("Error adding result:", err);
        return res.status(500).json({ error: "Error adding result" });
      }
      res.status(201).json({ message: "Student result added successfully" });
    }
  );
});

router.put("/students/results/:id", (req, res) => {
  const { id } = req.params;
  const { StudentName, StudentResult, StudentAttendance } = req.body;
  const query =
    "UPDATE result SET StudentName = ?, StudentResult = ?, StudentAttendance = ? WHERE StudentId = ?";
  db.query(
    query,
    [StudentName, StudentResult, StudentAttendance, id],
    (err) => {
      if (err) {
        console.error("Error updating result:", err);
        return res.status(500).json({ error: "Error updating result" });
      }
      res.json({ message: "Student result updated successfully" });
    }
  );
});

router.delete("/students/results/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM result WHERE StudentId = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error deleting result:", err);
      return res.status(500).json({ error: "Error deleting result" });
    }
    res.json({ message: "Student result deleted successfully" });
  });
});
module.exports = router;
