import React from "react"
import { clsx } from "clsx";
import SpeechSynthesizer from "../../../speech/SpeechSynthesizer";
import { messageToSpeechParams } from '../../../../../scripts/chatbot/audio_utils';

export default function MessageWrapper({ message, audioRef, convoState, children, showSpeechButton }: any) {
    return <div
        className={clsx(
            "rounded-3xl w-fit px-5 py-3 mx-2 mt-1.5 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl break-words text-left",
            message.center ? "bg-gray-200 mx-auto" :
                (message.fromChatbot
                    ? "bg-gray-200 mr-auto"
                    : "bg-ovalchat-primary text-white ml-auto")
        )}
    >
        <div className="flex flex-row items-center gap-x-2">
            {children}
            {message.fromChatbot && showSpeechButton &&
                <SpeechButton audioRef={audioRef} convoState={convoState} message={message} />
            }
        </div>
    </div>
}



function SpeechButton({ convoState, message, audioRef }: any) {
    const props = messageToSpeechParams(convoState, message, audioRef, null, null)

    return (<SpeechSynthesizer {...props}
        className={clsx("-mt-0.5 h-4 w-4 inline-block ", message.id == -3 ? "demo-audio" : "")} />
    )
}
