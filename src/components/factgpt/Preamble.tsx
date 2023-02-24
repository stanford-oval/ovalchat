import React from "react";

export default function Preamble() {
  return (
    <div className="pt-16">
      <div className="container pt-4 pb-6 md:pt-5 md:pb-8">
        <h1 className="text-factgpt-secondary font-display text-4xl tracking-tight mt-2">
          Help improve{" "}
          <span className="text-factgpt-primary font-medium">FactGPT</span>
        </h1>
        <div className="mt-3 text-lg font-base tracking-tight text-gray-700 flex flex-col gap-y-2">
          <p>Contribute to FactGPT by picking the best reply option and evaluating replies.</p>
        </div>
      </div>
    </div>
  );
}
