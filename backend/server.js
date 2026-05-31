const fetch = require("node-fetch");

app.get("/question", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "ONLY return valid JSON. Create 1 calculus multiple choice question with 3 options. Format: {\"q\":\"...\",\"options\":[\"...\",\"...\",\"...\"],\"answer\":1}"
          }
        ]
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    const question = JSON.parse(text);

    res.json(question);

  } catch (err) {
    console.log(err);

    res.json({
      q: "Fallback: d/dx(x²)?",
      options: ["x", "2x", "x²"],
      answer: 1
    });
  }
});
