import getReply from "./get-reply";

export default async function chatbotsTurn(
    message: string,
    convoState: any,
    history: any,
) {
    let replies = []
    if (convoState.value.autoPickMode)
        replies = await getReply(message, convoState, "get-reply-force-second");
    else {
        replies = await getReply(message, convoState, "get-reply");
    }
    
    if (replies)
        history.setValue((h: any) => [...h, ...replies]);
}
