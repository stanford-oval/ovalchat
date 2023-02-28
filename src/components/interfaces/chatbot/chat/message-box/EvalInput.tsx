import React from "react";
import Message from "../message-window/Message";

export default function EvalInput({ convoState, history, audioRef, handleSubmit }: any) {
    return (<div className="text-center">
        <div className="font-bold text-lg">How natural is this response?</div>
        <ul>
            <Message message={
                {
                    show: true,
                    fromChatbot: true,
                    center: true,
                    text: convoState.value.responseInfo.responses[parseInt(convoState.value.turn.substr(convoState.value.turn.length - 1)) - 1],
                }
            } audioRef={audioRef} convoState={convoState} />
        </ul>
        <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-8 xl:gap-x-12 justify-center flex-wrap md:flex-nowrap gap-y-2">
            {["test1"].map((o: string) => <button
                key={o}
                onClick={(e: any) => {
                    handleSubmit(e, convoState, history, o);
                }}
                disabled={convoState.value.turn.includes("wikichat-reads")}
                className="block focus:ring-0 py-3 px-4 sm:px-6 md:px-8 border-2 focus:outline-none shadow-sm sm:text-base rounded-full text-white border-wikichat-secondary-bright bg-wikichat-secondary-bright hover:bg-wikichat-secondary-light disabled:bg-slate-400 disabled:border-slate-400 hover:border-wikichat-secondary-light"
            >{o}
            </button>)}
        </div>
    </div>)
}

