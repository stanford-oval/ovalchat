import React from "react";

export default function SelectInput({ convoState, history, handleSubmit }: any) {
    // console.log(convoState.value.responseInfo.responses)
    return (<div className="text-center px-3 py-1">
        <div className="font-bold text-lg">Click on the response you like better, to continue the conversation.</div>
        <div className="flex flex-col flex-wrap md:gap-x-4 gap-y-1 md:flex-row justify-center align-middle my-2">
            {
                convoState.value.responseInfo.randomizedSystemIndices.map((randomizedIndex: number) => <button
                    key={randomizedIndex}
                    onClick={(e: any) => {
                        handleSubmit(e, convoState, history, randomizedIndex);
                        convoState.setValue((cs: any) => ({
                            ...cs,
                            responseInfo: {
                                ...cs.responseInfo,
                                preferredResponseIdx: randomizedIndex,
                            },
                        }));

                        const MAX_USER_TURNS = parseInt(process.env.NEXT_PUBLIC_CROWDSOURCE_MAX_TURNS);
                        if (convoState.value.responseInfo.turnId == MAX_USER_TURNS - 1) {
                            // alert the user that their job is finished
                            if (navigator.clipboard && window.isSecureContext) {
                                // copy the text automatically
                                navigator.clipboard.writeText(convoState.value.responseInfo.dialogId.toString());
                            }
                            //say thank you, please copy dialogId
                            convoState.setValue((cs: any) => ({ ...cs, finishedJob: true }));

                        }
                    }}
                    disabled={convoState.value.turn.includes("ovalchat-reads")}
                    className={"text-left mx-auto rounded-3xl w-fit px-4 py-3 m-1 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl break-words bg-gray-200 hover:bg-gray-200 border-2 hover:border-gray-800 duration-75"}>
                    {convoState.value.responseInfo.responses[randomizedIndex]}
                </button>)
            }
        </div>
    </div>)
}