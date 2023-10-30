import React from "react";
import { aboutPage, chatbotName, pageDescription, showFooter } from "../components/global/branding";
import Page, { PageBackground } from "../components/global/utility/Page";
import Header from "../components/global/header/Header";
import Footer from "../components/global/footer/Footer";

export default function index() {
    return (
        <Page
            fullTitle={chatbotName()}
            desc={pageDescription()}
        >
            <Header />

            <div className="bg-white isolate flex flex-col justify-center align-center pt-10" id="homeHero">
                <PageBackground />

            </div>
            <div className="container pt-4 min-w-full">
                <div className="py-4 container flex items-stretch flex-col md:flex-row justify-center md:space-x-2 space-y-2 md:space-y-0">
                    <div className="px-4 min-h-full z-10 pb-12">
                        {aboutPage()}
                    </div>
                </div>
            </div>

            {showFooter &&
                <Footer />
            }

        </Page>
    );
}
