import React from "react";

export default function Settings({ convoState }: any) {
    return (
        <div className="px-2 mt-1 text-gray-900">
            {convoState.value.autoPickMode
                ? <div className="font-bold mb-1">Select System: </div>
                : <div className="font-bold mb-1">Available Systems: </div>
            }
            {convoState.value.allAvailableSystems.map((system: any) => (
                <ul key={system} className="flex flex-row w-full items-center">
                    {convoState.value.autoPickMode
                        ?
                        <input name="system"
                            id={system}
                            type="radio"
                            checked={system === convoState.value.selectedSystem}
                            className="w-4 h-4 mr-1 bg-gray-100 border-gray-300 text-ovalchat-primary-dark1 focus:ring-transparent"
                            onChange={(event) => handleChange(event, convoState)}>
                        </input>
                        :
                        <div className="">&bull;</div>
                    }
                    <label htmlFor={system} className="break-words w-10/12 mx-1">{system}</label>
                </ul>
            ))}
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