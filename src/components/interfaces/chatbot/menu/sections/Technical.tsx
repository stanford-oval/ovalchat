import React from "react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';

export default function Technical({ convoState }: any) {
  return (
    <div className="px-1 mt-1 text-gray-700">
      <div>
        <span className="font-bold">Current turn: </span>
        {convoState.value.turn}
      </div>
      <div>
        {convoState.value.responseInfo.sessionName && <ResponseInfo ri={convoState.value.responseInfo} />}
      </div>
    </div>
  );
}

function ResponseInfo({ ri }: any) {
  return (
    <div className="mt-1 text-gray-700">
      <div>
        <span className="font-bold">Session ID: </span>
        {ri.sessionName}
      </div>

      <div className="border-gray-300 bg-gray-300 border-1 my-1.5"></div>

      <div className="font-bold">Responses:</div>

      <div className="space-y-1">
        {ri.responses.map((response: any, index: number) => (
          <Response key={index}
            response={{ system: ri.systems[index], response: response }}
            selected={parseInt(ri.rating.substr(ri.rating.length - 1)) == index + 1} />
        ))}
      </div>

      <div className="border-gray-300 bg-gray-300 border-1 mt-2 mb-1.5"></div>

      <div className="italic text-gray-600">See more details in the console.</div>
    </div>
  );
}

function Response({ response, selected }: any) {
  return (
    <div className={clsx("p-2 rounded flex flex-row space-x-2 align-middle", selected ? "bg-green-200" : "bg-red-200")}>
      <FontAwesomeIcon icon={selected ? faCheck : faXmark} className="h-5 w-5 mx-1.5 text-gray-600 my-auto" />
      <div className="flex flex-col">
        <span className="font-bold">{response.system} output: </span>
        {response.response}
      </div>
    </div>
  );
}