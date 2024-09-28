const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const SECRET_KEY = "iiitn";
const router = express.Router();
const db = require("../db/db.js");


router.use("/Login", (req, res) => {
  const { Username, Userpass } = req.body;
  const query = "SELECT * FROM admin WHERE username = ?";
  db.query(query, [Username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "User does not exist" });
       }
       
     const user = result[0];
     const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    
    //  console.log(result[0]);
    const isPasswordValid = bcrypt.compareSync(Userpass, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      {
        expiresIn: "1h", // Token expiration time
      }
    );
    // console.log(token);
    return res.json({ message: "Login successful", token });
  });
});

module.exports = router;