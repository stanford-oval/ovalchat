import React from "react";
import { faMicrophone, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Microphone from "../../../speech/Microphone";
import { clsx } from "clsx";

export default function TextInput({ convoState, inputBoxRef, handleSubmit }: any) {
    return <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none  z-10">
            {convoState.value.turn.includes("microphone") ? (
                <FontAwesomeIcon
                    icon={faMicrophone}
                    className="w-4 h-4 text-factgpt-primary"
                />
            ) : (
                <FontAwesomeIcon icon={faPen} className="w-4 h-4 text-slate-400" />
            )}
        </div>


        <input
            ref={inputBoxRef}
            type="text"
            onChange={(e) => {
                convoState.setValue((cs: any) => ({
                    ...cs,
                    draft: e.target.value,
                }));
            }}
            value={convoState.value.draft}
            placeholder={
                (convoState.value.turn.startsWith("user-answer") && !convoState.value.turn.includes("factgpt-reads"))
                    ? (convoState.value.turn.includes("microphone")
                        ? "Speak into your microphone..."
                        : "Send message...")
                    : "Please wait for FactGPT..."
            }
            disabled={
                !convoState.value.turn.startsWith("user-answer") ||
                convoState.value.turn.includes("microphone") || convoState.value.turn.includes("factgpt-reads")
            }
            className={clsx(
                "block focus:border-gray-400 ring-0 focus:ring-0 p-4 pl-12 pr-32 w-full border-2 focus:outline-none shadow-sm sm:text-sm rounded-full text-slate-800",
                convoState.value.turn.includes("microphone")
                    ? "border-factgpt-primary disabled:bg-slate-200 placeholder-slate-600 "
                    : "border-gray-400  disabled:bg-gray-100"
            )}
        />
        <div className="flex absolute right-20 bottom-3 md:bottom-2.5 z-10 joyride-step-1">
            <Microphone
                className="bg-factgpt-primary hover:bg-factgpt-primary-dark disabled:bg-slate-400 focus:outline-none font-medium rounded-full text-sm px-2.5 py-2.5"
                turn={convoState.value.turn}
                convoState={convoState}
                setTurn={(str: string) =>
                    convoState.setValue((cs: any) => ({
                        ...cs,
                        turn: str,
                    }))
                }
                setText={(str: string) =>
                    convoState.setValue((cs: any) => ({
                        ...cs,
                        draft: str,
                    }))
                }
                currText={convoState.value.draft}
            />
        </div>
        <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            disabled={
                convoState.value.draft.length == 0 ||
                convoState.value.turn.includes("microphone") || convoState.value.turn.includes("read")
            }
            className="text-white absolute right-2.5 bottom-3 md:bottom-2.5 bg-factgpt-primary hover:bg-factgpt-primary-dark disabled:bg-slate-400 focus:outline-none font-medium rounded-full text-sm px-4 py-2"
        >
            Send
        </button>
    </div>
}
