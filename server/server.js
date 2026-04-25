const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

console.log("✅ Server starting...");
console.log("NODE_ENV:", process.env.NODE_ENV);

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);
    // In dev, allow all origins
    if (process.env.NODE_ENV !== "production") return callback(null, true);
    // In prod, check whitelist
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS before everything else
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // Handle preflight for all routes

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`REQ: ${req.method} ${req.url} | Origin: ${req.headers.origin}`);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Job tracker API running...");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB", err);
    process.exit(1);
  });