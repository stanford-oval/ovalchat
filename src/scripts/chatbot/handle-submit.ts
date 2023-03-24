import chatbotsTurn from "./chatbot-turn";
import { userSelect } from './actions';
import RatingRequest from "../wiki-llm/RatingRequest";
import getUniqueId from "../utils/unique-id";

export default async function handleSubmit(e: any, convoState: any, history: any, message?: string) {
    if (e) e.preventDefault();

    // stop audio
    if (convoState.value.audio.player) {
        convoState.value.audio.player.pause()
        convoState.value.audio.player.close()
    }

    if (convoState.value.turn.startsWith("user-answer")) {
        // on user submit text, add the message to the history
        if (!message)
            message = ""

        // clear user preference
        convoState.setValue((cs: any) => ({
            ...cs,
            responseInfo: {
                ...cs.responseInfo,
                preferredResponseIdx: null,
            },
        }));

        history.setValue((h: any) => [
            ...h,
            { id: getUniqueId(), fromChatbot: false, text: message, show: true },
        ]);
        

        
        // then, get the response(s) from the backend
        await chatbotsTurn(message, convoState, history);
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
        RatingRequest(ri.experimentId, ri.dialogId, ri.turnId, convoState.value.allAvailableSystems[convoState.value.responseInfo.randomizedSystemIndices[responseIdx]], naturalnessRating, factualCorrectness, confidenceRating)

        convoState.setValue((cs: any) => ({
            ...cs,
            turn: responseIdx == convoState.value.allAvailableSystems.length-1 ? "user-select" : "user-eval"+(responseIdx+2).toString(), // if evaluating the last response, go to user-select, otherwise go to the next user-eval
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

