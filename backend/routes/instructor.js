const express = require("express");
const db = require("../db/db.js");
const router = express.Router();

// Get all instructors
router.get("/instructors", (req, res) => {
  db.query("SELECT * FROM Instructor", (err, results) => {
    if (err) {
      console.error("Error fetching instructors:", err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// Add a new instructor
router.post("/instructors", (req, res) => {
  const { InstructorId, InstructorName, DepartmentId, Phone, Email, Gender } = req.body;
  console.log(req.body);
  
  db.query(
    "INSERT INTO Instructor (InstructorID, InstructorName, DepartmentID, gender, email, phone) VALUES (?, ?, ?, ?, ?, ?)",
    [InstructorId, InstructorName, DepartmentId, Gender, Email, Phone],
    (err, result) => {
      if (err) {
        console.error("Error adding instructor:", err);
        return res.status(500).json(err);
      }
      res.json({
        id: result.insertId,
        InstructorId,
        InstructorName,
        DepartmentId,
        Phone,
        Email,
        Gender,
      });
    }
  );
});

// // Update an instructor
// router.put("/instructors/:id", (req, res) => {
//   const { id } = req.params;
//   const { InstructorName, DepartmentID } = req.body;
//   db.query(
//     "UPDATE Instructor SET InstructorName = ?, DepartmentID = ? WHERE InstructorID = ?",
//     [InstructorName, DepartmentID, id],
//     (err) => {
//       if (err) {
//         console.error("Error updating instructor:", err);
//         return res.status(500).json(err);
//       }
//       res.json({ message: "Instructor updated successfully" });
//     }
//   );
// });
//update instructor
router.put("/instructors/:id", (req, res) => {
  const { id } = req.params;
  const { InstructorName, email, phone } = req.body; // Add email and phone to the destructured object
  console.log(InstructorName, email, phone);
  db.query(
    "UPDATE Instructor SET InstructorName = ?, email = ?, phone = ? WHERE InstructorID = ?",
    [InstructorName, email, phone, id], // Updated query to include email and phone
    (err) => {
      if (err) {
        console.error("Error updating instructor:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Instructor updated successfully" });
    }
  );
});

// Update head status
router.post("/instructors/ishead", (req, res) => {
  const { headID, isHead = 1 } = req.body;
  console.log(req.body);
  db.query(
    "UPDATE Instructor SET IsHead = ? WHERE InstructorID = ?",
    [isHead, headID],
    (err) => {
      if (err) {
        console.error("Error updating instructor head status:", err);
        return res.status(500).json(err);
      }
      res.json({ message: `Instructor is head now .` });
    }
  );
});

// Set instructor's head status to nul
router.post("/instructors/isnothead", (req, res) => {
  const { headID } = req.body;
  console.log(req.body);
  db.query(
    "UPDATE Instructor SET IsHead = NULL WHERE InstructorID = ?",
    [headID],
    (err) => {
      if (err) {
        console.error("Error removing instructor head status:", err);
        return res.status(500).json(err);
      }
      res.json({
        message: `Instructor's head status updated to NULL successfully.`,
      });
    }
  );
});

// Delete an instructor
router.delete("/instructors/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Instructor WHERE InstructorID = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting instructor:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Instructor deleted successfully" });
  });
});

module.exports = router;
