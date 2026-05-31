const API_URL = "https://novax-study.onrender.com";

// create user when button clicked
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

    loadLeaderboard();

  } catch (err) {
    alert("Backend error");
    console.error(err);
  }
}

// load leaderboard
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

// run when page loads
loadLeaderboard();
