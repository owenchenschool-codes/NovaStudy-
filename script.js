const API_URL = "https://novax-study.onrender.com";

let currentUser = null;
let xp = 0;

// start app
async function startStudy(){
  document.getElementById("quiz").style.display = "block";

  try {
    const res = await fetch(API_URL + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "Student" })
    });

    currentUser = await res.json();
    xp = 0;

    alert("Study session started!");

  } catch (err) {
    alert("Backend error");
  }
}

// answer question
function answer(choice){
  if(choice === "B"){
    xp += 10;
    alert("Correct! +10 XP");
  } else {
    alert("Wrong answer");
  }

  document.getElementById("xp").textContent = xp;

  loadLeaderboard();
}

// leaderboard
async function loadLeaderboard(){
  try {
    const res = await fetch(API_URL + "/leaderboard");
    const data = await res.json();

    const div = document.getElementById("leaderboard");
    div.innerHTML = "";

    data.forEach(user => {
      const p = document.createElement("p");
      p.textContent = user.name + " - XP: " + user.xp;
      div.appendChild(p);
    });

  } catch (err) {
    console.error(err);
  }
}

// load on start
loadLeaderboard();
