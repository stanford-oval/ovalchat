import { v4 as uuidv4 } from "uuid";
import chatbotsTurn from "./chatbot-turn";
import { userSelect } from './actions';
import RatingRequest from "../wiki-llm/RatingRequest";

export default async function handleSubmit(e: any, convoState: any, history: any, message?: string) {
    if (e) e.preventDefault();

    // stop audio
    if (convoState.value.audio.player) {
        convoState.value.audio.player.pause()
        convoState.value.audio.player.close()
    }

    if (convoState.value.turn.startsWith("user-answer")) {
        // on user submit text, clear the draft and add the message to the history
        message = message ? message : convoState.value.draft.slice();
        if (!message) message = ""

        history.setValue((h: any) => [
            ...h,
            { id: uuidv4(), fromChatbot: false, text: message, show: true },
        ]);
        convoState.setValue((cs: any) => ({ ...cs, draft: "" }));

        // set the dialogId if not already set
        const dialogId = convoState.value.responseInfo.dialogId ? convoState.value.responseInfo.dialogId : uuidv4();
        convoState.setValue((cs: any) => ({
            ...convoState.value,
            responseInfo: {
              ...convoState.value.responseInfo,
              dialogId: dialogId,
            },
          }));
        // then, get the response(s) from the backend
        await chatbotsTurn(message, convoState, history, dialogId);
    } else if (convoState.value.turn.startsWith("user-eval")) {
        // display the rating buttons
        // TODO: refactor and abstract away to rateReply (put in actions.ts)
        const responseIdx = parseInt(convoState.value.turn.substr(convoState.value.turn.length - 1)) - 1 // are we on eval1 or eval2?

        // the message contains the ratings in the format of naturalnessRating (1-5) + ";" + factualCorrectness (true/false) + ";" + confidenceRating (1-5)
        // so let's split it up
        const ratings = message.split(";")
        const naturalnessRating = parseInt(ratings[0])
        const factualCorrectness = ratings[1] == "true"
        const confidenceRating = parseInt(ratings[2])
        
        const ri = convoState.value.responseInfo
        RatingRequest(ri.experimentId, ri.dialogId, ri.turnId, ri.systems[responseIdx], naturalnessRating, factualCorrectness, confidenceRating)

        convoState.setValue((cs: any) => ({
            ...cs,
            turn: responseIdx == 1 ? "user-select" : "user-eval2", // if evaluating second response, go to user-select, otherwise go to user-eval2
            responseInfo: {
                ...cs.responseInfo,
                naturalnessRatings: cs.responseInfo.naturalnessRatings.concat([naturalnessRating]),
            }
        }))
    } else if (convoState.value.turn.startsWith("user-select")) {
        // pick which reply to use
        userSelect(convoState, history, parseInt(message))
    }
};

