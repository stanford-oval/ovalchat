import React, { useState } from "react";
import Message from "../message-window/Message";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function EvalInput({ convoState, history, audioRef, handleSubmit }: any) {
    const [rating, setRating] = useState(3);
    const responseIdx = parseInt(convoState.value.turn.substr(convoState.value.turn.length - 1)) - 1
    const messageText = convoState.value.responseInfo.responses[responseIdx]

    return (<div className="text-center py-1">
        <div className="font-bold text-lg">How natural is this <span className="text-wikichat-primary">{responseIdx == 0 ? "first" : "second"}</span> reply?</div>
        <ul className="mb-2">
            <Message message={
                {
                    show: true,
                    fromChatbot: true,
                    center: true,
                    text: messageText,
                }
            } audioRef={audioRef} convoState={convoState} />
        </ul>
        <div className="flex w-full px-4 gap-x-4 md:gap-x-6 lg:gap-x-8 justify-center flex-wrap md:flex-nowrap gap-y-2">
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
                className="block focus:ring-0 py-1 px-3 md:px-4 border-2 focus:outline-none shadow-sm sm:text-base rounded-full text-white border-wikichat-secondary-bright bg-wikichat-secondary-bright hover:bg-wikichat-secondary-light disabled:bg-slate-400 disabled:border-slate-400 hover:border-wikichat-secondary-light"
            ><div className="flex flex-row">
                    <b>{rating}</b>
                    <FontAwesomeIcon icon={faCheck} className="h-4 w-4 ml-1.5 my-auto" />
                </div>
            </button>
        </div>
    </div>)
}

function Slider({ parameter, convoState }: any) {
    return (
        <div className="my-auto flex-grow max-w-sm">
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
            <div className="flex items-stretch mt-1 text-gray-600 text-sm">
                <label className="">
                    unnatural (1)
                </label>
                <div className="ml-auto">
                    humanlike (5)
                </div>
            </div>
        </div>
    );
}