import React from "react";
import MessageWrapper from "./MessageWrapper";
import { TypeAnimation } from "react-type-animation";

export default function Message({ message, audioRef, convoState, showSpeechButton = true }: any) {
    if (!message.show)
        return <></>

    return <li>
        {message && (
            <MessageWrapper message={message} convoState={convoState} audioRef={audioRef} showSpeechButton={showSpeechButton}>
                {message.text ? <MessageText message={message} isStatic={message.isStatic} /> : message.component}
            </MessageWrapper>
        )}
    </li>
}

function MessageText({ message, isStatic }: any) {
    // show message.text, including '\n' as <br />
    return <div>{message.text.split('\n').map((item: any, key: any) => {
        // return (
        //     <span key={key}>
        //         {isStatic === true ?
        //             item
        //             :
        //             <TypeAnimation
        //                 sequence={[item,]}
        //                 speed={99}
        //                 cursor={false}
        //             />
        //         }
        //         <br />
        //     </span>
        // )
        return <span key={key}>{item}<br /></span>
    })}</div>;
}
