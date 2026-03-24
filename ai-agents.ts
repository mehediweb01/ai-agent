import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "stepfun/step-3.5-flash:free",
    messages: [
      {
        role: "user",
        content: "What is agentic-AI? Explain in 1-2 lines, max lines 3",
      },
    ],
  });

  console.log(`content: ${completion?.choices[0]?.message.content}`);
}

const goalAnalyzing = async () => {
  const goalText = "Learn JavaScript";
  const goalDays = 7;

  try {
    const prompt = `I want to learn ${goalText} in ${goalDays} days. What should I do? return to JSON format. example here: 
      {
        "name" : "....",
        "days": "....",
        "concepts": ["day1", "day2", "day3"],
        "dailyTasks": ["day1", "day2","day3"],
        "challenge": ["day1", "day2", "day3"],
        "motivation": "...."
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "stepfun/step-3.5-flash:free",
      messages: [
        {
          role: "system",
          content:
            "You are expert in goal analyzing and planning. You will help me to plan my goal.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    console.log(`content: ${completion?.choices[0]?.message.content}`);
  } catch (err) {
    console.error(err);
  }
};

goalAnalyzing();
