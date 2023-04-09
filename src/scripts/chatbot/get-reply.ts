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
  let newInfo = {}
  let encounteredError = false
  let outputPromises
  try {
    outputPromises = getAiOutput(convoState, message);
    output = await Promise.all(outputPromises)

    const errors = output.filter((response) => !response.ok);

    if (errors.length > 0) {
      throw errors.map((response) => Error(response.statusText));
    }

    output = output.map((response) => response.json());
    output = await Promise.all(output);
    // console.log(output)
  } catch (exception) {
    encounteredError = true
    console.log(exception);

    let userFriendlyErrorMessage
    if (exception.name == 'NetworkError' || exception.message.includes("NetworkError"))
      userFriendlyErrorMessage = "Encountered a network issue. Could not access the back-end."
    else
      userFriendlyErrorMessage = "Oops! Something went wrong. Please refresh the page and try again."

    convoState.setValue((cs: any) => ({
      ...cs,
      turn: "user-answer",
    }));

    // Set all chatbot messages to the error message
    newInfo = {
      responses: outputPromises.map((o) => userFriendlyErrorMessage),
      logObjects: outputPromises.map((o) => {})
    }

  }

  if (!encounteredError) {
    // output might have 1 or 2 items
    newInfo = {
      responses: output.map((o) => o["agent_utterance"]),
      logObjects: output.map((o) => o["log_object"]),
    }
  }
  if (convoState.value.isHomePage)
    newInfo["systems"] = [convoState.value.selectedSystem]

  convoState.setValue((cs: any) => ({
    ...cs,
    turn: convoState.value.skipEvaluation == true ? "user-select" : "user-eval1",
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

function getAiOutput(convoState, message) {
  const ri = convoState.value.responseInfo;

  let replies = [];
  if (convoState.value.isHomePage) {
    // only need one request, so the returned replies array will have one item
    let reply = ChatRequest(ri.experimentId, ri.dialogId, ri.turnId, message, convoState.value.selectedSystem);
    replies.push(reply);
  } else {
    for (let i = 0; i < convoState.value.allAvailableSystems.length; i++) {
      let reply = ChatRequest(ri.experimentId, ri.dialogId, ri.turnId, message, convoState.value.allAvailableSystems[i]);
      replies.push(reply);
    }
  }

  return replies
}