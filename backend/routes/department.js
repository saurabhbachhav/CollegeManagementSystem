const express = require("express");
const db = require("../db/db.js"); // Ensure this exports your DB connection
const router = express.Router(); // Initialize the router
const authenticateToken = require("../authentication/user.auth_verification.js");
// Fetch all departments
router.get("/departments", (req, res) => {
  db.query("SELECT * FROM Department", (err, result) => {
    if (err) {
      console.error("Error fetching departments:", err); // Log error for debugging
      return res.status(500).json({ error: "Error fetching departments" });
    }
    res.json(result);
  });
});
// router.get("/department-instructors", (req, res) => {
//   const sql = "SELECT * FROM department CROSS JOIN instructor";
//   db.query(sql, (err, result) => {
//     if (err){
//       console.error("Error in fetching Join : ", err);
//       return res.status(500).json({ error: "Error fetching departments" });
//     }
//     res.json(result);
//   })
// })




// Add a new department
router.post("/departments", (req, res) => {
  const { DepartmentId, DepartmentName, HeadID } = req.body;
  // console.log(req.body);

  // Check for existing department by name
  db.query(
    "SELECT * FROM Department WHERE DepartmentName = ?",
    [DepartmentName],
    (err, result) => {
      if (err) {
        console.error("Error checking department name:", err); // Log error for debugging
        return res
          .status(500)
          .json({ error: "Error checking department name" });
      }
      if (result.length > 0) {
        return res
          .status(400)
          .json({ error: "Department name already exists" });
      }

      // Insert new department
      db.query(
        "INSERT INTO Department (DepartmentId, DepartmentName, HeadID) VALUES (?, ?, ?)",
        [DepartmentId, DepartmentName, HeadID],
        (err, result) => {
          if (err) {
            console.error("Error inserting department:", err); // Log error for debugging
            return res
              .status(500)
              .json({ error: "Error adding department. Please try again." });
          }
          res.json({
            id: result.insertId,
            DepartmentId,
            DepartmentName,
            HeadID,
          });
        }
      );
    }
  );
});

// Fetch departments with their heads
router.get("/departments-heads", (req, res) => {
  const query = `
    SELECT Department.DepartmentName, Instructor.InstructorName 
    FROM Department 
    LEFT JOIN Instructor ON Department.HeadID = Instructor.InstructorID
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching department heads:", err); // Log error for debugging
      return res.status(500).json({ error: "Error fetching department heads" });
    }
    res.json(result);
  });
});

// Delete a department by ID
router.delete("/departments/:id", (req, res) => {
  const departmentId = req.params.id;
  
  db.query(
    "DELETE FROM Department WHERE DepartmentId = ?",
    [departmentId],
    (err) => {
      if (err) {  
        console.error("Error deleting department:", err); // Log error for debugging
        return res.status(500).json({ error: "Error deleting department" });
      }
      res.json({ message: "Department deleted successfully" });
    }
  );
});

router.put("/departments/:id", (req, res) => {
  const departmentId = req.params.id;
  const { newhead } = req.body; // Extract new department name and HeadID from request body

  // Update department name and HeadID in the database
  db.query(
    "UPDATE Department SET HeadID = ? WHERE DepartmentId = ?",
    [newhead, departmentId],
    (err) => {
      if (err) {
        console.error("Error updating department:", err);
        return res.status(500).json({ error: "Error updating department" });
      }
      res.json({ message: "Department updated successfully" });
    }
  );
});

module.exports = router;
