import Completion from "./Completion";
import askNooraPrompt from "../../data/prompts/ask-noora";

const temp = 0.9;
const freqPenalty = 0.6;
const presPenalty = 0.5;

export default async function generateResult(statement: string, uuid: string) {
  const prompt =
    askNooraPrompt + `\nSomeone says, ${statement} How should I reply?`;

  let numApiCalls = 0;
  let explanation = "";
  let reply = "Noora couldn't think of a reply.";
  while (numApiCalls < 3) {
    let result = await Completion({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: temp,
      max_tokens: 60,
      frequency_penalty: freqPenalty,
      presence_penalty: presPenalty,
    });
    numApiCalls++;

    let tokens = result.split("For example:");
    if (tokens.length == 2) {
      explanation = tokens[0].trim();
      reply = tokens[1].trim().replace('"', "");
      break;
    }
  }

  return {
    id: uuid,
    statement: statement,
    explanation: explanation,
    reply: reply.replace('"', ""),
  };
}

function capFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
