import React, { useState, useEffect } from "react";
import Chatbox from "../interfaces/chatbot/chat/Chatbox";
import DesktopMenu from "../interfaces/chatbot/menu/DesktopMenu";
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function Chat({ autoPickMode }: any) {

  const router = useRouter();

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
      logObjects: [],
      naturalnessRatings: [],
      experimentId: null,
      dialogId: null,
      turnId: 0,
      rating: null,
      systems: ["gpt3_correction", "gpt3_repeat_generation"],
    },
    autoPickMode: autoPickMode,
  });

  useEffect(() => {
    const key = router.asPath.match(new RegExp(`[&?]experiment_id=(.*)(&|$)`));
    let id = uuidv4()

    if (key && key[0]) {
      id = key[0].replace("?experiment_id=", "")
    } else {
      if (!autoPickMode) {
        router.push(router.asPath + "?experiment_id=" + id);
        return
      }
    }
    setCs((cs) => ({ ...cs, responseInfo: { ...cs.responseInfo, experimentId: id } }));
  }, [router.query]);

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