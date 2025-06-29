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
    origin: process.env.CLIENT_URL || "*",
    methods : ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders : ["Content-Type", "Authorization"],
}));

app.use(express.json());

connectDB();

// Serve Uploads Folder
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use("/api/v1/auth",authRoutes); 
app.use("/api/v1/income",incomeRoutes); 
app.use("/api/v1/expense",expenseRoutes); 
app.use("/api/v1/dashboard",dashboardRoutes); 
app.use("/api/v1/transactions", transactionRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT=process.env.PORT || 5000 ;

app.listen(PORT , () => console.log(`Server Running On Port ${PORT}`));
