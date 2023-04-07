import React from "react";
import Preamble from "./Preamble";
import Chat from "./Chat";
import Page from "../global/utility/Page";
import { chatbotName, pageDescription } from "../global/branding";

export default function OVALChat({ isHomePage }: any) {
  return (
    <Page
      fullTitle={chatbotName()}
      desc={pageDescription()}
    >
      <div>
        {/* <Preamble /> */}
        <div className="bg-gray-100 py-4 min-h-screen">
          <Chat isHomePage={isHomePage} showSideBar={isHomePage} showHeader={isHomePage} showSpeechButton={isHomePage} />
        </div>
      </div>
    </Page>
  );
}
