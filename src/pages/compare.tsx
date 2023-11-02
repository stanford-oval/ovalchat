import React from "react";
import Page from "../components/global/utility/Page";
import { chatbotName, pageDescription } from "../components/global/branding";
import Chat from "../components/ovalchat/Chat";
import Header from "../components/global/header/Header";

export default function ovalchat() {
    return (
        <Page
            fullTitle={chatbotName()}
            desc={pageDescription()}
        >
            <Header />
            <div className="container pt-12 sm:pt-16 md:pt-18 2xl:pt-20 bg-gray-100 py-4 min-h-screen min-w-full">
                <Chat
                    isHomePage={false}
                    showSideBar={true}
                    showHeader={false}
                    showSpeechButton={false}
                    showMicrophone={false}
                    skipEvaluation={true}
                    shouldSuffle={false}
                />
            </div>
        </Page>
    );
}
