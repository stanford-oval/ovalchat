import React from "react";

export default function SelectInput({ convoState, history, options, handleSubmit }: any) {
    return (<div className="flex gap-x-2 md:gap-x-4 lg:gap-x-8 xl:gap-x-12 justify-center flex-wrap md:flex-nowrap gap-y-2">
        {options.map((o: string) => <button
            key={o}
            onClick={(e: any) => {
                handleSubmit(e, convoState, history, o);
            }}
            disabled={convoState.value.turn.includes("wikichat-reads")}
            className="block focus:ring-0 py-3 px-4 sm:px-6 md:px-8 border-2 focus:outline-none shadow-sm sm:text-base rounded-full text-white border-wikichat-secondary-bright bg-wikichat-secondary-bright hover:bg-wikichat-secondary-light disabled:bg-slate-400 disabled:border-slate-400 hover:border-wikichat-secondary-light"
        >{o}
        </button>)}
    </div>)
}

