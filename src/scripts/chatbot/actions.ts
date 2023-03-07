import { v4 as uuidv4 } from "uuid";

export function userSelect(convoState, history, idx: number, responseInfo?: any) {
    // in the case of autoPickMode, we need to pass in the responseInfo because convoState for some reason doesn't have the latest updates
    if (!responseInfo) responseInfo = convoState.value.responseInfo

    history.setValue((h: any) => [
        ...h,
        {
            id: uuidv4(),
            fromChatbot: true,
            text: responseInfo.responses[idx],
            show: true
        }
    ])

    convoState.setValue((cs: any) => ({
        ...cs,
        turn: "user-answer",
        responseInfo: {
            ...cs.responseInfo,
            rating: "resp" + (idx + 1)
        }
    }))
}