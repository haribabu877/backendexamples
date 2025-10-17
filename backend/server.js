import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password", 
  database: "registrationDB",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database (registrationDB)");
  }
});



app.post("/api/auth/register", (req, res) => {
  const { fullName, organization, email, mobilenumber, totalEmployees } = req.body;

  if (!fullName || !organization || !email || !mobilenumber || !totalEmployees) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const insertQuery = `
      INSERT INTO users (fullName, organization, email, mobilenumber, totalEmployees)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [fullName, organization, email, mobilenumber, totalEmployees],
      (err) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ message: "Error inserting data" });
        }

        res.json({ message: "User registered successfully!" });
      }
    );
  });
});



app.post("/api/auth/login", (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: "Full name and email are required" });
  }

  const query = "SELECT * FROM users WHERE fullName = ? AND email = ?";
  db.query(query, [fullName, email], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid name or email" });
    }

    res.json({ message: "Login successful!" });
  });
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
