import React from "react";

export default function Settings({ convoState }: any) {
    return (
        <div className="px-1 mt-1 text-gray-900">
            <div>
                {convoState.value.autoPickMode
                ?  <span className="font-bold">Select System: </span>
                : <span className="font-bold">Available Systems: </span>
                }
                {convoState.value.allAvailableSystems.map((system: any) => (
                    <ul key={system} className="flex flex-row w-full">
                        {convoState.value.autoPickMode &&
                            <input name="system"
                                id={system}
                                type="radio"
                                checked={system === convoState.value.selectedSystem}
                                className="w-4 h-4 mx-1 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" onChange={(event) => handleChange(event, convoState)}>
                            </input>
                        }
                        <label htmlFor={system} className="break-words w-10/12 mx-2">{system}</label>
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
                // console.log(newState.selectedSystem)
                return newState
            })
    }
}