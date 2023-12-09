import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, VolumeUpIcon } from "@heroicons/react/solid";
import Technical from "./sections/Technical";
import Settings from "./sections/Settings";
import DisclosureTransition from "../../../global/utility/DisclosureTransition";
import Responses from "./sections/Responses";
import { chatbotName } from "../../../global/branding";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMicrophone, faRefresh } from "@fortawesome/free-solid-svg-icons";
// import { Switch } from '@headlessui/react'
// import clsx from "clsx";
// import { MenuAlt2Icon } from "@heroicons/react/outline";
// import { isIOS } from 'react-device-detect';

export default function DesktopMenu({ convoState, history, simplified }: any) {
  let sections = [
    {
      title: "Technical",
      component: <Technical convoState={convoState} />,
      defaultHide: true,
    },
    {
      title: "Settings",
      component: <Settings convoState={convoState} />,
      defaultHide: false,
    },
    {
      title: "Responses",
      component: <Responses convoState={convoState} />,
      defaultHide: false,
    },
  ];

  if (simplified) {
    sections = [sections[1]]
  }

  return (
    <div
      id="chat-window"
      className="w-full bg-white border-2 border-gray-400 rounded-md overflow-y-auto pretty-scroll min-h-full"
    >
      {/* <div className="border-b-2 border-gray-400 py-4"> */}
      {/* <div className="text-2xl text-center font-bold text-ovalchat-secondary">
          Menu
        </div> */}
      {/* TODO: fix autoplay */}
      {/* 
        {!isIOS && <div className="text-gray-600 text-center mx-auto mt-1 text-sm">
          <span><MenuAlt2Icon className="h-4 w-4 -mt-0.5 inline-block" /> text-only</span>
          <Switch
            checked={convoState.value.audio.shouldAutoPlay}
            onChange={() => {
              if (convoState.value.audio.autoPlaying) {
                if (convoState.value.audio.player) {
                  convoState.value.audio.player.pause()
                  convoState.value.audio.player.close()
                }
                convoState.setValue((cs: any) => ({ ...cs, audio: { ...cs.audio, player: null, messageId: null, shouldAutoPlay: !cs.audio.shouldAutoPlay, autoPlaying: false } }));
              } else {
                convoState.setValue((cs: any) => ({ ...cs, audio: { ...cs.audio, shouldAutoPlay: !cs.audio.shouldAutoPlay, autoPlaying: false } }));
              }
            }}
            className={clsx(
              convoState.value.audio.shouldAutoPlay ? 'bg-ovalchat-primary' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent mx-1.5 -bottom-0.5 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0'
            )}
          >
            <span
              aria-hidden="true"
              className={clsx(
                convoState.value.audio.shouldAutoPlay ? 'translate-x-4' : 'translate-x-0',
                'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
              )}
            />
          </Switch>
          <span>autoplay <VolumeUpIcon className="h-4 w-4 -mt-0.5 inline-block" /></span>
        </div>} */}

      {/* </div> */}

      <div className="px-2 py-1">
        <div className="flex w-full justify-center">
          <button className="m-2 w-fit justify-between rounded-lg bg-gray-200 text-center text-sm font-medium text-ovalchat-secondary hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 duration-75"
            onClick={() => {
              let started = false
              const messageList = []
              for (let i = 0; i < history.value.length; i++) {
                const fromChatbot = history.value[i]["fromChatbot"]
                if (!started && !fromChatbot) {
                  started = true
                }
                if (started) {
                  let m = history.value[i]["text"];
                  if (fromChatbot)
                    m = chatbotName() + ": " + m
                  else
                    m = "User: " + m
                  messageList.push(m)
                }
              }
              const chatHistory = messageList.join("\n")
              if (navigator.clipboard && window.isSecureContext) {
                // copy the text to clipboard
                navigator.clipboard.writeText(chatHistory)
              }
              else {
                // show an alert instead
                alert(chatHistory)
              }
            }
            }
            title="Copy chat history to clipboard"
          >
            <FontAwesomeIcon
              icon={faCopy}
              className="w-6 h-6 m-3 text-ovalchat-primary inline-block cursor-pointer"
            />
          </button>

          <button className="m-2 w-fit justify-between rounded-lg bg-gray-200 text-center text-sm font-medium text-ovalchat-secondary hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 duration-75"
            onClick={() => {
              window.location.reload();
            }
            }
            title="Start a new conversation"
          >
            <FontAwesomeIcon
              icon={faRefresh}
              className="w-6 h-6 m-3 text-ovalchat-primary inline-block cursor-pointer"
            />
          </button>
        </div>

        {sections.map((section) => (
          <div className="py-1" key={section.title}>
            <Disclosure defaultOpen={!section.defaultHide}>
              {({ open }) => (
                <div className="mx-auto w-full rounded-2xl bg-white py-1">
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-200 px-4 py-2 text-left text-sm font-medium text-ovalchat-secondary hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 duration-75">
                    <span>{section.title}</span>
                    <ChevronUpIcon
                      className={`${open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-gray-500`}
                    />
                  </Disclosure.Button>
                  <DisclosureTransition>
                    <Disclosure.Panel className="text-sm text-gray-500">
                      {section.component}
                    </Disclosure.Panel>
                  </DisclosureTransition>{" "}
                </div>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
}
