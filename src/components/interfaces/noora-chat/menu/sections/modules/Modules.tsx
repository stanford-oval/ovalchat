import React from "react";
import Topics from "./Topics";
import Sentiments from "./Sentiments";

export default function Modules({ convoState }: any) {
  return (
    <div className="space-y-1 pt-3 pb-1 px-1">
      <Topics convoState={convoState} />
      {(convoState.value.questionType == "old") && <Sentiments convoState={convoState} />}
    </div>
  );
}
// (questionTypeMap[convoState[0].title == OLD) && <Sentiments convoState={convoState} />;
