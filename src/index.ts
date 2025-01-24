import express from "express";
import userRoutes from "./routes/userRoutes/userAuthRoute.ts";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session"; 
import mongoose from "mongoose";
import  dotenv from "dotenv"
import adminRoutes from "./routes/adminRoutes/adminRoutes.ts";
dotenv.config()
const app = express();
// const key:string=process.env.SESSION_KEY
app.use(
  session({
    secret: process.env.SESSION_KEY || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use((req, res, next) => {
  if (!req.session.admin) {
    req.session.admin = { isActive: false }; 
  }
  if (!req.session.user) {
    req.session.user = { id: '', email: '', username: '' }; 
  }
  next();
});




mongoose
  .connect('mongodb://localhost:27017/week17')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.use("/", userRoutes);
app.use("/admin",adminRoutes)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});