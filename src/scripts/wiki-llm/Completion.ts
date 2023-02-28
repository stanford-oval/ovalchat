export default async function Completion(parameters: any) {
    let sessionExists = parameters.session_name ? true : false
    let endpoint = "https://factgpt.westus2.cloudapp.azure.com:6001/"
    endpoint += sessionExists ? "conv" : "data"

    // let reply = await fetch(endpoint, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         "Access-Control-Allow-Origin": "*",
    //     },
    //     body: JSON.stringify(parameters)
    // }).then((res) => res.json())
    // return reply;

    return {
        "resp1": "This is an example FIRST response from the AI model.",
        "resp2": "This is an example SECOND response from the AI model.",
        "session_name": "Session name",
        "dialog_state1": "Dialog state 1",
        "dialog_state2": "Dialog state 2"
    }
}