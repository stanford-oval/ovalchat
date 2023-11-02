import React, { useRef, useEffect } from "react";
import Message from "./Message";
import MicrophoneInfo from "./initial-messages/MicrophoneInfo";
import { chatbotName, crowdsourcingMessages, mainPageMessages } from "../../../../global/branding";

export default function Messages({ history, convoState, messagesBottom, showSpeechButton, showMicrophone }: any) {
  let audioRef = useRef();

  audioRef.current = convoState.value.audio;

  useEffect(() => {
    // if (history.value.length > 0) return; // only run this on first render

    if (convoState.value.isHomePage) {
      // for the main page

      history.value.push({
        id: -mainPageMessages().length - 1,
        show: true,
        fromChatbot: true,
        text: "Hi! I'm " + chatbotName() + ".",
        isStatic: true
      });

      if (showMicrophone) {
        // add the microphone message
        history.value.push({
          id: -mainPageMessages().length,
          fromChatbot: true,
          show: true,
          component: <MicrophoneInfo />,
          read: "You can tap on the microphone button to start speaking. When you're done talking, click it again. Click the audio button to hear my replies",
          isStatic: true
        });
      }

      // Add custom messages
      mainPageMessages().forEach((message, index) => {
        history.value.push({
          id: -index,
          show: true,
          fromChatbot: true,
          text: message,
          isStatic: true
        });
      })

    }
    else {
      // for crowdsourcing experiments
      crowdsourcingMessages().forEach((message, index) => {
        history.value.push({
          id: -index,
          show: true,
          fromChatbot: true,
          text: message,
          isStatic: true
        });
      })
    }

    convoState.setValue((cs: any) => ({ ...cs, turn: "user-answer" }));
  }, []);

  // scrolling
  useEffect(() => {
    setTimeout(() => {
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
    }, 200);
  }, [history.value]);

  return (
    <div
      className="bg-white border-x-2 border-t-2 border-gray-400 p-2 overflow-y-auto pretty-scroll h-full"
      id={convoState.value.turn.includes("eval") || convoState.value.turn.includes("select") ? "small-chat-window" : "chat-window"}
    >
      <ul>
        {history.value.map((message: any) => (
          <Message message={message} audioRef={audioRef} convoState={convoState} showSpeechButton={showSpeechButton} key={message.id} />
        ))}
        {(!convoState.value.turn.startsWith("user") && !convoState.value.turn.includes("read")) && (
          // show loading animation
          <div className="rounded-3xl w-fit px-5 py-3 mx-2 mt-1.5 max-w-xs break-words bg-gray-200 mr-auto">
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
