import React from "react";

export default function SelectInput({ convoState, history, handleSubmit }: any) {
    console.log(convoState.value.responseInfo.responses)
    return (<div className="text-center px-3 py-1">
        <div className="font-bold text-lg">Click on the response you like better, to continue the conversation.</div>
        <div className="flex flex-col md:gap-x-4 gap-y-1 md:flex-row justify-center align-middle mb-2">
            {
                convoState.value.responseInfo.responses.map((r: any, i: number) => <button
                key={i}
                onClick={(e: any) => {
                    handleSubmit(e, convoState, history, i);
                    const MAX_USER_TURNS = parseInt(process.env.NEXT_PUBLIC_CROWDSOURCE_MAX_TURNS);
                    if (convoState.value.responseInfo.turnId == MAX_USER_TURNS-1) {
                        // alert the user that their job is finished
                        if (navigator.clipboard && window.isSecureContext) {
                            // copy the text automatically
                            navigator.clipboard.writeText(convoState.value.responseInfo.dialogId.toString());
                        }
                        //say thank you, please copy dialogId
                        convoState.setValue((cs: any) => ({ ...cs, finishedJob: true}));
                        
                    }
                }}
                disabled={convoState.value.turn.includes("wikichat-reads")}
                className={"mx-auto md:mx-0 rounded-3xl w-fit md:w-1/2 px-4 py-3 mt-1.5 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl break-words bg-gray-200 hover:bg-gray-300"}>
                    {r}
                </button>)
            }
        </div>
    </div>)
}