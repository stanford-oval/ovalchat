import getReply from "./get-reply";
import { userSelect } from './actions';

export default async function chatbotsTurn(
    message: string,
    convoState: any,
    history: any,
    dialogId: string
) {
    // get two responses from the backend and update convoState with them
    const responseInfo = await getReply(message, convoState, "get-reply", dialogId);

    // because we never see the evaluation or user select screen, we can force pick the first (and only) response
    if (convoState.value.autoPickMode)
        userSelect(convoState, history, 0, responseInfo)
}
