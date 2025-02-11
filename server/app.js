import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routers/productRouters.js";
import userRouter from "./routers/userRouters.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Debug için - her isteği logla
app.use((req, res, next) => {
  console.log("Request:", {
    method: req.method,
    path: req.path,
    body: req.body,
  });
  next();
});

// Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: err.message });
});

// 404 handler
app.use((req, res) => {
  console.log("404 Not Found:", req.url);
  res.status(404).json({ message: `Route ${req.url} not found` });
});

const PORT = process.env.PORT || 5000;

// Connect to database then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
