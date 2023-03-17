import React, { useEffect, useRef } from "react";
import MessageBox from "./message-box/MessageBox";
import Header from "./Header";
import Messages from "./message-window/Messages";
import { textToSpeech } from "../../speech/SpeechSynthesizer";
import { messageToSpeechParams } from '../../../../scripts/chatbot/audio_utils';

export default function Chatbox({
  convoState,
  history,
  showHeader
}: any) {
  let audioRef = useRef()

  audioRef.current = convoState.value.audio

  useEffect(() => {
    return () => {
      // on component unmount
      const player = (audioRef.current as any).player as any
      if (player) {
        player.pause()
        player.close()
      }
    }
  }, [])

  useEffect(() => {
    if (!convoState.value.audio.shouldAutoPlay) {
      // autoplay is false, so we can show all the messages at once
      convoState.setValue((cs: any) => ({ ...cs, turn: convoState.value.turn.split("-wikichat-reads")[0], audio: { ...cs.audio, autoPlaying: false } }))
      // stop audio
      if (convoState.value.audio.player && convoState.autoPlaying) {
        convoState.value.audio.player.pause()
        convoState.value.audio.player.close()
      }
      let idxHidden = history.value.findIndex((m: any) => !m.show);

      if (idxHidden == -1)
        return;

      let item = history.value[idxHidden]

      history.setValue((h: any) => {
        return h.map((m: any) => {
          if (m.id == item.id)
            return { ...item, show: true } // show the message
          else
            return m
        })
      })

      return;
    }

    // TODO: add comments
    // autoplay occurs here

    if (convoState.value.audio.autoPlaying)
      return;

    let idxHidden = history.value.findIndex((m: any) => !m.show);

    if (idxHidden == -1) {
      convoState.setValue((cs: any) => ({ ...cs, turn: convoState.value.turn.split("-wikichat-reads")[0] }))
      return;
    }

    convoState.setValue((cs: any) => ({ ...cs, turn: convoState.value.turn.split("-wikichat-reads")[0] + "-wikichat-reads" }))

    let item = history.value[idxHidden]

    const prevFromUser = !history.value[idxHidden - 1].fromChatbot

    if (prevFromUser) {
      let hidden = history.value.filter((m: any) => !m.show);
      const props = messageToSpeechParams(convoState, item, audioRef, history, hidden)
      textToSpeech(props)

      history.setValue((h: any) => {
        return h.map((m: any) => {
          if (m.id == item.id)
            return { ...item, show: true }
          else
            return m
        })
      })
      convoState.setValue((cs: any) => ({ ...cs, audio: { ...cs.audio, autoPlaying: true } }))
    }

  }, [history.value, convoState.value.audio.shouldAutoPlay])

  const messagesBottom = useRef<HTMLDivElement>(null);

  return (
    <div>
      {showHeader &&
       <Header />
      }
      <Messages history={history} convoState={convoState} messagesBottom={messagesBottom} />
      <MessageBox
        history={history}
        convoState={convoState}
        audioRef={audioRef}
        messagesBottom={messagesBottom}
      />
    </div>
  );
}
