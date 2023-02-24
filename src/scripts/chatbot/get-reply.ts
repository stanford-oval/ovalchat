import { v4 as uuidv4 } from "uuid";
import Completion from "../wiki-llm/Completion";

export default async function getReply(
  message: string,
  convoState: any,
  command: string
) {
  // response loading
  convoState.setValue((cs: any) => ({ ...cs, turn: command }));

  let output = await Completion({
    question: message,
    systems: ["gpt3_correction", "gpt3_repeat_generation"]
  });

  let ai_resp1 = output["resp1"];
  let ai_resp2 = output["resp2"];
  let session_name = output["session_name"];
  let dialog_state1 = output["dialog_state1"]
  let dialog_state2 = output["dialog_state2"]

  let explanation = "AI response 1: " + ai_resp1 + "\n"
  explanation += "AI response 2: " + ai_resp2

  console.log("Explanation: " + explanation);

  let replies = [
    {
      id: uuidv4(),
      fromChatbot: true,
      text: ai_resp2,
    },
  ];

  convoState.setValue((cs: any) => ({
    ...cs,
    turn: "user-answer", // update this
  }));

  return replies;
}