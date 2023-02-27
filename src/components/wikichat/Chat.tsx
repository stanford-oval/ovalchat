import React, { useState } from "react";
import Chatbox from "../interfaces/chatbot/chat/Chatbox";
import DesktopMenu from "../interfaces/chatbot/menu/DesktopMenu";

export default function Chat({ autoPickMode }: any) {
  const [h, setH] = useState([]);

  const [cs, setCs] = useState({
    draft: "",
    turn: "user-answer-start",
    audio: {
      player: null,
      messageId: null,
      autoPlaying: false,
      shouldAutoPlay: false,
    },
    responseInfo: {
      responses: [],
      dialog_states: [],
      sessionName: null,
      systems: ["gpt3_correction", "gpt3_repeat_generation"],
    },
    autoPickMode: autoPickMode,
  });

  const history = {
    value: h,
    setValue: setH,
  };

  const convoState = {
    value: cs,
    setValue: setCs,
  };


  return (
    <div id="homeChat">
      <div className="py-4 container flex items-stretch flex-col md:flex-row justify-center md:space-x-2 space-y-2 md:space-y-0">
        <div className="basis-auto md:basis-7/12  lg:basis-3/4 w-full mx-auto">
          <Chatbox history={history} convoState={convoState} />
        </div>
        <div className="basis-auto md:basis-5/12 lg:basis-1/4 w-full mx-auto md:min-h-full">
          <DesktopMenu convoState={convoState} />
        </div>
      </div>
    </div>
  );
}