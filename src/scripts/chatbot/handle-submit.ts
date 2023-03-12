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
            { id: convoState.value.responseInfo.dialogId, fromChatbot: false, text: message, show: true },
        ]);
        convoState.setValue((cs: any) => ({ ...cs, draft: "" }));
        // then, get the response(s) from the backend
        await chatbotsTurn(message, convoState, history);
    } else if (convoState.value.turn.startsWith("user-eval")) {
        // display the rating buttons
        // TODO: refactor and abstract away to rateReply (put in actions.ts)
        const responseIdx = parseInt(convoState.value.turn.substr(convoState.value.turn.length - 1)) - 1 // are we on eval1 or eval2?
        const rating = parseInt(message)
        
        const ri = convoState.value.responseInfo
        RatingRequest(ri.experimentId, ri.dialogId, ri.turnId, ri.systems[responseIdx], rating)

        convoState.setValue((cs: any) => ({
            ...cs,
            turn: responseIdx == 1 ? "user-select" : "user-eval2", // if evaluating second response, go to user-select, otherwise go to user-eval2
            responseInfo: {
                ...cs.responseInfo,
                naturalnessRatings: cs.responseInfo.naturalnessRatings.concat([rating]),
            }
        }))
    } else if (convoState.value.turn.startsWith("user-select")) {
        // pick which reply to use
        userSelect(convoState, history, parseInt(message))
    }
};

