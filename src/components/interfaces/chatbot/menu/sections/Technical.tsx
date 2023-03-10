import React from "react";
import { faCheck, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import { Disclosure } from '@headlessui/react';
import DisclosureTransition from '../../../../global/utility/DisclosureTransition';
import { ChevronUpIcon } from '@heroicons/react/solid';

export default function Technical({ convoState }: any) {
  return (
    <div className="px-1 mt-1 text-gray-900">
      <div>
        <span className="font-bold">Current turn: </span>
        {convoState.value.turn}
      </div>
      <div>
        <div className="mt-1 text-gray-900">
          <div>
            <span className="font-bold">Experiment ID: </span>
            {convoState.value.responseInfo.experimentId}
          </div>
          {convoState.value.responseInfo.dialogId && <div>
            <span className="font-bold">Dialog ID: </span>
            {convoState.value.responseInfo.dialogId}
          </div>}
          <div> <span className="font-bold">Turn ID: </span>
            {convoState.value.responseInfo.turnId}</div>

        </div>
        {convoState.value.responseInfo.responses.length > 0 && <ResponseInfo ri={convoState.value.responseInfo} />}
      </div>
    </div>
  );
}

function ResponseInfo({ ri }: any) {
  return (
    <div >

      <div className="border-gray-300 bg-gray-300 border-1 my-1.5"></div>

      <div className="font-bold">Responses:</div>

      <div className="space-y-1 mt-0.5">
        {ri.responses.map((response: any, index: number) => {
          let status = ri.rating ? (parseInt(ri.rating.substr(ri.rating.length - 1)) == index + 1 ? "selected" : "rejected") : "unrated";
          return (
            <Response key={index}
              response={{ system: ri.systems[index], response: response }}
              logObject={ri.logObjects[index]}
              status={status}
              naturalnessRating={ri.naturalnessRatings.length > index ? ri.naturalnessRatings[index] : "?"}
            />
          )
        })}
      </div>
    </div>
  );
}

function Response({ response, logObject, status, naturalnessRating }: any) {
  let icon = faQuestion;
  let bgColor = "bg-gray-200"
  let textColor = "text-gray-600"
  if (status == "selected") {
    icon = faCheck;
    bgColor = "bg-green-200"
    textColor = "text-green-600"
  } else if (status == "rejected") {
    icon = faXmark;
    bgColor = "bg-red-200"
    textColor = "text-red-600"
  }
  return (
    <div className={clsx("p-2 rounded flex flex-row space-x-2 align-middle", bgColor)}>
      <div className={clsx("flex flex-col justify-center align-middle text-center", textColor)}>
        <FontAwesomeIcon icon={icon} className={clsx("h-5 w-5 mx-1.5 my-1", textColor)} />
        <span className="text-xs"><b>{naturalnessRating}</b>/5</span>
      </div>
      <div className="flex flex-col text-xs">
        <span className="font-bold">{response.system} output: </span>
        {response.response}
        {logObject && <Disclosure defaultOpen={false}>
          {({ open }) => (
            <div className="w-full mt-2">
              <Disclosure.Button className="flex w-full rounded-lg text-left font-medium text-gray-600 focus:outline-none">
                <span>Log object</span>
                <ChevronUpIcon
                  className={`${open ? "transform" : "rotate-180"
                    } h-4 w-4 text-gray-600`}
                />
              </Disclosure.Button>
              <DisclosureTransition>
                <Disclosure.Panel className="text-gray-500">
                  <code>{JSON.stringify(logObject)}</code>
                </Disclosure.Panel>
              </DisclosureTransition>{" "}
            </div>
          )}
        </Disclosure>}
      </div>
    </div>
  );
}