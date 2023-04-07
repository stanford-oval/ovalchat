import React from "react";
import MessageWrapper from "./MessageWrapper";

export default function Message({ message, audioRef, convoState, showSpeechButton=true }: any) {
    if (!message.show)
        return <></>

    return <li>
        {message && (
            <MessageWrapper message={message} convoState={convoState} audioRef={audioRef} showSpeechButton={showSpeechButton}>
                {message.text ? <MessageText message={message} /> : message.component}
            </MessageWrapper>
        )}
    </li>
}

function MessageText({ message }: any) {
    return <div>{message.text}</div>;
}
