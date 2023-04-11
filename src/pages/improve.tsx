import React from "react";
import Page from "../components/global/utility/Page";
import { chatbotName, pageDescription } from "../components/global/branding";
import Chat from "../components/ovalchat/Chat";

export default function ovalchat() {
  return (
    <Page
    fullTitle={chatbotName()}
    desc={pageDescription()}
  >
    <div>
      <div className="bg-gray-100 py-4 min-h-screen">
        <Chat isHomePage={false} showSideBar={false} showHeader={false} showSpeechButton={false} skipEvaluation={false} shouldShuffleSystems={true} />
      </div>
    </div>
  </Page>
  );
}
