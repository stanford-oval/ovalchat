import React, { useEffect, useRef } from "react";
import handleSubmit from "../../../../../scripts/chatbot/handle-submit";
import TextInput from "./TextInput";
import EvalInput from './EvalInput';
import SelectInput from './SelectInput';

export default function MessageBox({ history, convoState, audioRef }: any) {
  const inputBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      (convoState.value.turn.startsWith("user-answer") &&
        history.value
          .slice(0, Math.min(history.value.length, 10))
          .filter((h: any) => !h.fromChatbot).length > 0) ||
      convoState.value.turn.endsWith("-edit")
    ) {
      // don't autofocus on page load (especially for mobile)
      // hence the history check, but we want to autofocus if microphone used
      if (inputBoxRef.current) inputBoxRef.current.focus();
    }
  }, [convoState.value]);

  return (
    <form
      className="px-2 bg-white rounded-b-md py-2 border-gray-400 border-2"
      id="messageBox"
    >
      {convoState.value.turn.startsWith("user-eval") ?
        <EvalInput convoState={convoState} history={history} handleSubmit={handleSubmit} audioRef={audioRef} />
        : (convoState.value.turn.startsWith("user-select") ?
          <SelectInput convoState={convoState} history={history} handleSubmit={handleSubmit} /> :
          <TextInput convoState={convoState} inputBoxRef={inputBoxRef} handleSubmit={(e: any, message:string) => { handleSubmit(e, convoState, history, message) }} />)}
    </form>
  );
}
