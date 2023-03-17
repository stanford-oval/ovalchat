import React, { useEffect, useRef } from "react";
import handleSubmit from "../../../../../scripts/chatbot/handle-submit";
import TextInput from "./TextInput";
import EvalInput from './EvalInput';
import SelectInput from './SelectInput';

export default function MessageBox({ history, convoState, audioRef, messagesBottom }: any) {
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

  useEffect(() => {
    if (messagesBottom.current) {
      if (
        history.value
          .slice(0, Math.min(history.value.length, 10))
          .filter((h: any) => !h.fromChatbot).length > 0
      )
        messagesBottom.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
    }
  });

  return (
    <form
      className="px-2 bg-white rounded-b-md py-2 border-gray-400 border-2"
      id="messageBox"
    >
      {(() => {
        if (convoState.value.turn == "user-eval1") {
          return <EvalInput convoState={convoState} history={history} handleSubmit={handleSubmit} audioRef={audioRef} responseIndex={0} />
        } else if (convoState.value.turn == "user-eval2") {
          return <EvalInput convoState={convoState} history={history} handleSubmit={handleSubmit} audioRef={audioRef} responseIndex={1} />
        }
        else if (convoState.value.turn.startsWith("user-select")) {
          return <SelectInput convoState={convoState} history={history} handleSubmit={handleSubmit} />
        } else {
          return <TextInput convoState={convoState} inputBoxRef={inputBoxRef} handleSubmit={(e: any, message: string) => { handleSubmit(e, convoState, history, message) }} />
        }
      })()}

    </form>
  );
}
