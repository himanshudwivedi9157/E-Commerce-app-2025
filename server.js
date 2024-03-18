import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path';

// Configure env
dotenv.config();

// Database config
connectDB();

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve the index.html for any other routes
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// PORT
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(`${process.env.DEV_MODE || 'unknown'} mode on port ${PORT}`.bgCyan.white);
});
