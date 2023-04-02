export default function ChatRequest(experimentId: string, dialogId: string, turnId: number, newUserUtterance: string, systemName: string) {
    let reply = fetch(process.env.NEXT_PUBLIC_CHAT_BACKEND + "/chat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            experiment_id: experimentId,
            dialog_id: dialogId,
            turn_id: turnId,
            new_user_utterance: newUserUtterance,
            system_name: systemName
        })
    })
    return reply;
}