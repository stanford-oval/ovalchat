import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function Footer({ convoState, history }: any) {
  return (
    <div className="bg-gray-100 border-2 border-gray-400 rounded-b-lg py-4 text-center flex gap-2 justify-center">
      <Link href="/dashboard#progress">
        <button className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-full text-white bg-factgpt-primary hover:bg-factgpt-primary-dark">
          See Your Progress
        </button>
      </Link>
      <button
        onClick={() => {
          // reset
          history.setValue([]);
          convoState.setValue((cs: any) => ({
            ...cs,
            draft: "",
            turn: "user-answer-start",
            numProblems: 10,
            progress: [],
          }));
        }}
        className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-full text-white bg-factgpt-secondary-light hover:bg-factgpt-secondary"
      >
        Try Again
        <FontAwesomeIcon icon={faRepeat} className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
}
