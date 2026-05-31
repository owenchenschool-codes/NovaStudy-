const API_URL = "https://novax-study.onrender.com";

async function startStudy(){
  try {
    const res = await fetch(API_URL + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "Student" })
    });

    const data = await res.json();

    alert("User created! ID: " + data.id);

    // reload leaderboard after creating user
    loadLeaderboard();

  } catch (err) {
    alert("Error connecting to backend");
    console.error(err);
  }
}

async function loadLeaderboard(){
  try {
    const res = await fetch(API_URL + "/leaderboard");
    const data = await res.json();

    const div = document.getElementById("leaderboard");

    if (!div) return; // prevents crash if element missing

    div.innerHTML = "";

    data.forEach(user => {
      const p = document.createElement("p");
      p.textContent = user.name + " - XP: " + user.xp;
      div.appendChild(p);
    });

  } catch (err) {
    console.error("Leaderboard error:", err);
  }
}

// load leaderboard when page opens
loadLeaderboard();

console.log("NovaX Loaded");
