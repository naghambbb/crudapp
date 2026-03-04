const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public")); // Serve static files in public folder
app.use(express.json()); // Middleware for parsing JSON bodies

// Helper function to read and write from db.json
const readDatabase = () => JSON.parse(fs.readFileSync("db.json", "utf-8"));
const writeDatabase = (data) => fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

// Route to Get All Users
app.get("/api/users", (req, res) => {
  const users = readDatabase();
  res.json(users);
});

// Route to Get a Single User by ID
app.get("/api/users/:id", (req, res) => {
  const users = readDatabase();
  const user = users[req.params.id];
  if (user) res.json(user);
  else res.status(404).json({ message: "User not found" });
});

// Route to Create a New User
app.post("/api/users", (req, res) => {
  const users = readDatabase();
  const { id, name, age, city } = req.body;
  if (users[id]) {
    return res.status(400).json({ message: "User ID already exists" });
  }
  users[id] = { name, age, city };
  writeDatabase(users);
  res.status(201).json({ message: "User created successfully" });
});

// Route to Update an Existing User
app.put("/api/users/:id", (req, res) => {
  const users = readDatabase();
  const { name, age, city } = req.body;
  if (users[req.params.id]) {
    users[req.params.id] = { name, age, city };
    writeDatabase(users);
    res.json({ message: "User updated successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route to Delete a User
app.delete("/api/users/:id", (req, res) => {
  const users = readDatabase();
  if (users[req.params.id]) {
    delete users[req.params.id];
    writeDatabase(users);
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Start the Server
app.listen(port, () => console.log(`Server running on port ${port}`));
