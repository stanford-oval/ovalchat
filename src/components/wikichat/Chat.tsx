import React, { useState, useEffect } from "react";
import Chatbox from "../interfaces/chatbot/chat/Chatbox";
import DesktopMenu from "../interfaces/chatbot/menu/DesktopMenu";
import { useRouter } from 'next/router';
import getUniqueId from '../../scripts/utils/unique-id';

export default function Chat({ autoPickMode, showSideBar, showHeader }: any) {

  const router = useRouter();

  const [h, setH] = useState([]);

  const key = router.asPath.match(new RegExp(`[&?]experiment_id=(.*)(&|$)`));

  

  const [cs, setCs] = useState({
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
      systems: ["generate", "retrieve_and_generate"],
    },
    autoPickMode: autoPickMode,
  });

  useEffect(() => {
    var experiment_id: string;
    if (key && key[0]) {
      // extract the experiment_id from the URL
      experiment_id = key[0].replace("?experiment_id=", "")
    } else {
      // default value if not provided in the URL
      experiment_id = getUniqueId();
      if (!autoPickMode) {
        router.push(router.asPath + "?experiment_id=" + experiment_id);
        return
      }
    }

    // set experimentId
    convoState.setValue((cs: any) => ({
      ...cs,
      responseInfo: {
        ...cs.responseInfo,
        experimentId: experiment_id,
      },
    }));
    
    // set the dialogId if not already set
    convoState.setValue((cs: any) => ({
        ...cs,
        responseInfo: {
          ...cs.responseInfo,
          dialogId: getUniqueId(),
        },
    }));

    
    
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
          <Chatbox history={history} convoState={convoState} showHeader={showHeader}/>
        </div>
        {showSideBar &&
          <div className="basis-auto md:basis-5/12 lg:basis-1/4 w-fit mx-auto md:min-h-full"><DesktopMenu convoState={convoState} /></div>
        }
      </div>
    </div>
  );
}