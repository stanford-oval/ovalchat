import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";


import {
  AudioConfig,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer,
} from "microsoft-cognitiveservices-speech-sdk";
import { getTokenOrRefresh } from "../../../scripts/utils/token_util";
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const stopDelay = 250;

export default function Microphone({
  className,
  turn,
  setTurn,
  setText,
  currText,
  convoState,
}: any) {
  const recog = useRef<SpeechRecognizer | null>(null); // doesn't wait for rerender to change
  const [tempDisable, setTempDisable] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (tempDisable) {
      setTimeout(() => {
        setTempDisable(false);
      }, stopDelay); // timing to sync disabled with send button
    }
  }, [tempDisable]);

  // const microphoneHandler = async (recog: SpeechRecognizer, mode: boolean) => {
  //   if (mode) await sttFromMic(turn, setTurn, setText, currText, recog);
  //   else stopSttFromMic(turn, setTurn, currText, setText, recog);
  // };

  return (
    <button
      type="button"
      onClick={(e: any) => {
        e.preventDefault();
        if (!pressed) {
          // stop audio
          if (convoState.value.audio.player) {
            convoState.value.audio.player.pause();
            convoState.value.audio.player.close();
          }
          const initStart = async () => {
            if (recog.current) {
              recog.current.stopContinuousRecognitionAsync();
            }
            recog.current = await initRecognizer();
            await sttFromMic(turn, setTurn, setText, currText, recog.current!);
          };
          initStart();

          setPressed(true);
        } else {
          stopSttFromMic(turn, setTurn, currText, setText, recog.current!);
          setTempDisable(true);

          setPressed(false);
        }
      }}
      disabled={
        turn.includes("read") || turn.includes("rate-reply") || tempDisable
      }
      className={className}
    >
      <FontAwesomeIcon icon={!pressed ? faMicrophone : faStop} className="w-4 h-4 text-white" />
    </button>
  );
}

async function initRecognizer(): Promise<SpeechRecognizer> {
  const tokenObj = await getTokenOrRefresh();

  const speechConfig = SpeechConfig.fromAuthorizationToken(
    tokenObj.authToken,
    tokenObj.region
  );
  speechConfig.speechRecognitionLanguage = "en-US";

  const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
  const recognizer: SpeechRecognizer = new SpeechRecognizer(
    speechConfig,
    audioConfig
  );
  return recognizer;
}

async function sttFromMic(
  turn: string,
  setTurn: any,
  setText: any,
  currText: string,
  recognizer: SpeechRecognizer
) {
  if (turn.startsWith("user")) setTurn("user-answer-microphone");
  else return;

  setText("")

  recognizer.startContinuousRecognitionAsync();

  // function keeps running when text is recognized, keeping recogText out to keep updating
  let recogText = "";
  recognizer.recognized = function (_, e) {
    if (e.result.reason != sdk.ResultReason.NoMatch) {
      console.log("recognizing");
      recogText = formatText(e.result.text, recogText);
      setText(recogText);
    }
  };
}

async function stopSttFromMic(
  turn: any,
  setTurn: any,
  currText: string,
  setText: any,
  recognizer: SpeechRecognizer
) {
  await setTimeout(() => {
    setTurn("user-answer-edit");
    recognizer.stopContinuousRecognitionAsync();
  }, stopDelay);
}

function formatText(text: string, curr: string): string {
  curr = curr.trim();
  text = text.trim();

  if (text != "") {
    if (curr != "") text = " " + text;
  }
  return (curr + text).trim();
}
