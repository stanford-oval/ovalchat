import React from "react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <div className="p-2 bg-red-200 rounded flex flex-row space-x-2 align-middle">
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5 mx-1.5 text-red-600 my-auto" />
          <div className="flex flex-col">
            <span className="font-bold">{ri.systems[0]} output: </span>
            {ri.responses[0]}
          </div>
        </div>
        <div className="p-2 bg-green-200 rounded flex flex-row space-x-2 align-middle">
            <FontAwesomeIcon icon={faCheck} className="h-5 w-5 mx-1.5 text-green-600 my-auto" />
          <div className="flex flex-col">
            <span className="font-bold">{ri.systems[1]} output: </span>
            {ri.responses[1]}
          </div>
        </div>
      </div>

      <div className="border-gray-300 bg-gray-300 border-1 mt-2 mb-1.5"></div>

      <div className="italic text-gray-600">See more details in the console.</div>
    </div>
  );
}