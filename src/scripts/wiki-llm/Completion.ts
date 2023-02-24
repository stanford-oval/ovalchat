export default async function Completion(parameters: any) {
    let reply = await fetch("http://factgpt.westus2.cloudapp.azure.com:6001/data", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(parameters)
    }).then((res) => res.json())

    return reply;
}