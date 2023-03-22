import React from "react";
import Preamble from "./Preamble";
import Chat from "./Chat";

export default function AgentChat({ autoPickMode }: any) {
  return (
    <div>
      {/* <Preamble /> */}
      <div className="bg-gray-100 py-4 min-h-screen">
        <Chat autoPickMode={autoPickMode} showSideBar={autoPickMode} showHeader={autoPickMode}/>
      </div>
    </div>
  );
}
