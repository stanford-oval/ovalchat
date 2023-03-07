import getReply from "./get-reply";
import handleSubmit from "./handle-submit";

export default async function chatbotsTurn(
    message: string,
    convoState: any,
    history: any,
) {
    let replies = []
    replies = await getReply(message, convoState, "get-reply");

    if (replies)
        history.setValue((h: any) => [...h, ...replies]);

    if (convoState.value.autoPickMode)
        handleSubmit(null, convoState, history, "2", true)
}
