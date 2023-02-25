import React from "react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
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
        {convoState.value.responseInfo.sessionName && <ResponseInfo ri={convoState.value.responseInfo} />}
      </div>
    </div>
  );
}

function ResponseInfo({ ri }: any) {
  return (
    <div className="mt-1 text-gray-900">
      <div>
        <span className="font-bold">Session ID: </span>
        {ri.sessionName}
      </div>

      <div className="border-gray-300 bg-gray-300 border-1 my-1.5"></div>

      <div className="font-bold">Responses:</div>

      <div className="space-y-1 mt-0.5">
        {ri.responses.map((response: any, index: number) => (
          <Response key={index}
            response={{ system: ri.systems[index], response: response }}
            dialogState={ri.dialogStates[index]}
            selected={parseInt(ri.rating.substr(ri.rating.length - 1)) == index + 1} />
        ))}
      </div>
    </div>
  );
}

function Response({ response, dialogState, selected }: any) {
  return (
    <div className={clsx("p-2 rounded flex flex-row space-x-2 align-middle", selected ? "bg-green-200" : "bg-red-200")}>
      <FontAwesomeIcon icon={selected ? faCheck : faXmark} className={clsx("h-5 w-5 mx-1.5 my-auto", selected ? "text-green-600" : "text-red-600")} />
      <div className="flex flex-col text-xs">
        <span className="font-bold">{response.system} output: </span>
        {response.response}
        <Disclosure defaultOpen={false}>
          {({ open }) => (
            <div className="w-full mt-2">
              <Disclosure.Button className="flex w-full rounded-lg text-left font-medium text-gray-600 focus:outline-none">
                <span>Dialog state</span>
                <ChevronUpIcon
                  className={`${open ? "transform" : "rotate-180"
                    } h-4 w-4 text-gray-600`}
                />
              </Disclosure.Button>
              <DisclosureTransition>
                <Disclosure.Panel className="text-gray-500">
                  <code>{JSON.stringify(dialogState)}</code>
                </Disclosure.Panel>
              </DisclosureTransition>{" "}
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}