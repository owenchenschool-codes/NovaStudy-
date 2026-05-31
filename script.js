const API_URL = "https://novax-study.onrender.com";

let xp = 0;
let currentUser = null;

async function startStudy(){
  document.getElementById("quiz").classList.remove("hidden");

  const res = await fetch(API_URL + "/user", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ name: "Student" })
  });

  currentUser = await res.json();
  xp = 0;

  loadLeaderboard();
}

function answer(choice){
  if(choice === "B"){
    xp += 10;
    alert("✅ Correct +10 XP");
  } else {
    alert("❌ Wrong");
  }

  updateXP();

  fetch(API_URL + "/xp", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      id: currentUser.id,
      xp: xp
    })
  });

  loadLeaderboard();
}

function updateXP(){
  document.getElementById("xp").textContent = xp;
  document.getElementById("xp-bar-fill").style.width = xp + "%";
}

async function loadLeaderboard(){
  const res = await fetch(API_URL + "/leaderboard");
  const data = await res.json();

  const div = document.getElementById("leaderboard");
  div.innerHTML = "";

  data.slice(0,5).forEach((user, i)=>{
    const p = document.createElement("p");
    p.textContent = `${i+1}. ${user.name} - ${user.xp} XP`;
    div.appendChild(p);
  });
}

loadLeaderboard();
