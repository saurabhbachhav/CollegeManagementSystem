const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const studentsRouter = require("./routes/student.js");
const departmentRouter = require("./routes/department.js");
const courseRouter =require('./routes/course.js')
const InstructorRouter = require('./routes/instructor.js')
const Login = require("./authentication/user.authentication.js");
const exams = require("./routes/exams.js");
const marks = require("./routes/marks.js");

app.use(express.json());
app.use(cors()); 


app.use("/", Login);



app.use("/", departmentRouter);
app.use('/', courseRouter);
app.use('/', InstructorRouter);
app.use("/", studentsRouter);
app.use("/", exams);
app.use("/", marks);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
// module.exports = app;
