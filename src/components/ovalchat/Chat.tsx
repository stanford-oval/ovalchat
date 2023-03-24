import React, { useState, useEffect } from "react";
import Chatbox from "../interfaces/chatbot/chat/Chatbox";
import DesktopMenu from "../interfaces/chatbot/menu/DesktopMenu";
import { useRouter } from 'next/router';
import getUniqueId from '../../scripts/utils/unique-id';
import shuffleArray from "../../scripts/utils/shuffle-array";
import { allAvailableSystems } from "../global/branding";

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
      preferredResponseIdx: null,
      systems: [], // the systems used to obtain responses, in the same order
    },
    allAvailableSystems: allAvailableSystems(),
    selectedSystem: null,
    autoPickMode: autoPickMode,
    finishedJob: false // whether the crowdsourcing job has finished
  });

  useEffect(() => {
    var experiment_id: string;
    if (key && key[0]) {
      // extract the experiment_id from the URL
      experiment_id = key[0].replace("?experiment_id=", "")
    } else {
      // default value if not provided in the URL
      experiment_id = "default-experiment"
      if (!autoPickMode) {
        router.replace(router.asPath + "?experiment_id=" + experiment_id);
      }

    }

    if (!cs.autoPickMode) {
      // shuffle the systems so that the order users see them is random
      convoState.setValue((cs: any) => ({
        ...cs,
        responseInfo: {
          ...cs.responseInfo,
          systems: shuffleArray(cs.allAvailableSystems),
        },
      }));
    }
    else {
      // just initialize the systems
      convoState.setValue((cs: any) => ({
        ...cs,
        responseInfo: {
          ...cs.responseInfo,
          systems: [...cs.allAvailableSystems],
        },
      }));
    }

    // set the default selectedSystem
    convoState.setValue((cs: any) => ({
      ...cs,
      selectedSystem: cs.allAvailableSystems[0]
    }));


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
    <div className="py-4 container flex items-stretch flex-col md:flex-row justify-center md:space-x-2 space-y-2 md:space-y-0">
      <div className="basis-3/4 w-full mx-auto min-h-full">
        <Chatbox history={history} convoState={convoState} showHeader={showHeader} />
      </div>
      {true &&
        <div className="w-1/4 mx-auto min-h-full"><DesktopMenu convoState={convoState} /></div>
      }
    </div>
  );
}