import { v4 as uuidv4 } from "uuid";
import ChatRequest from "../wiki-llm/ChatRequest";

export default async function getReply(
  message: string,
  convoState: any,
  command: string,
  dialogId: string
) {
  // response loading
  convoState.setValue((cs: any) => ({ ...cs, turn: command }));

  let output = []
  try {
    output = await getAiOutput(convoState, message, dialogId);
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

  // instead of hardcoding the two responses, we can use the length of the responses array
  const newInfo = {
    responses: output.map((o) => o["agent_utterance"]),
    logObjects: output.map((o) => o["log_object"]),
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

async function getAiOutput(convoState, message, dialogId) {
  let completionParameters = {}

  completionParameters["systems"] = convoState.value.responseInfo.systems;



  const ri = convoState.value.responseInfo;

  let replies = [];
  if (convoState.value.autoPickMode) {
    // only need one request, so the returned replies array will have one item
    let reply = await ChatRequest(ri.experimentId, dialogId, ri.turnId, message, ri.systems[1]);
    replies.push(reply);
  } else {
    for (let i = 0; i < 2; i++) {
      let reply = await ChatRequest(ri.experimentId, dialogId, ri.turnId, message, ri.systems[i]);
      replies.push(reply);
    }
  }

  convoState.setValue((cs: any) => ({
    ...cs,
    responseInfo: {
      ...cs.responseInfo,
      turnId: cs.responseInfo.turnId + 1,
      rating: null,
    },
  }));

  return replies
}