import { v4 as uuidv4 } from "uuid";
import { saveSessionResult } from "../user-info/session-results";
import factgptsTurn from "./factgpts-turn";

export default async function handleSubmit(e: any, convoState: any, history: any, message?: string) {
    e.preventDefault();

    // stop audio
    if (convoState.value.audio.player) {
        convoState.value.audio.player.pause()
        convoState.value.audio.player.close()
    }

    message = message ? message : convoState.value.draft.slice();
    if (!message) message = ""

    let userMsgId = uuidv4();

    history.setValue((h: any) => [
        ...h,
        { id: userMsgId, fromChatbot: false, text: message, show: true },
    ]);
    convoState.setValue((cs: any) => ({ ...cs, draft: "" }));

    
    await factgptsTurn(message, convoState, history);
};