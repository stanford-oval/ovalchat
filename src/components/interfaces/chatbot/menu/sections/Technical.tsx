import React from "react";


export default function Technical({ convoState }: any) {
  return (
    <div className="px-2 mt-1 text-gray-900">
      <div>
        <span className="font-bold">Current turn: </span>
        {convoState.value.turn}
      </div>
      <div>
        <div className="mt-1 text-gray-900">
          <div>
            <span className="font-bold">Experiment ID: </span>
            {convoState.value.responseInfo.experimentId}
          </div>
          {convoState.value.responseInfo.dialogId && <div>
            <span className="font-bold">Dialog ID: </span>
            {convoState.value.responseInfo.dialogId}
          </div>}
          <div> <span className="font-bold">Turn ID: </span>
            {convoState.value.responseInfo.turnId}</div>

        </div>
        
      </div>
    </div>
  );
}