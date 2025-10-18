import express from "express";  
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import crypto from "crypto";
import adminRoutes  from "./src/routes/adminRoutes.js";
import memberRoutes  from "./src/routes/memberRoutes.js";
import bookRoutes from "./src/routes/bookRoute.js";
import loanRoutes from "./src/routes/loanRoutes.js";
import settingsRoute from "./src/routes/settingsRoute.js"




dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/smds/lms/admin", adminRoutes);
app.use("/smds/lms/members", memberRoutes);
app.use("/smds/lms/books", bookRoutes);
app.use("/smds/lms/loans",loanRoutes);
app.use("/smds/lms/settings",settingsRoute);


app.get("/smds/lms/", (req, res) => {
  res.send("Backend is running 🚀");
});



app.listen(process.env.PORT, () =>
    console.log(`✅ Server running on port ${process.env.PORT}`) 
);