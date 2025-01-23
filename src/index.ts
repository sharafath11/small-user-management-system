import express from "express";
import userRoutes from "./routes/userRoutes/userAuthRoute.ts";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session"; 
import mongoose from "mongoose";
import  dotenv from "dotenv"
dotenv.config()
const app = express();
// const key:string=process.env.SESSION_KEY
app.use(session({
  secret:process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } 
}));

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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});