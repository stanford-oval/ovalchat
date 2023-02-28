import React, { useState } from "react";
import Message from "../message-window/Message";

export default function EvalInput({ convoState, history, audioRef, handleSubmit }: any) {
    const [rating, setRating] = useState(3);

    return (<div className="text-center">
        <div className="font-bold text-lg">How natural is this response?</div>
        <ul className="mb-2">
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
            <Slider parameter={{
                name: "Rating",
                min: 1,
                max: 5,
                value: rating,
                setValue: setRating
            }}
                convoState={convoState}
            />
            <button
                onClick={(e: any) => {
                    handleSubmit(e, convoState, history, rating);
                }}
                disabled={convoState.value.turn.includes("wikichat-reads")}
                className="block focus:ring-0 py-1 px-2 sm:px-3 md:px-4 border-2 focus:outline-none shadow-sm sm:text-base rounded-full text-white border-wikichat-secondary-bright bg-wikichat-secondary-bright hover:bg-wikichat-secondary-light disabled:bg-slate-400 disabled:border-slate-400 hover:border-wikichat-secondary-light"
            >Next
            </button>
        </div>
    </div>)
}

function Slider({ parameter, convoState }: any) {
    return (
        <div className="my-auto">
            {/* <div className="flex items-stretch mt-1">
                <label htmlFor={parameter.propertyName} className="font-bold">
                    {parameter.name}:
                </label>
                <div className="ml-auto">
                    {convoState.value.model[parameter.propertyName]}
                </div>
            </div> */}
            {/* {parameter.description && (
                <div className="text-gray-500 text-xs">({parameter.description})</div>
            )} */}
            <input
                id={parameter.propertyName}
                type="range"
                disabled={!convoState.value.turn.startsWith("user")}
                min={parameter.min}
                max={parameter.max}
                defaultValue={parameter.value}
                onChange={(e: any) => {
                    parameter.setValue(e.target.value);
                }}
                step="1"
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 primary-slider-thumb"
            />
        </div>
    );
}