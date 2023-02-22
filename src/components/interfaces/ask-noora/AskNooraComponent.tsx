import React, { useEffect } from "react";
import InputForm from "./InputForm";
import Result from "./Result";

export default function AskNooraComponent({
  query,
  results,
  resultsQueue,
}: any) {
  useEffect(() => {
    // on queue change, update the right element
    resultsQueue.value.forEach((result: any) => {
      const newResults: any[] = results.value.map((r: any) => {
        if (r.id == result.id) return result;
        else return r;
      });

      results.setValue(newResults);
      resultsQueue.setValue([]); // empty queue
    });
  }, [resultsQueue.value]);

  return (
    <div>
      <div
        className="pt-16 bg-cover bg-no-repeat bg-center overflow-hidden"
        id="askNooraHero"
      >
        <div className="pt-12 pb-32">
          <div className="container text-center justify-center">
            <p className="inline leading-tight bg-gradient-to-r from-factgpt-primary-dark1 via-factgpt-primary-dark2 to-factgpt-secondary bg-clip-text font-bold text-5xl tracking-tight text-transparent">
              Ask Noora
            </p>
            <h2 className="mt-3 text-2xl max-w-lg tracking-tight text-slate-800 mx-auto">
              Don&apos;t know how to reply to something?
              <br />
              Noora can help advise you.
            </h2>
            <InputForm
              query={query}
              results={results}
              resultsQueue={resultsQueue}
            />
          </div>
        </div>
      </div>
      <div className="container -mt-32 py-6">
        <ul>
          {results.value
            .slice(0)
            .reverse()
            .map((result: any) => (
              <li key={result.id}>
                <Result
                  id={result.id}
                  statement={result.statement}
                  explanation={result.explanation}
                  reply={result.reply}
                  results={results}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
