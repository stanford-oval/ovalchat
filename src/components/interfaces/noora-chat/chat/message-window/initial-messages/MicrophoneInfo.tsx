import React, { useState, } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { InformationCircleIcon } from "@heroicons/react/outline";

import dynamic from "next/dynamic";
import { ACTIONS, EVENTS, STATUS } from "react-joyride";
const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

export default function MicrophoneInfo() {
    const [joyrideState, setJoyrideState] = useState({
        run: false,
        steps: [
            {
                target: ".joyride-step-1",
                content:
                    "Tap this button, then start speaking!\n When you're done talking, click this button again.",
                disableBeacon: true,
            },
            {
                target: ".demo-audio",
                content:
                    "Tap this button to hear FactGPT speak!",
                disableBeacon: true,
            },
        ],
        stepIndex: 0,
    });

    const handleJoyrideCallback = (data: any) => {
        const { action, index, status, type } = data;

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            // Update state to advance the tour
            setJoyrideState((js: any) => ({
                ...js,
                stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
            }));
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            setJoyrideState((js: any) => ({ ...js, stepIndex: 0, run: false }));
        }
    };

    return (
        <div>
            <JoyRideNoSSR
                steps={joyrideState.steps}
                run={joyrideState.run}
                callback={handleJoyrideCallback}
                stepIndex={joyrideState.stepIndex}
                floaterProps={{ placement: "top" }}
                styles={{
                    options: {
                        // overlayColor: "rgba(79, 26, 0, 0.4)",
                        primaryColor: "#047857",
                        zIndex: 1000,
                    },
                }}
                locale={{
                    next: "Next",
                    close: "Got it!",
                }}
            />
            You can tap on the{" "}
            <FontAwesomeIcon
                icon={faMicrophone}
                onClick={() => {
                    setJoyrideState((js: any) => ({ ...js, run: true }));
                }}
                className="w-4 h-4 text-factgpt-primary inline-block mb-1 px-0.5 cursor-pointer"
            />{" "}
            button to start speaking. When you&apos;re done talking, click it again. Click the <FontAwesomeIcon
                icon={faVolumeUp}
                onClick={() => {
                    setJoyrideState((js: any) => ({ ...js, run: true, stepIndex: 1 }));
                }}
                className="w-5 h-5 text-factgpt-primary inline-block mb-1 px-0.5 cursor-pointer"
            /> button to hear my replies.
            <button
                onClick={() => {
                    setJoyrideState((js: any) => ({ ...js, run: true }));
                }}
                className="button text-xs bg-factgpt-secondary-bright hover:bg-factgpt-secondary-light text-white block mt-3"
            >
                <span>Show me where</span>
                <InformationCircleIcon className="w-4 h-4 inline-block ml-1 -mt-0.5" />
            </button>
        </div>
    );
}
