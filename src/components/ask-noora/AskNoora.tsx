import React, { useState } from "react";
import AskNooraComponent from "../interfaces/ask-factgpt/AskNooraComponent";

export default function AskNoora() {
  const [q, setQ] = useState("");
  const [r, setR] = useState([
    {
      id: -1,
      statement: "I just finished a really good book!",
      explanation:
        "You should show them that you are interested in their experiences by asking them about their book.",
      reply: "That's great! What was your favorite part of the book?",
    },
  ]);
  const [rq, setRq] = useState<any[]>([]);

  const query = {
    value: q,
    setValue: setQ,
  };
  const results = {
    value: r,
    setValue: setR,
  };
  const resultsQueue = {
    value: rq,
    setValue: setRq,
  };

  return (
    <div>
      <AskNooraComponent
        query={query}
        results={results}
        resultsQueue={resultsQueue}
      />
    </div>
  );
}
