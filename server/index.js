require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const usersRoute = require("./routes/users");
const allUsers = require("./routes/all");
const deleteRoute = require("./routes/delete");
const resourceRoutes = require("./routes/resources");
const accessRoutes = require("./routes/access"); 
const path = require("path"); 


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/register", usersRoute);
app.use("/api/auth", authRoutes);
app.use("/api", allUsers);
app.use("/api/user", deleteRoute);
app.use("/api/resources", resourceRoutes);
app.use("/api/access", accessRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// DB + Server Start
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
