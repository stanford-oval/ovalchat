import { v4 as uuidv4 } from "uuid";
import Completion from "../wiki-llm/Completion";

export default async function getReply(
  message: string,
  convoState: any,
  command: string
) {
  // response loading
  convoState.setValue((cs: any) => ({ ...cs, turn: command }));

  let output = await getAiOutput(convoState, message);

  let aiResp1 = output["resp1"];
  let aiResp2 = output["resp2"];
  let sessionName = output["session_name"];
  let dialogState1 = output["dialog_state1"]
  let dialogState2 = output["dialog_state2"]

  let replies = [
    {
      id: uuidv4(),
      fromChatbot: true,
      text: aiResp2,
    },
  ];

  convoState.setValue((cs: any) => ({
    ...cs,
    responseInfo: {
      ...cs.responseInfo,
      responses: [aiResp1, aiResp2],
      dialogStates: [dialogState1, dialogState2],
      sessionName: cs.responseInfo.sessionName ?? sessionName,
      rating: "resp2" // update
    },
    turn: "user-answer", // update
  }));

  return replies;
}

async function getAiOutput(convoState, message) {
  let completionParameters = {}

  if (convoState.value.responseInfo.sessionName) {
    completionParameters = {
      session_name: convoState.value.responseInfo.sessionName,
      rating: convoState.value.responseInfo.rating,
      user_response: message,
    }
  } else {
    completionParameters = {
      question: message,
    }
  }

  completionParameters["systems"] = ["gpt3_correction", "gpt3_repeat_generation"]

  let output = await Completion(completionParameters);

  console.log(output)
  return output;
}