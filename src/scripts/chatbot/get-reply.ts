import getUniqueId from "../utils/unique-id";
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
        id: getUniqueId(),
        fromChatbot: true,
        text: "Oops! Something went wrong. Please refresh the page and try again.",
      },
    ];
  }

  // output might have 1 or 2 items
  const newInfo = {
    responses: output.map((o) => o["agent_utterance"]),
    logObjects: output.map((o) => o["log_object"]),
  }
  if (convoState.value.autoPickMode)
    newInfo["systems"] = [convoState.value.selectedSystem]

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
  const ri = convoState.value.responseInfo;

  let replies = [];
  if (convoState.value.autoPickMode) {
    // only need one request, so the returned replies array will have one item
    let reply = await ChatRequest(ri.experimentId, ri.dialogId, ri.turnId, message, convoState.value.selectedSystem);
    replies.push(reply);
  } else {
    for (let i = 0; i < 2; i++) {
      let reply = await ChatRequest(ri.experimentId, ri.dialogId, ri.turnId, message, ri.systems[i]);
      replies.push(reply);
    }
  }

  return replies
}