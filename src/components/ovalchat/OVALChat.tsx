import React from "react";
import Preamble from "./Preamble";
import Chat from "./Chat";
import Page from "../global/utility/Page";
import { chatbotName, pageDescription } from "../global/branding";

export default function OVALChat({ autoPickMode }: any) {
  return (
    <Page
      fullTitle={chatbotName()}
      desc={pageDescription()}
    >
      <div>
        {/* <Preamble /> */}
        <div className="bg-gray-100 py-4 min-h-screen">
          <Chat autoPickMode={autoPickMode} showSideBar={autoPickMode} showHeader={autoPickMode} />
        </div>
      </div>
    </Page>
  );
}
