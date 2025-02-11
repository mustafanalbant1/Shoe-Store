const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Router'ları import et
const productRouter = require("./routers/productRouters");
const userRouter = require("./routers/userRouters");

dotenv.config();

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

const PORT = process.env.PORT || 4000;

// Connect to database then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
