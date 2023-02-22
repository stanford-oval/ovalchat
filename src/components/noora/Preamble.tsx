import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";

export default function Preamble({ module }: any) {
  return (
    <div className="pt-16">
      <div className="container pt-4 pb-6 md:pt-5 md:pb-8">
        <Link href="/dashboard#modules">
          <button className="inline-flex items-center text-gray-700 bg-gray-300 rounded-full p-1 pr-1.5 sm:text-base lg:text-xs hover:text-gray-800">
            <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-factgpt-primary rounded-full">
              {module.title}
            </span>
            <span className="ml-2 text-sm">See all modules</span>
            <ChevronRightIcon
              className="ml-0.5 w-5 h-5 text-gray-500"
              aria-hidden="true"
            />
          </button>
        </Link>
        <h1 className="text-factgpt-secondary font-display text-4xl tracking-tight mt-2">
          Practice with{" "}
          <span className="text-factgpt-primary font-medium">Noora</span>
        </h1>
        <div className="mt-3 text-lg font-base tracking-tight text-gray-700 flex flex-col gap-y-2">
          <p>{module.selectedDesc}</p>

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
