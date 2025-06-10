require("dotenv").config();
const express = require("express");
const cors=require("cors");
const path=require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app=express();

// Middleware to handle cors

app.use(cors({
  origin: "https://expenzo-frontend-vwy2.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json());

connectDB();

app.use("/api/v1/auth",authRoutes); 
app.use("/api/v1/income",incomeRoutes); 
app.use("/api/v1/expense",expenseRoutes); 
app.use("/api/v1/dashboard",dashboardRoutes); 
app.use("/api/v1/transactions", transactionRoutes);


// Serve Uploads Folder
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const PORT=process.env.PORT || 5000 ;

app.listen(PORT , () => console.log(`Server Running On Port ${PORT}`));