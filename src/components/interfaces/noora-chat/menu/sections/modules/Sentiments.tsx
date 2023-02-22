import React from "react";

export default function Sentiments({ convoState }: any) {

    return (
        <div>
            Sentiments:{" "}
            <span className="flex gap-x-3 gap-y-1">
                {convoState.value.sentiments.map((sentiment: any) => {
                    return (
                        <div key={sentiment.title} className="form-check">
                            <label className="form-check-label inline-block text-gray-800">
                                <input
                                    disabled={convoState.value.sentiments.filter((s: any) => s.active).length == 1 && sentiment.active}
                                    className="form-check-input h-4 w-4 border border-gray-400 rounded-sm disabled:cursor-default bg-white checked:bg-factgpt-primary checked:hover:bg-factgpt-primary checked:focus:bg-factgpt-primary disabled:checked:bg-slate-400 disabled:checked:hover:bg-slate-400 disabled:checked:focus:bg-slate-400 outline-none ring-0 focus:ring-0 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-1 cursor-pointer"
                                    type="checkbox"
                                    checked={sentiment.active}
                                    onChange={() => {
                                        // toggle category active/inactive
                                        let newSentiments = convoState.value.sentiments.map(
                                            (s: any) => {
                                                if (s.title == sentiment.title)
                                                    return { title: s.title, active: !s.active };
                                                else return s;
                                            }
                                        );
                                        convoState.setValue((cs: any) => ({
                                            ...cs,
                                            sentiments: newSentiments,
                                        }));
                                    }}
                                />
                                <span className="inline-block mt-0.5">
                                    {sentiment.title.charAt(0).toUpperCase() +
                                        sentiment.title.slice(1)}
                                </span>
                            </label>
                        </div>
                    );
                })}
            </span>
        </div>
    );
}
