import getReply from "./get-reply";
import { userSelect } from './actions';

export default async function chatbotsTurn(
    message: string,
    convoState: any,
    history: any,
) {
    // get responses from the backend and update convoState with them
    const responseInfo = await getReply(message, convoState, "get-reply");

    // because we never see the evaluation or user select screen, we can force pick the first (and only) response
    if (convoState.value.isHomePage)
        userSelect(convoState, history, 0, responseInfo)
}
