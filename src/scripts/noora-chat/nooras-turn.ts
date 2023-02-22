import { v4 as uuidv4 } from "uuid";
import getReply from "./get-reply";

export default async function factgptsTurn(
    message: string,
    convoState: any,
    history: any,
    factgptsTurn = false
) {
    if (convoState.value.statement) {
        if (convoState.value.turn.includes("select")) {
            // handle sentiment classification
            const targetSentiment = convoState.value.statement.statementObj.val.sentiment;
            const m = message.trim().toLowerCase();
            const correct = m == targetSentiment.trim().toLowerCase();


            history.setValue((h: any) => [...h, {
                id: uuidv4(),
                fromNoora: true,
                read: correct ? null : `Actually, this is a ${targetSentiment} statement.`,
                sentiment: correct ? "positive" : "neutral",
                text: correct ? "That's right!" : targetSentiment,
                correction: !correct,
            },
            {
                id: uuidv4(),
                fromNoora: true,
                text: "How would you reply to me?",
            }]
            );

            convoState.setValue((cs: any) => ({
                ...cs,
                turn: "user-answer",
            }));
            return
        }
        else {
            // rate reply if statement was given
            const replies = await getReply(message, convoState, "rate-reply");
            history.setValue((h: any) => [...h, ...replies]);
        }
    }

    // get statement if still need to practice
    // note that progress state has not updated yet, so we use (length + 1)
    if (
        convoState.value.progress.length + 1 < convoState.value.numProblems ||
        factgptsTurn
    ) {
        const replies = await getReply(message, convoState, "get-statement");
        history.setValue((h: any) => [
            ...h,
            {
                fromNoora: true,
                id: uuidv4(),
                text:
                    convoState.value.turn.includes("start")
                        ? "Let's get started."
                        : "Let's try another one.",
            },
            ...replies,
        ]);
    } else {
        history.setValue((h: any) => [
            ...h,
            {
                id: uuidv4(),
                fromNoora: true,
                text: `Good job! You practiced ${convoState.value.numProblems} scenarios. Do you want to continue practicing?`,
            },
        ]);
        convoState.setValue((cs: any) => ({ ...cs, turn: "user-select-end" }));
    }
}
