import React from "react";
import { clsx } from "clsx";

export default function Result({
  statement,
  explanation,
  reply,
  id,
  results,
}: ResultProps) {
  return (
    <div
      className={clsx(
        "mb-2 rounded-md border-2 p-5 relative shadow-md",
        id == -1 ? "bg-gray-100 border-gray-400" : "bg-white border-gray-300"
      )}
    >
      {id != -1 && (
        <button
          onClick={() => {
            // remove
            let newResults = results.value.filter((r: any) => r.id !== id);
            results.setValue(newResults);
          }}
          className="absolute top-2 right-2.5 text-gray-500 rounded-full h-6 w-6 focus:bg-gray-200 bg-white focus:text-gray-700"
        >
          &#x2715;
        </button>
      )}
      <div
        className={clsx(
          "w-full border-b-2 mb-2 pb-2 font-medium text-slate-800 text-xl md:text-2xl text-center px-5",
          id == -1 ? "border-gray-400" : "border-gray-300"
        )}
      >
        &ldquo;{statement}&rdquo;
        {id == -1 && (
          <span className="block mt-3 mx-auto max-w-fit md:inline-flex relative md:ml-3 -top-1 items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-factgpt-primary-dark border-1 border-factgpt-primary-dark">
            EXAMPLE
          </span>
        )}
      </div>
      {reply ? (
        <div className="text-center mt-3 text-lg text-gray-600 max-w-4xl mx-auto">
          {explanation} <br />
          For example: <span className="text-factgpt-primary font-bold inline-block mt-1">“{reply}”</span>
        </div>
      ) : (
        <div className="text-center text-slate-500">
          Give Noora a few seconds to think...
        </div>
      )}
    </div>
  );
}

type ResultProps = {
  statement: string;
  explanation: string;
  reply: string;
  id: number;
  results: any;
};
