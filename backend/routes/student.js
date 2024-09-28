const express = require("express")
const app = require("../server.js")
const  db =require ('../db/db.js')
const router = express.Router();

router.get("/students", (req, res) => {
  db.query("SELECT * FROM Student", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post("/students", (req, res) => {
  const {
    StudentName,
    StudentNumber,
    Gender,
    Email,
    Phone,
    DepartmentId,
    Startcourse,
    Endcourse,
  } = req.body;
  console.log(req.body);
  db.query(
    "INSERT INTO Student (StudentName, StudentNumber, gender,email,DepartmentId,enrollmentyear,enrollmentendyear,mobile) VALUES (?, ? , ? , ? ,?,?,?,?)",
    [
      StudentName,
      StudentNumber,
      Gender,
      Email,
      DepartmentId,
      Startcourse,
      Endcourse,
      Phone
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: result.insertId,
        StudentName,
        StudentNumber,
        Gender,
        Email,
        DepartmentId,
        Startcourse,
        Endcourse,
        Phone
      });
    }
  );
});

router.delete("/students/:id", (req, res) => {
  const studentID = req.params.id;
  db.query("DELETE FROM Student WHERE StudentID = ?", [studentID], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student deleted successfully" });
  });
});


// PUT endpoint to update a student
router.put("/students/:id", (req, res) => {
  const { id } = req.params; // Get the student ID from the URL
  const { StudentName, email, mobile } = req.body; // Destructure the fields from the request body

  // Log the received data for debugging
  console.log("Updating student:", { StudentName, email, mobile });

  // SQL query to update the student record
  db.query(
    "UPDATE Student SET StudentName = ?, email = ?, mobile = ? WHERE StudentID = ?",
    [StudentName, email, mobile, id], // Update with new values
    (err) => {
      if (err) {
        console.error("Error updating student:", err);
        return res.status(500).json(err); // Handle errors
      }
      res.json({ message: "Student updated successfully" }); // Success response
    }
  );
});

module.exports = router;

