import chatbotsTurn from "./chatbot-turn";
import { userSelect } from './actions';

export default async function handleSubmit(e: any, convoState: any, history: any, message?: string) {
    if (e) e.preventDefault();

    // stop audio
    if (convoState.value.audio.player) {
        convoState.value.audio.player.pause()
        convoState.value.audio.player.close()
    }

    if (convoState.value.turn.startsWith("user-answer")) {
        message = message ? message : convoState.value.draft.slice();
        if (!message) message = ""

        history.setValue((h: any) => [
            ...h,
            { id: convoState.value.responseInfo.currentDialogId, fromChatbot: false, text: message, show: true },
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
        userSelect(convoState, history, parseInt(message) - 1)
    }
};

