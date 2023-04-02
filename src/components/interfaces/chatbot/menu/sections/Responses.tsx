import React from "react";
import { faCheck, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import { Disclosure } from '@headlessui/react';
import DisclosureTransition from '../../../../global/utility/DisclosureTransition';
import { ChevronUpIcon } from '@heroicons/react/solid';

export default function Responses({ convoState }: any) {
    return (
        <div className="px-2 mt-1 text-gray-900">
            {convoState.value.responseInfo.responses.length > 0 && 
          <ResponseInfo convoState={convoState} />
        }
        </div>
    );
}

function ResponseInfo({ convoState }: any) {
    const ri = convoState.value.responseInfo
    const autoPickMode = convoState.value.autoPickMode
    const allAvailableSystems = convoState.value.allAvailableSystems
    return (
      <div >
        <div className="space-y-1 mt-0.5">
          {ri.responses.map((response: any, index: number) => {
            let status = ri.preferredResponseIdx ? (ri.preferredResponseIdx == index ? "selected" : "rejected") : "unrated";
            return (
              <Response key={index}
                response={response}
                system={autoPickMode ? null : allAvailableSystems[index]}
                logObject={ri.logObjects[index]}
                status={status}
                naturalnessRating={ri.naturalnessRatings.length > index ? ri.naturalnessRatings[index] : null}
              />
            )
          })}
        </div>
      </div>
    );
  }
  
  function Response({ response, system, logObject, status, naturalnessRating }: any) {
    let icon = faQuestion;
    let bgColor = "bg-gray-200"
    let textColor = "text-gray-600"
    if (status == "selected") {
      icon = faCheck;
      bgColor = "bg-green-200"
      textColor = "text-green-600"
    } else if (status == "rejected") {
      icon = faXmark;
      bgColor = "bg-gray-200"
      textColor = "text-red-600"
      return <></>
    }
    return (
      <div className={clsx("p-2 rounded flex flex-row space-x-2 align-middle max-w-full", bgColor)}>
        { false && // naturalnessRating === null &&
        <div className={clsx("flex flex-col justify-center align-middle text-center", textColor)}>
          <FontAwesomeIcon icon={icon} className={clsx("h-5 w-5 mx-1.5 my-1", textColor)} />
          <span className="text-xs"><b>{naturalnessRating}</b>/5</span>
        </div>
        }
        <div className="flex flex-col text-xs break-words max-w-full">
          {system &&
            <span className="font-bold">"{system}":</span>
          }
          {response}
          {logObject && <Disclosure defaultOpen={false}>
            {({ open }) => (
              <div className="mt-2">
                <Disclosure.Button className="flex rounded-lg text-left font-medium text-gray-600 focus:outline-none">
                  <span>Log object</span>
                  <ChevronUpIcon
                    className={`${open ? "transform" : "rotate-180"
                      } h-4 w-4 text-gray-600`}
                  />
                </Disclosure.Button>
                <DisclosureTransition>
                  <Disclosure.Panel className="text-gray-500">
                    <code className="break-words">{JSON.stringify(logObject, null, 4)}</code>
                  </Disclosure.Panel>
                </DisclosureTransition>{" "}
              </div>
            )}
          </Disclosure>}
        </div>
      </div>
    );
  }