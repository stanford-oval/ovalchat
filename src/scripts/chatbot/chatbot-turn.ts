import getReply from "./get-reply";
import { userSelect } from './actions';

export default async function chatbotsTurn(
    message: string,
    convoState: any,
    history: any,
) {
    const responseInfo = await getReply(message, convoState, "get-reply");

    if (convoState.value.autoPickMode)
        userSelect(convoState, history, 1, responseInfo)
}
