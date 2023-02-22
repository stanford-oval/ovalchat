import React from "react";
import { clsx } from "clsx";

export default function ReplyList({ convoState }: any) {
  return (
    <div
      id="chat-window"
      className="overflow-y-auto pretty-scroll p-2 space-y-2 bg-white border-l-2 border-r-2 border-gray-400"
    >
      {convoState.value.progress.map((problem: any, idx: number) => (
        <div
          key={idx}
          className={clsx(
            "p-3 border-2 rounded-lg flex flex-row items-center",
            problem.goodAnswer
              ? "border-green-700 bg-green-100"
              : "border-red-700 bg-red-100"
          )}
        >
          <div
            className={clsx(
              "flex-fit text-bold pr-4 lg:pr-6 lg:pl-2 text-2xl lg:text-4xl font-bold",
              problem.goodAnswer ? "text-green-700" : "text-red-700"
            )}
          >
            {idx + 1}
          </div>
          <div className="flex-grow">
            <div className="text-slate-600">
              <p>
                <span className="inline-block mr-1">
                  I said, &ldquo;{problem.statement}&rdquo;
                </span>
                {problem.statementCategory.split("/").map((x: string) => (
                  <span
                    key={x}
                    className="inline-block ml-0.5 border-1 items-center px-2 py-0.5 rounded-full text-xs font-normal -top-0.5 relative bg-gray-200 border-gray-600 text-gray-600"
                  >
                    {x}
                  </span>
                ))}
              </p>
              <p>
                You replied,{" "}
                <span className="text-slate-800 text-lg font-bold">
                  &ldquo;{problem.reply}&rdquo;
                </span>
                {problem.replyCategory && (
                  <span className="inline-block mt-2 mx-auto max-w-fit md:inline-flex relative md:ml-2 -top-1 items-center px-3 py-0.5 rounded-full text-sm font-medium bg-slate-200 text-factgpt-secondary-light border-1 border-factgpt-secondary-light">
                    {problem.replyCategory}
                  </span>
                )}
              </p>
            </div>
            <div
              className={clsx(
                "border-1 mx-auto w-full my-2",
                problem.goodAnswer
                  ? "bg-green-400 border-green-400"
                  : "border-red-300 bg-red-300"
              )}
            ></div>
            <div className="text-slate-600 mt-2 font-light">
              <p>
                <i>{problem.explanation}</i>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
