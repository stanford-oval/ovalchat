import { v4 as uuidv4 } from "uuid";
import Completion from "../wiki-llm/Completion";

export default async function getReply(
  message: string,
  convoState: any,
  command: string
) {
  // response loading
  convoState.setValue((cs: any) => ({ ...cs, turn: command }));

  let output = {}
  try {
    output = await getAiOutput(convoState, message);
  } catch (error) {
    console.log(error);
    convoState.setValue((cs: any) => ({
      ...cs,
      turn: "user-answer",
    }));
    return [
      {
        id: uuidv4(),
        fromChatbot: true,
        text: "Oops! Something went wrong. Please refresh the page and try again.",
      },
    ];
  }

  let aiResp1 = output["resp1"];
  let aiResp2 = output["resp2"];
  let sessionName = output["session_name"];

  if (command.startsWith("get-reply-force-second")) {
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
        dialogStates: [output["dialog_state1"], output["dialog_state2"]],
        sessionName: cs.responseInfo.sessionName ?? sessionName,
        rating: "resp2"
      },
      turn: "user-answer",
    }));

    return replies;
  }
  else if (command.startsWith("get-reply")) {
    convoState.setValue((cs: any) => ({
      ...cs,
      responseInfo: {
        ...cs.responseInfo,
        responses: [aiResp1, aiResp2],
        dialogStates: [output["dialog_state1"], output["dialog_state2"]],
        sessionName: cs.responseInfo.sessionName ?? sessionName,
      },
      turn: "user-eval1",
    }));
  }
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

  completionParameters["systems"] = convoState.value.responseInfo.systems;

  let output = await Completion(completionParameters);

  console.log(output)
  return output;
}