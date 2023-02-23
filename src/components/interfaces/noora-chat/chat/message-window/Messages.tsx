import React, { useRef, useEffect } from "react";
import Message from "./Message";
import MicrophoneInfo from "./initial-messages/MicrophoneInfo";
import Instructions from "./initial-messages/Instructions";

export default function Messages({ history, convoState, currModule}: any) {
  const messagesBottom = useRef<HTMLDivElement>(null);
  let activeModules = convoState.value.modules.filter((m: any) => m.active);
  let audioRef = useRef();

  audioRef.current = convoState.value.audio;

  if (currModule != 'general' && currModule != 'work') {
    history.value[1] = {
      id: -2,
      show: true,
      fromNoora: true,
      text: `Imagine that I am your ${activeModules.length == 1 && activeModules[0].title == "work"
        ? "co-worker"
        : "friend"
        }.`,
    };

    history.value[3] = {
      id: -4,
      show: true,
      fromNoora: true,
      component: Instructions(activeModules).text,
      read: Instructions(activeModules).speech,
    };
  }

  useEffect(() => {
    // if (history.value.length > 0) return; // only run this on first render
    history.value[0] = {
      id: -1,
      show: true,
      fromNoora: true,
      text: "Hi! I am Noora.",
      read: "Hi. I am Nora.",
      style: "cheerful"
    };
    history.value[1] = {
      id: -2,
      show: true,
      fromNoora: true,
      text: `Imagine that I am your ${activeModules.length == 1 && activeModules[0].title == "work"
        ? "co-worker"
        : "friend"
        }.`,
    };
    history.value[2] = {
      id: -3,
      fromNoora: true,
      show: true,
      component: <MicrophoneInfo />,
      read: "You can tap on the microphone button to start speaking. When you're done talking, click it again. Click the audio button to hear my replies"
    };
    history.value[3] = {
      id: -4,
      show: true,
      fromNoora: true,
      component: Instructions(activeModules).text,
      read: Instructions(activeModules).speech,
    };
    history.value[4] = {
        id: -6,
        fromNoora: true,
        show: true,
        text: "Are you ready to begin?",
    };
    convoState.setValue((cs: any) => ({ ...cs, turn: "user-answer-start" }));
  }, []);

  // scrolling
  useEffect(() => {
    setTimeout(() => {
      if (messagesBottom.current)
        if (
          history.value
            .slice(0, Math.min(history.value.length, 10))
            .filter((h: any) => !h.fromNoora).length > 0
        )
          messagesBottom.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
    }, 5);
  }, [history.value]);

  return (
    <div
      className="bg-white border-x-2 border-gray-400 p-2 overflow-y-auto pretty-scroll"
      id="chat-window"
    >
      <ul>
        {history.value.map((message: any) => (
          <Message message={message} audioRef={audioRef} convoState={convoState} key={message.id} />
        ))}
        {(!convoState.value.turn.startsWith("user") && !convoState.value.turn.includes("read")) && (
          <div
            className={
              "rounded-3xl w-fit px-4 py-3 mt-1.5 max-w-xs break-words bg-gray-200 mr-auto"
            }
          >
            <div className="px-3 py-1">
              <div className="snippet" data-title=".dot-flashing">
                <div className="stage">
                  <div className="dot-flashing" />
                </div>
              </div>
            </div>
          </div>
        )}
      </ul>
      <div className="-mb-20 invisible text-xs" ref={messagesBottom}>
        .
      </div>
    </div>
  );
}
