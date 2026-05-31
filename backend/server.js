const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

app.get("/", (req,res)=>{
  res.json({message:"NovaX API running"});
});

app.post("/user", (req,res)=>{
  const user = {
    id: Date.now(),
    name: req.body.name,
    xp: 0
  };

  users.push(user);
  res.json(user);
});

app.post("/xp", (req,res)=>{
  const {id, xp} = req.body;

  const user = users.find(u => u.id === id);
  if(user){
    user.xp = xp;
  }

  res.json({success:true});
});

app.get("/leaderboard", (req,res)=>{
  res.json(users.sort((a,b)=>b.xp-a.xp));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("Server running"));
