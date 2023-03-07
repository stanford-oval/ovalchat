import { v4 as uuidv4 } from "uuid";
import PreferenceRequest from "../wiki-llm/PreferenceRequest";

export function userSelect(convoState, history, idx: number, ri?: any) {
    // in the case of autoPickMode, we need to pass in the responseInfo because convoState for some reason doesn't have the latest updates
    if (!ri) ri = convoState.value.responseInfo

    history.setValue((h: any) => [
        ...h,
        {
            id: uuidv4(),
            fromChatbot: true,
            text: ri.responses[idx],
            show: true
        }
    ])

    convoState.setValue((cs: any) => ({
        ...cs,
        turn: "user-answer",
        responseInfo: {
            ...cs.ri,
            rating: "resp" + (idx + 1)
        }
    }))

    PreferenceRequest(ri.experimentId, ri.currentDialogId, ri.turnId, ri.systems[idx], ri.systems[1 - idx])
}