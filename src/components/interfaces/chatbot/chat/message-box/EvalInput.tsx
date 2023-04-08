import React, { useState, useEffect } from "react";
import Message from "../message-window/Message";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { userScores } from "../../../../global/branding";

export default function EvalInput({ convoState, history, audioRef, handleSubmit, responseIndex }: any) {
    // initialize all rating values (array of length n) to null
    const userRatings = []
    const setUserRatings = []
    for (let i = 0; i < Object.keys(userScores()).length; i++) {
        const [rating, setRating] = useState(null)
        userRatings.push(rating)
        setUserRatings.push(setRating)
    }
    // const [userRatings, setUserRatings] = useState(null)
    const [key, setKey] = useState(1);
    const messageText = convoState.value.responseInfo.responses[convoState.value.responseInfo.randomizedSystemIndices[responseIndex]]

    useEffect(() => {
        // reset all rating values
        for (let i = 0; i < Object.keys(userScores()).length; i++) {
            setUserRatings[i](null)
        }
    }, [convoState.value.turn])

    return (

        <div className="py-3 px-3">
            <div className="font-bold text-lg text-left">
                Here is the
                <span className="text-ovalchat-primary">
                    {(() => {
                        if (responseIndex == 0)
                            return " first "
                        if (responseIndex == 1)
                            return " second "
                        if (responseIndex == 2)
                            return " third "

                        return " " + (responseIndex + 1).toString() + "th "
                    })()
                    }

                </span>
                reply:
            </div>
            <ul className="mb-2 -ml-3 pt-2">
                <Message message={
                    {
                        show: true,
                        fromChatbot: true,
                        center: false,
                        text: messageText,
                        showSpeechButton: false
                    }
                } audioRef={audioRef} convoState={convoState} />
            </ul>
            <div className="flex flex-row justify-end">
                <div className="w-fit">
                    {Object.entries(userScores()).map(([k, v], index) => {
                        if (v.type == "binary") {
                            return <EvaluationBlock key={index}>
                                <div className="flex flex-col text-center gap-y-1">
                                    <p>{v.prompt}</p>
                                    <BinaryPillSelect parameter={{
                                        name: k,
                                        value: userRatings[index],
                                        setValue: setUserRatings[index],
                                        labelForTrue: v.labelForTrue,
                                        labelForFalse: v.labelForFalse
                                    }}
                                        convoState={convoState}
                                    />
                                </div>
                            </EvaluationBlock>
                        }
                        else if (v.type == "slider") {
                            return <EvaluationBlock key={index}>
                                <div className="flex flex-col text-center gap-y-1">
                                    <p>{v.prompt} <br /> <b>{userRatings[index] !== null ? <span className="capitalize">{userRatings[index].toString()}</span> : "[please select]"}</b></p>
                                    <Slider parameter={{
                                        name: k,
                                        min: v.min,
                                        max: v.max,
                                        value: userRatings[index],
                                        setValue: setUserRatings[index],
                                        label1: v.label1,
                                        label2: v.label2
                                    }}
                                        date={key}
                                        convoState={convoState}
                                    />
                                </div>
                            </EvaluationBlock>
                        }
                    })}

                    <button
                        onClick={(e: any) => {
                            handleSubmit(e, convoState, history, userRatings);
                            setKey(key + 1);
                        }}
                        // disable button if any of the ratings are null
                        disabled={convoState.value.turn.includes("ovalchat-reads") || userRatings.includes(null)}
                        className="mt-3 mx-auto block focus:ring-0 py-1 px-4 md:px-6 focus:outline-none shadow-sm sm:text-base border-0 rounded-full text-white bg-ovalchat-primary hover:bg-ovalchat-primary-dark1 disabled:bg-slate-400 disabled:border-slate-400 hover:border-ovalchat-secondary-light">
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
            className={`py-1 px-4 md:px-6 focus:outline-none shadow-sm sm:text-base border-r-2 border-gray-500 rounded-l-full ${parameter.value === true ? "bg-ovalchat-secondary-bright text-white font-semibold hover:bg-ovalchat-secondary-light" : "bg-gray-300 text-gray-700 hover:bg-[#c2c6cc]"}`}
        >
            {parameter.labelForTrue}
        </button>
        <button
            onClick={(e: any) => {
                e.preventDefault();
                parameter.setValue(false);
            }}
            disabled={!convoState.value.turn.startsWith("user")}
            className={`py-1 px-4 md:px-6 focus:outline-none shadow-sm sm:text-base rounded-r-full  ${parameter.value === false ? "bg-ovalchat-secondary-bright text-white font-semibold hover:bg-ovalchat-secondary-light" : "bg-gray-300 text-gray-700 hover:bg-[#c2c6cc]"}`}
        >
            {parameter.labelForFalse}
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

function EvaluationBlock({ children }: any) {
    return (
        <div className="flex flex-col gap-y-8 rounded-3xl w-100 px-5 py-5 mt-1.5 bg-ovalchat-primary text-white ml-auto">
            {children}
        </div>);
}