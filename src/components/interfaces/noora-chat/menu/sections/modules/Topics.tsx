import React from "react";
import { clsx } from "clsx";
import { PlusIcon } from "@heroicons/react/solid";

export default
    function Topics({ convoState }: any) {
        let modulesToUse = convoState.value.modules;
        if (["Empathy: General", "Empathy: Work Setting"].includes(convoState.value.modules.filter((m: any) => m.active)[0].displayName)) {
            modulesToUse = modulesToUse.filter((m: any) => (m.displayName == "Empathy: General" || m.displayName == "Empathy: Work Setting"));
        }
        else {
            modulesToUse = modulesToUse.filter((m: any) => (m.displayName != "Empathy: General" && m.displayName != "Empathy: Work Setting"));
        }
    return (
        <div>
            Topics:{" "}
            <span className="space-x-1 space-y-1">
                {modulesToUse
                    // .sort((m1: any, m2: any) => (m2.active && !m1.active ? 1 : -1))
                    .map((module: any) => {
                        return (
                            <button
                                disabled={
                                    convoState.value.modules.filter((m: any) => m.active)
                                        .length == 1 && module.active
                                }
                                onClick={() => {
                                    // toggle category active/inactive
                                    let newModules = convoState.value.modules.map((m: any) => {
                                        if (m.title == module.title)
                                            return { title: m.title, displayName: m.displayName, active: !m.active };
                                        else return m;
                                    });
                                    convoState.setValue((cs: any) => ({
                                        ...cs,
                                        modules: newModules,
                                    }));
                                }}
                                key={module.title}
                                className={clsx(
                                    "group inline-block border-1 items-center px-2 py-0.5 rounded-full text-xs relative",
                                    module.active
                                        ? "bg-purple-100 text-factgpt-primary-dark border-factgpt-primary-dark font-bold"
                                        : "bg-gray-200 border-gray-500 text-gray-600"
                                )}
                            >
                                {module.displayName}{" "}
                                {module.active ? (
                                    <span className="group-disabled:hidden">&#x2715;</span>
                                ) : (
                                    <PlusIcon className="h-3 w-3 mb-0.5 inline-block" />
                                )}
                            </button>
                        );
                    })}
            </span>
        </div>
    );
}