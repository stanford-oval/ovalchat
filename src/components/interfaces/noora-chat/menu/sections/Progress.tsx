import clsx from "clsx";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Progress({ convoState }: any) {
  return (
    <div>
      <div className="mt-2 bg-gray-100 rounded-lg flex flex-col">
        <CheckMarks convoState={convoState} />
        <div className="border-1 border-gray-300 bg-gray-300 w-10/12 mx-auto"></div>
        <div className="flex flex-row justify-center py-2 text-center">
          {[
            {
              units: "scenarios",
              num: convoState.value.progress.length,
              denom: convoState.value.numProblems,
            },
            {
              units: "correct",
              num: convoState.value.progress.filter((p: any) => p.goodAnswer)
                .length,
              denom: convoState.value.progress.length,
            },
          ].map((x) => (
            <div className="px-3" key={x.units}>
              <span className="font-bold text-3xl text-factgpt-primary">
                {x.num}
              </span>
              <span className="font-normal text-sm text-gray-400">
                /{x.denom}
              </span>
              <div className="text-gray-400 -mt-1">{x.units}</div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

function CheckMarks({ convoState }: any) {
  return (
    <div className="mx-auto flex flex-row flex-wrap justify-center py-2">
      {[...Array.from(Array(convoState.value.numProblems).keys())].map((i: number) => {
        const baseStyles =
          "h-10 w-10 rounded-full flex items-center justify-center border-2";
        const wrongStyles = "bg-red-400 text-white border-red-600";
        const correctStyles = "bg-green-400 text-white border-green-600";
        const notDoneStyles =
          "bg-white border-dashed border-gray-400 text-gray-400";

        let addedStyles = notDoneStyles;
        let icon = <span>{i + 1}</span>;
        if (convoState.value.progress.length > i) {
          if (convoState.value.progress[i].goodAnswer) {
            icon = <FontAwesomeIcon icon={faCheck} className="h-6 w-6" />;
            addedStyles = correctStyles;
          } else {
            icon = <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />;
            addedStyles = wrongStyles;
          }
        }

        return (
          <div className="p-1" key={i}>
            <div className={clsx(baseStyles, addedStyles)}>{icon}</div>
          </div>
        );
      })}
    </div>
  );
}
