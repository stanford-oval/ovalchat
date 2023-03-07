import { v4 as uuidv4 } from "uuid";
import ChatRequest from "../wiki-llm/ChatRequest";

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

  const newInfo = {
    responses: [output[0]["agent_utterance"], output[1]["agent_utterance"]],
    logObjects: [output["log_object1"], output["log_object2"]],
  }

  convoState.setValue((cs: any) => ({
    ...cs,
    turn: "user-eval1",
    responseInfo: {
      ...cs.responseInfo,
      ...newInfo
    }
  }));

  return {
    ...convoState.value.responseInfo,
    ...newInfo
  }
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
    let reply = await ChatRequest(ri.experimentId, ri.currentDialogId, ri.turnId, message, ri.systems[i]);
    replies.push(reply);
  }

  convoState.setValue((cs: any) => ({
    ...cs,
    responseInfo: {
      ...cs.responseInfo,
      turnId: cs.responseInfo.turnId + 1,
    },
  }));

  return replies
}