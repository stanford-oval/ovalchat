import getReply from "./get-reply";

export default async function chatbotsTurn(
    message: string,
    convoState: any,
    history: any,
) {
    let replies = []
    replies = await getReply(message, convoState, "get-reply");

    if (replies)
        history.setValue((h: any) => [...h, ...replies]);
}
