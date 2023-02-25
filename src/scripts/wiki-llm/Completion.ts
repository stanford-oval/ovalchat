export default async function Completion(parameters: any) {
    let sessionExists = parameters.session_name ? true : false
    let endpoint = "http://factgpt.westus2.cloudapp.azure.com:6001/"
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
        "resp1": "First response",
        "resp2": "Second response",
        "session_name": "Session name",
        "dialog_state1": "Dialog state 1",
        "dialog_state2": "Dialog state 2"
    }
}