// routes/examRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

// Get all scheduled exams
router.get("/exams", (req, res) => {
  db.query("SELECT * FROM exam", (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching exams." });
    res.json(results);
  });
});

// Add a new exam
router.post("/exams", (req, res) => {
  const { ExamID, SubjectName, ExamDate, ExamTime } = req.body; // Include ExamTime
  console.log(req.body);
  if (!ExamID || !SubjectName || !ExamDate || !ExamTime) { // Validate ExamTime
    return res.status(400).json({
      message: "Exam ID, Subject name, exam date, and exam time are required."
    });
  }

  // Combine ExamDate and ExamTime into a single datetime value
  db.query(
    "INSERT INTO exam (ExamID, SubjectName, ExamDate, ExamTime) VALUES (?, ?, ?, ?)",
    [ExamID, SubjectName, ExamDate, ExamTime], // Added a comma here
    (err) => { // This line was missing a comma
      if (err) {
        console.error("Error scheduling exam:", err);
        return res.status(500).json({ error: "Error scheduling exam." });
      }
      res.json({ message: "Exam scheduled successfully!" });
    }
  );
});

// Delete an exam
router.delete("/exams/:id", (req, res) => {
  const examID = req.params.id;

  db.query("DELETE FROM exam WHERE ExamID = ?", [examID], (err) => {
    if (err) {
      console.error("Error deleting exam:", err);
      return res.status(500).json({ error: "Error deleting exam." });
    }
    res.json({ message: "Exam deleted successfully!" });
  });
});

module.exports = router;
