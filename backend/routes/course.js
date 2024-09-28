const express = require("express");
const db = require("../db/db.js");
const router = express.Router();

// Get all courses
router.get("/courses", (req, res) => {
  db.query("SELECT * FROM Course", (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error fetching courses", details: err });
    res.json(results);
  });
});

// Delete a specific course by ID
router.delete("/courses/:id", (req, res) => {
  const courseID = req.params.id;
  db.query("DELETE FROM Course WHERE CourseID = ?", [courseID], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error deleting course", details: err });
    res.json({ message: "Course deleted successfully" });
  });
});

// Add a new course
router.post("/courses", (req, res) => {
  const { CourseId, CourseName, DepartmentId, InstructorId } = req.body;
  // console.log(req.body)
  // Check if the CourseName already exists
  db.query(
    "SELECT * FROM Course WHERE CourseName = ?",
    [CourseName],
    (err, data) => {
      if (err) {
        console.error("Error checking for existing CourseName:", err);
        return res
          .status(500)
          .json({
            error: "Error checking for existing CourseName",
            details: err,
          });
      }

      if (data.length > 0) {
        return res.status(400).json({ error: "CourseName already exists" });
      }

      // Insert the new course if CourseName does not exist
      db.query(
        "INSERT INTO Course (CourseID, CourseName, DepartmentID, InstructorID) VALUES (?, ?, ?, ?)",
        [CourseId, CourseName, DepartmentId, InstructorId],
        (err, result) => {
          if (err) {
            console.error("Error inserting course:", err);
            return res
              .status(500)
              .json({ error: "Error inserting course", details: err });
          }
          res.json({
            id: result.insertId,
            CourseId,
            CourseName,
            DepartmentId,
            InstructorId,
          });
        }
      );
    }
  );
});

module.exports = router;
