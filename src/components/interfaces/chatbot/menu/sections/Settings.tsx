import React from "react";

export default function Settings({ convoState }: any) {
    return (
        <div className="px-2 mt-1 text-gray-900">
            {convoState.value.isHomePage
                ? <div className="font-bold mb-1">Select System: </div>
                : <div className="font-bold mb-1">Available Systems: </div>
            }
            {convoState.value.allAvailableSystems.map((system: any) => (
                <ul key={system} className="flex flex-row w-full items-center my-1">
                    {convoState.value.isHomePage
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
                    <label htmlFor={system} className="break-words w-10/12 mx-1">{stylizeSystemName(system)}</label>
                </ul>
            ))}
        </div>
    );
}

function stylizeSystemName(system: string) {
    var start = system.indexOf('[')
    var systemName = system
    var systemParameters = null
    if (start !== -1) {
        systemName = system.substring(0, start)
        systemParameters = system.substring(start)

        return <>
            <div className="my-0 py-0">{systemName}</div>
            <div className="text-xs text-gray-500">{systemParameters}</div>
            </>
    }
    return <>{systemName}</>

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