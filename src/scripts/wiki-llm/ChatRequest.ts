export default async function ChatRequest(experimentId: string, dialogId: string, turnId: number, newUserUtterance: string, systemName: string) {
    let reply = await fetch("http://localhost:5001/chat", {
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
    }).then((res) => res.json())
    return reply;

    // return {
    //     "agent_utterance": "Sample agent utterance. experiment_id=test_experiment, new_user_utterance=who stars in the wandering earth 2?, dialog_id=test_dialog, turn_id=0, system_name=retrieve_and_generate",
    //     "log_object": {
    //         "log object parameter 1": "log object value 1"
    //     }
    // }
}