import React from "react";
import { Transition } from "@headlessui/react";

export default function DisclosureTransition({ children }: any) {
  return (
    <Transition
      enter="transition duration-300 ease-out"
      enterFrom="transform scale-80 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-80 opacity-0"
    >
      {children}
    </Transition>
  );
}
