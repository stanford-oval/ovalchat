import React from "react";
import Preamble from "./Preamble";
import Chat from "./Chat";

export default function WikiTest() {
  return (
    <div>
      <Preamble />
      <div className="bg-gray-100 py-4">
        <Chat />
      </div>
    </div>
  );
}
