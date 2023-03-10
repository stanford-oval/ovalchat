import React, { useState, useEffect } from "react";
import Message from "../message-window/Message";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function EvalInput({ convoState, history, audioRef, handleSubmit }: any) {
    const [naturalnessRating, setNaturalnessRating] = useState(3);
    const [factualCorrectness, setFactualCorrectness] = useState(null);
    const [confidenceRating, setConfidenceRating] = useState(3);
    const responseIdx = parseInt(convoState.value.turn.substr(convoState.value.turn.length - 1)) - 1
    const messageText = convoState.value.responseInfo.responses[responseIdx]

    return (<div className="text-center py-1 px-3">
        <div className="font-bold text-lg">Evaluate the <span className="text-wikichat-primary">{responseIdx == 0 ? "first" : "second"}</span> reply:</div>
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
        <div className="flex mx-auto px-4 justify-center align-middle flex-col gap-y-8 mt-5">
            <div className="flex flex-col text-center">
                <p>How natural is the reply? <br /> <b>Naturalness: {naturalnessRating}</b></p>
                <Slider parameter={{
                    name: "Naturalness",
                    min: 1,
                    max: 5,
                    value: naturalnessRating,
                    setValue: setNaturalnessRating
                }}
                    convoState={convoState}
                />
            </div>
            <div className="flex flex-col text-center">
                <p>Is this reply factually correct? <br /> <b>Factually Correct: {factualCorrectness !== null ? <span className="capitalize">{factualCorrectness.toString()}</span> : "[please select]"}</b></p>
                <BinaryPillSelect parameter={{
                    name: "Naturalness",
                    min: 1,
                    max: 5,
                    value: factualCorrectness,
                    setValue: setFactualCorrectness
                }}
                    convoState={convoState}
                />
            </div>
            <div className="flex flex-col text-center">
                <p>How confident are you in the choice above? <br /> <b>Factual Correctness Rating Confidence: {factualCorrectness}</b></p>
                <Slider parameter={{
                    name: "Confidence in Factual Correctness",
                    min: 1,
                    max: 5,
                    value: confidenceRating,
                    setValue: setConfidenceRating
                }}
                    convoState={convoState}
                />
            </div>
            <button
                onClick={(e: any) => {
                    handleSubmit(e, convoState, history, naturalnessRating);
                }}
                disabled={convoState.value.turn.includes("wikichat-reads") || (factualCorrectness === null)}
                className="mx-auto block focus:ring-0 py-1 px-4 md:px-6 focus:outline-none shadow-sm sm:text-base border-0 rounded-full text-white bg-wikichat-primary hover:bg-wikichat-primary-dark1 disabled:bg-slate-400 disabled:border-slate-400 hover:border-wikichat-secondary-light"
            >
                <div className="flex flex-row">
                    <b>Next</b>
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 ml-1.5 my-auto" />
                </div>
            </button>
        </div>
    </div>)
}

function BinaryPillSelect({ parameter, convoState }: any) {
    // using tailwind
    // two buttons, connected side by side, one for true and one for false
    // if value is chosen, the button is color of primary color, otherwise it is gray
    return <div className="flex flex-row justify-center mt-2 px-4">
        <button
            onClick={(e: any) => {
                e.preventDefault();
                parameter.setValue(true);
            }}
            disabled={!convoState.value.turn.startsWith("user")}
            className={`py-1 px-4 md:px-6 focus:outline-none shadow-sm sm:text-base border-r-2 border-gray-500 rounded-l-full ${parameter.value === true ? "bg-wikichat-secondary-bright text-white font-semibold hover:bg-wikichat-secondary-light" : "bg-gray-300 text-gray-700 hover:bg-[#c2c6cc]"}`}
        >
            True
        </button>
        <button
            onClick={(e: any) => {
                e.preventDefault();
                parameter.setValue(false);
            }}
            disabled={!convoState.value.turn.startsWith("user")}
            className={`py-1 px-4 md:px-6 focus:outline-none shadow-sm sm:text-base rounded-r-full  ${parameter.value === false ? "bg-wikichat-secondary-bright text-white font-semibold hover:bg-wikichat-secondary-light" : "bg-gray-300 text-gray-700 hover:bg-[#c2c6cc]"}`}
        >
            False
        </button>
    </div>
}

function Slider({ parameter, convoState }: any) {
    return (
        <div className="my-auto w-72 sm:w-80 mx-auto">
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
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 secondary-slider-thumb"
            />
            <div className="flex items-stretch text-gray-600 text-sm">
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