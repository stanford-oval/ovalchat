import { v4 as uuidv4 } from "uuid";

export function userSelect(convoState, history, idx: number, replies?: any) {
    /* 
    `replies` is an object passed when autoPickMode is on because we don't want to set history twice.
    The typical flow is that the user evaluates the responses and then selects one, then history is set.
    But for autoPickMode, we want to set history immediately after the responses are generated (because we pick for the user).
    */

    console.log(replies)

    console.log(convoState.value.responseInfo)

    if (replies) {
        history.setValue((h: any) => [
            ...h,
            ...replies
        ])
    } else {
        history.setValue((h: any) => [
            ...h,
            {
                id: uuidv4(),
                fromChatbot: true,
                text: convoState.value.responseInfo.responses[idx],
                show: true
            }
        ])
    }
    convoState.setValue((cs: any) => ({
        ...cs,
        turn: "user-answer",
        responseInfo: {
            ...cs.responseInfo,
            rating: "resp" + (idx + 1)
        }
    }))
}