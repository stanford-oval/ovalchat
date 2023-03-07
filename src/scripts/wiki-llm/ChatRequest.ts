export default async function ChatRequest(parameters: any) {
    // let reply = await fetch("http://factgpt.westus2.cloudapp.azure.com:6001/chat", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         "Access-Control-Allow-Origin": "*",
    //     },
    //     body: JSON.stringify(parameters)
    // }).then((res) => res.json())
    // return reply;

    return {
        "agent_utterance": "Sample agent utterance. experiment_id=test_experiment, new_user_utterance=who stars in the wandering earth 2?, dialog_id=test_dialog, turn_id=0, system_name=retrieve_and_generate",
        "log_object": {
            "log object parameter 1": "log object value 1"
        }
    }
}