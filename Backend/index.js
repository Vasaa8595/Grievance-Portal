const express = require('express');
const app = express();
//configuring for env vars
const dotenv = require('dotenv').config({path : ".env"});
//port for listening
const port = process.env.PORT || 8080;
// for cross-origin-resource-sharing
const cors = require('cors');
//database connectivity
const dbConnection = require('./DBConnection');
//login controlleer
const login = require("./Controllers/Auth/Auth");
//using cors for bypassing
app.use(cors());

//making db connection
dbConnection();

// Importing grouped routes for each role based user
const superAdminRoutes = require("./Routes/SuperAdmin.routes")
const studentRoutes = require('./Routes/Student.routes');
const facultyRoutes = require("./Routes/Faculty.routes");


//for parsing the request body in json format
app.use(express.json());

//middleware for logging method and url for matched route
app.use((req, res , next)=> {
  console.log(`Request Method : ${req.method} to URL : ${req.url}`);
  next();
})


//routes for superAdmin, faculty and student
app.post("/auth/login" , login)
    // app.use("/api/super-admin", superAdminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

//listening port
app.listen(port, () => {
  console.log("Server is running in " + port);
});