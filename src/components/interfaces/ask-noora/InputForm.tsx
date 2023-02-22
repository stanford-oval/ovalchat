import React, { useRef } from "react";
import generateResult from "../../../scripts/gpt-3/generate-advice";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export default function InputForm({ query, results, resultsQueue }: any) {
  const inputBox = useRef<HTMLInputElement>(null);

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    let statement = query.value.slice();
    query.setValue("");

    if (inputBox.current) inputBox.current.focus();
    let id = uuidv4();
    results.setValue((r: any) => [...r, { id: id, statement: statement }]);

    console.log("Generating result for: " + statement);
    let result = await generateResult(statement, id);
    resultsQueue.setValue([result]);
  };

  return (
    <form className="mt-5 mx-auto max-w-2xl">
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none text-slate-400 z-10">
          <FontAwesomeIcon icon={faComment} className="w-4 h-4" />
        </div>

        <input
          ref={inputBox}
          type="text"
          onChange={(e) => {
            query.setValue(e.target.value);
          }}
          value={query.value}
          placeholder="I finished a great book today!"
          className="block p-4 pl-12 w-full border-2 focus:outline-none border-gray-400 shadow-sm focus:ring-0 focus:border-factgpt-primary sm:text-sm rounded-full text-slate-800"
        />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={query.value.length == 0}
          className="text-white absolute right-2.5 bottom-3 md:bottom-2.5 bg-factgpt-primary hover:bg-factgpt-primary-dark disabled:bg-slate-400 focus:outline-none font-medium rounded-full text-sm px-4 py-2"
        >
          Go
        </button>
      </div>
    </form>
  );
}
