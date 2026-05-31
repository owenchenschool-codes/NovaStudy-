const API_URL = "https://novax-study.onrender.com";

let xp = 0;

// start session
async function startStudy(){
  document.getElementById("quiz").classList.remove("hidden");

  await fetch(API_URL + "/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Student" })
  });

  loadLeaderboard();
}

// answer logic
function answer(choice){
  if(choice === "B"){
    xp += 10;
    showFeedback(true);
  } else {
    showFeedback(false);
  }

  updateXP();
  loadLeaderboard();
}

// feedback (Duolingo style)
function showFeedback(correct){
  if(correct){
    alert("✅ Correct! +10 XP");
  } else {
    alert("❌ Wrong answer");
  }
}

// update XP UI
function updateXP(){
  document.getElementById("xp").textContent = xp;

  const percent = Math.min(xp, 100);
  document.getElementById("xp-bar-fill").style.width = percent + "%";
}

// leaderboard
async function loadLeaderboard(){
  try{
    const res = await fetch(API_URL + "/leaderboard");
    const data = await res.json();

    const div = document.getElementById("leaderboard");
    div.innerHTML = "";

    data.slice(0,5).forEach((user, i)=>{
      const p = document.createElement("p");
      p.textContent = `${i+1}. ${user.name} - ${user.xp} XP`;
      div.appendChild(p);
    });

  }catch(err){
    console.log(err);
  }
}

loadLeaderboard();
