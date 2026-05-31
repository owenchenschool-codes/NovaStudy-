const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

app.get("/", (req, res) => {
  res.json({ message: "NovaX API Running" });
});

app.post("/user", (req, res) => {
  const user = {
    id: Date.now(),
    name: req.body.name,
    xp: 0
  };

  users.push(user);
  res.json(user);
});

app.get("/leaderboard", (req, res) => {
  const sorted = [...users].sort((a, b) => b.xp - a.xp);
  res.json(sorted);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
