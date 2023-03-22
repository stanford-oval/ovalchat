import React from "react";
import { faCheck, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import { Disclosure } from '@headlessui/react';
import DisclosureTransition from '../../../../global/utility/DisclosureTransition';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { ConversationTranslationEventArgs } from "microsoft-cognitiveservices-speech-sdk";

export default function Technical({ convoState }: any) {
    return (
        <div className="px-1 mt-1 text-gray-900">
            <div>
                <span className="font-bold">Select System: </span>
                {convoState.value.allAvailableSystems.map((system: any) => (
                    <ul key={system}>
                        <input name="system"
                            id={system}
                            type="radio"
                            checked={system === convoState.value.selectedSystem}
                            className="w-4 h-4 mx-1 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" onChange={(event) => handleChange(event, convoState)}>
                        </input>
                        <label htmlFor={system}>{system}</label>
                    </ul>
                ))}
            </div>
        </div>
    );
}

function handleChange(event, convoState: any) {
    if (event.target.checked) {
        convoState.setValue(
            (cs: any) => {
                var newState = { ...cs, selectedSystem: event.target.id }
                console.log(newState.selectedSystem)
                return newState
            })
    }
}