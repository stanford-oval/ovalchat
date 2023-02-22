import React from "react";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import AttemptHistory from "./AttemptHistory";

export default function ProgressSummary() {
  return (
    <div>
      <div className="pb-4 text-slate-700 flex flex-col gap-y-2">
        <h1 className="inline font-bold text-factgpt-secondary font-display text-3xl tracking-tight">
          Practice your{" "}
          <span className="special-underline">social conversation</span>.
        </h1>
        <p>
          Noora helps you practice challenging aspects of social conversation, such as{" "}
          <b>responding empathetically and positively to others</b>.
        </p>
      </div>
      <div id="progress" className="grid grid-cols-12">
        <div className="col-span-12 flex flex-col sm:flex-row gap-y-4 text-center sm:text-left justify-between items-center text-white  px-5 py-6 bg-factgpt-primary rounded-lg bg-gradient-to-br from-factgpt-primary-light via-factgpt-primary to-factgpt-secondary-bright">
          <div>
            <h1 className="text-2xl font-bold">Up Next</h1>
            <p className="text-lg">
              Practice responding to <b>Empathy</b> statements.
            </p>
          </div>
          <div>
            <Link href="/noora?module=general">
              <button className="pulse-button-light uppercase rounded-full outline-none px-5 py-3 flex text-md text-factgpt-secondary bg-white hover:bg-gray-100 font-medium">
                Practice
                <ArrowSmRightIcon className="h-6 w-6 ml-1.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <AttemptHistory />
    </div>
  );
}
