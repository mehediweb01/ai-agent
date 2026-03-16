import OpenAI from "openai";

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
main();
