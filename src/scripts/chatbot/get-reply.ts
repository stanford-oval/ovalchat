import { v4 as uuidv4 } from "uuid";
import Completion from "../wiki-llm/ChatRequest";

export default async function getReply(
  message: string,
  convoState: any,
  command: string
) {
  // response loading
  convoState.setValue((cs: any) => ({ ...cs, turn: command }));

  let output = []
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

  convoState.setValue((cs: any) => ({
    ...cs,
    responseInfo: {
      ...cs.responseInfo,
      responses: [output[0]["agent_utterance"], output[1]["agent_utterance"]],
      logObjects: [output["log_object1"], output["log_object2"]],
      experimentId: cs.responseInfo.experimentId,
    },
    turn: "user-eval1",
  }));
}

async function getAiOutput(convoState, message) {
  let completionParameters = {}

  completionParameters["systems"] = convoState.value.responseInfo.systems;

  convoState.setValue((cs: any) => ({
    ...cs,
    responseInfo: {
      ...cs.responseInfo,
      currentDialogId: uuidv4(),
    },
  }));

  const ri = convoState.value.responseInfo;

  let replies = [];
  for (let i = 0; i < 2; i++) {
    let reply = await Completion(ri.experimentId, ri.currentDialogId, ri.turnId, message, ri.systems[i]);
    replies.push(reply);
  }

  return replies
}