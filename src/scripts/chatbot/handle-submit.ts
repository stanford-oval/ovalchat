import { v4 as uuidv4 } from "uuid";
import chatbotsTurn from "./chatbot-turn";

export default async function handleSubmit(e: any, convoState: any, history: any, message?: string) {
    e.preventDefault();

    // stop audio
    if (convoState.value.audio.player) {
        convoState.value.audio.player.pause()
        convoState.value.audio.player.close()
    }

    if (convoState.value.turn.startsWith("user-answer")) {
        message = message ? message : convoState.value.draft.slice();
        if (!message) message = ""

        let userMsgId = uuidv4();

        history.setValue((h: any) => [
            ...h,
            { id: userMsgId, fromChatbot: false, text: message, show: true },
        ]);
        convoState.setValue((cs: any) => ({ ...cs, draft: "" }));
        await chatbotsTurn(message, convoState, history);
    } else if (convoState.value.turn.startsWith("user-eval")) {
        const responseIdx = parseInt(convoState.value.turn.substr(convoState.value.turn.length - 1)) - 1
        convoState.setValue((cs: any) => ({
            ...cs,
            turn: responseIdx == 1 ? "user-select" : "user-eval2",
            responseInfo: {
                ...cs.responseInfo,
                naturalnessRatings: cs.responseInfo.naturalnessRatings.concat([message]),
            }
        }))
    } else if (convoState.value.turn.startsWith("user-select")) {
        history.setValue((h: any) => [
            ...h,
            {
                id: uuidv4(),
                fromChatbot: true,
                text: convoState.value.responseInfo.responses[parseInt(message)]
            },
        ])
        convoState.setValue((cs: any) => ({
            ...cs,
            turn: "user-answer",
            responseInfo: {
                ...cs.responseInfo,
                rating: "resp" + (message + 1)
            }
        }))
    }
};