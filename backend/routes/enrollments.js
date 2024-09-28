const express = require("express");
const db = require("../db/db.js");
const router = express.Router();

router.post("/enrollments", (req, res) => {
  const { StudentID, CourseID } = req.body;
  db.query(
    "INSERT INTO Enrollment (StudentID, CourseID) VALUES (?, ?)",
    [StudentID, CourseID],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, StudentID, CourseID });
    }
  );
});

module.exports = router;
