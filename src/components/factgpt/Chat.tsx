import React, { useState, useEffect } from "react";
import NooraChat from "../interfaces/noora-chat/chat/NooraChat";
import DesktopMenu from "../interfaces/noora-chat/menu/DesktopMenu";
import Summary from "../interfaces/noora-chat/summary/Summary";

export default function Chat() {
  const [h, setH] = useState([]);

  const [cs, setCs] = useState({
    draft: "",
    turn: "user-answer-start",
    model: {
      name: "text-davinci-002",
      temperature: 0.9,
      frequencyPenalty: 0.6,
      presencePenalty: 0.5,
      goodReplyThreshold: 0.5,
    },
    progress: [],
    audio: {
      player: null,
      messageId: null,
      autoPlaying: false,
      shouldAutoPlay: false,
    },
    numProblems: 10,
    sentiments: [
      { title: "positive", active: true },
      { title: "neutral", active: true },
      { title: "negative", active: true },
    ]
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
          {convoState.value.turn == "summary" ? (
            <Summary history={history} convoState={convoState} />
          ) : (
            <NooraChat history={history} convoState={convoState} />
          )}
        </div>
        <div className="basis-auto md:basis-5/12 lg:basis-1/4 w-full mx-auto md:min-h-full">
          <DesktopMenu convoState={convoState} />
        </div>
      </div>
    </div>
  );
}