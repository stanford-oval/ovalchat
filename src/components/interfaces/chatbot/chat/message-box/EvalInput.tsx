import React, { useState, useEffect } from "react";
import Message from "../message-window/Message";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function EvalInput({ convoState, history, audioRef, handleSubmit, responseIndex }: any) {
    const [naturalnessRating, setNaturalnessRating] = useState(null);
    const [factualCorrectness, setFactualCorrectness] = useState(null);
    const [confidenceRating, setConfidenceRating] = useState(null);
    const [key, setKey] = useState(1);
    const messageText = convoState.value.responseInfo.responses[responseIndex]

    useEffect(() => {
        // reset all rating values
        setNaturalnessRating(null)
        setFactualCorrectness(null)
        setConfidenceRating(null)
    }, [convoState.value.turn])

    return (
        
    <div className="py-3 px-3">
        <div className="font-bold text-lg text-left">Here is the <span className="text-wikichat-primary">{responseIndex == 0 ? "first" : "second"}</span> reply:</div>
        <ul className="mb-2 -ml-3 pt-2">
            <Message message={
                {
                    show: true,
                    fromChatbot: true,
                    center: false,
                    text: messageText,
                }
            } audioRef={audioRef} convoState={convoState} />
        </ul>
        <div className="flex flex-row justify-end">
            <div className="w-fit">
                <EvaluationBlock>
                    <div className="flex flex-col text-center gap-y-1">
                        <p>Is this reply factually correct?</p>
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
                </EvaluationBlock>
                <EvaluationBlock>
                    <div className="flex flex-col text-center gap-y-1">
                        <p>How confident are you in your choice above? <br /> <b>{confidenceRating !== null ? <span className="capitalize">{confidenceRating.toString()}</span> : "[please select]"}</b></p>
                        <Slider parameter={{
                            name: "Confidence in Factual Correctness",
                            min: 1,
                            max: 5,
                            value: confidenceRating,
                            setValue: setConfidenceRating,
                            label1: "Not sure at all",
                            label2: "Completely sure"
                        }}
                            date={key}
                            convoState={convoState}
                        />
                    </div>
                </EvaluationBlock>
                <EvaluationBlock>
                    <div className="flex flex-col text-center gap-y-1">
                        <p>How natural is this reply? <br /> <b>{naturalnessRating !== null ? <span className="capitalize">{naturalnessRating.toString()}</span> : "[please select]"}</b></p>
                        <Slider parameter={{
                            name: "Naturalness",
                            min: 1,
                            max: 5,
                            value: naturalnessRating,
                            setValue: setNaturalnessRating,
                            label1: "Unnatural",
                            label2: "Humanlike"
                        }}
                            date={key}
                            convoState={convoState}
                        />
                    </div>
                </EvaluationBlock>
                <button
                    onClick={(e: any) => {
                        handleSubmit(e, convoState, history, naturalnessRating + ";" + factualCorrectness + ";" + confidenceRating);
                        setKey(key+1);
                    }}
                    disabled={convoState.value.turn.includes("wikichat-reads") || (naturalnessRating === null) || (factualCorrectness === null) || (confidenceRating === null)}
                    className="mt-3 mx-auto block focus:ring-0 py-1 px-4 md:px-6 focus:outline-none shadow-sm sm:text-base border-0 rounded-full text-white bg-wikichat-primary hover:bg-wikichat-primary-dark1 disabled:bg-slate-400 disabled:border-slate-400 hover:border-wikichat-secondary-light">
                    <div className="flex flex-row">
                        <b>Submit</b>
                        {/* <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 ml-1.5 my-auto" /> */}
                    </div>
                </button>
            </div>
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
            Yes
        </button>
        <button
            onClick={(e: any) => {
                e.preventDefault();
                parameter.setValue(false);
            }}
            disabled={!convoState.value.turn.startsWith("user")}
            className={`py-1 px-4 md:px-6 focus:outline-none shadow-sm sm:text-base rounded-r-full  ${parameter.value === false ? "bg-wikichat-secondary-bright text-white font-semibold hover:bg-wikichat-secondary-light" : "bg-gray-300 text-gray-700 hover:bg-[#c2c6cc]"}`}
        >
            No
        </button>
    </div>
}

function Slider({ parameter, convoState, date }: any) {
    return (
        <div className="my-auto w-100">
            {/* {parameter.description && (
                <div className="text-gray-500 text-xs">({parameter.description})</div>
            )} */}
            <input
                key={date}
                id={parameter.propertyName}
                type="range"
                disabled={!convoState.value.turn.startsWith("user")}
                min={parameter.min}
                max={parameter.max}
                defaultValue="0"
                onChange={(e: any) => {
                    parameter.setValue(e.target.value);
                }}
                step="1"
                className="w-7/12 h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 secondary-slider-thumb"
            />
            <div className="flex items-stretch text-sm">
                <label className="">
                    {parameter.label1} (1)
                </label>
                <div className="ml-auto">
                    {parameter.label2} (5)
                </div>
            </div>
        </div>
    );
}

function EvaluationBlock({children}: any) {
    return (
        <div className="flex flex-col gap-y-8 rounded-3xl w-100 px-5 py-5 mt-1.5 bg-wikichat-primary text-white ml-auto">
            {children}
        </div>);
}