// === Import required modules ===
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

// === Initialize app ===
const app = express();
app.use(cors());
app.use(bodyParser.json());

// === MySQL Connection ===
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // change to your MySQL user
  password: "password",      // add password if you set one
  database: "react_login_db", // create this DB first
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// === Register API ===
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing username or password" });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashed], (err) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(400).json({ message: "User already exists" });
      }
      res.json({ message: "✅ User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// === Login API ===
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing username or password" });

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = result[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "✅ Login successful", username: user.username });
  });
});

// === Start Server ===
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
