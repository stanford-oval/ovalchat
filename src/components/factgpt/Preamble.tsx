import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";

export default function Preamble({ module }: any) {
  return (
    <div className="pt-16">
      <div className="container pt-4 pb-6 md:pt-5 md:pb-8">
        <h1 className="text-factgpt-secondary font-display text-4xl tracking-tight mt-2">
          Help improve{" "}
          <span className="text-factgpt-primary font-medium">FactGPT</span>
        </h1>
        <div className="mt-3 text-lg font-base tracking-tight text-gray-700 flex flex-col gap-y-2">
          <p>Contribute to FactGPT by picking the better reply option and evaluating replies.</p>

          {/* <p>
            For example, if Noora says “
            <b className="text-factgpt-primary special-underline">
              {module.example.factgpt}
            </b>
            ,” a good response might be “
            <b className="text-factgpt-secondary-light special-underline">
              {module.example.goodUser}
            </b>
            ” <br />
            <span className="text-gray-500">
              {module.example.goodExplanation}
            </span>
          </p>

          <p>
            If you replied with “
            <b className="text-factgpt-secondary-light special-underline">
              {module.example.badUser}
            </b>
            ,” Noora would give you feedback for improving your reply.
          </p> */}
        </div>
      </div>
    </div>
  );
}
