import React from "react";

export default function Technical({ convoState }: any) {
  return (
    <div className="px-1 mt-1 text-gray-700">
      <div>
        <span className="font-bold">Current turn: </span>
        {convoState.value.turn}
      </div>
      <NoorasMessageDetails convoState={convoState} />
    </div>
  );
}

function NoorasMessageDetails({ convoState }: any) {
  if (convoState.value.progress.length == 0) return <div></div>;
  let lastProblem =
    convoState.value.progress[convoState.value.progress.length - 1];
  return (
    <div>
      <div className="border-gray-300 bg-gray-300 border-1 my-1.5"></div>
      <div>
        <b>Problem {convoState.value.progress.length}: </b>
        <span className="font-bold text-factgpt-primary">
          {(lastProblem.goodReplyConfidence.toFixed(5) * 100).toFixed(2)}%
        </span>{" "}
        (
        {lastProblem.goodReplyConfidence > lastProblem.goodReplyThreshold ? (
          <span className="font-bold text-green-600">
            &#62; {lastProblem.goodReplyThreshold}
          </span>
        ) : (
          <span className="font-bold text-red-600">
            &#60; {lastProblem.goodReplyThreshold}
          </span>
        )}
        ) confident that the reply was a good one.
      </div>
    </div>
  );
}

function Slider({ parameter, convoState }: any) {
  return (
    <div>
      <div className="flex items-stretch mt-1">
        <label htmlFor={parameter.propertyName} className="font-bold">
          {parameter.name}:
        </label>
        <div className="ml-auto">
          {convoState.value.model[parameter.propertyName]}
        </div>
      </div>
      {parameter.description && (
        <div className="text-gray-500 text-xs">({parameter.description})</div>
      )}
      <input
        id={parameter.propertyName}
        type="range"
        disabled={!convoState.value.turn.startsWith("user")}
        min={parameter.min}
        max={parameter.max}
        defaultValue={convoState.value.model[parameter.propertyName]}
        onChange={(e: any) => {
          convoState.setValue((cs: any) => ({
            ...cs,
            model: {
              ...cs.model,
              [parameter.propertyName]: Number(e.target.value),
            },
          }));
        }}
        step="0.01"
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 gray-slider-thumb"
      />
    </div>
  );
}
