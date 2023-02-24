import React from "react";

export default function Technical({ convoState }: any) {
  return (
    <div className="px-1 mt-1 text-gray-700">
      <div>
        <span className="font-bold">Current turn: </span>
        {convoState.value.turn}
        {convoState.value.responseInfo.sessionName}
      </div>
    </div>
  );
}