export function messageToSpeechParams(convoState: any, message: any, audioRef: any, history: any, hidden: any) {
    const text = message.read ? message.read : message.text

    let style = "friendly"
    if (message.style)
        style = message.style

    return {
        text: text,
        style: style,
        id: message.id,
        styleDegree: 1,
        convoState: convoState,
        history: history,
        audioRef: audioRef,
        hidden: hidden,
    }
}

export function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
