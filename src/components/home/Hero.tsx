import React from "react";
import { chatbotDescription, chatbotRepository, chatbotTagLine, developedByHeader, footerSponsors, showFooter } from "../global/branding";
import Chat from '../ovalchat/Chat';
import Alert from './Alert';
import { routes } from "../global/branding";
import { PageBackground } from "../global/utility/Page";

export default function HomeHero() {
  return (
    <div
      className="bg-white isolate flex flex-col justify-center align-center pt-10"
      id="homeHero"
    >
      {
        // if route has {name: "Contribute"} in it
        routes.some((route) => route.href === "/improve") &&
        <Alert />
      }
      <PageBackground />

      <div className="container pt-16 sm:pt-1">
        <div className="flex mx-auto items-center flex-col text-center gap-y-8 sm:gap-y-6 sm:gap-x-12 lg:gap-x-0 max-w-xl sm:max-w-2xl md:max-w-3xl">
          <div className="px-4 sm:px-0">
            <p className="inline leading-tight bg-gradient-to-r from-ovalchat-primary via-teal-900 to-ovalchat-primary-dark bg-clip-text font-bold text-4xl xl:text-5xl tracking-tight text-transparent">
              {chatbotTagLine()}
            </p>
            <p className="pt-2 pb-0 mt-4 text-xl xl:text-2xl tracking-tight text-gray-600">
              {chatbotDescription()}
            </p>
            <p className="pt-0 pb-2 mt-2 text-lg tracking-tight text-blue-600">
              {chatbotRepository()}
            </p>
            <div className="mt-4 w-full">


              <div className="mt-5 w-full flex mx-auto justify-center">
                <img
                  src="/img/logos/stanford/university.png"
                  className="h-14 lg:h-16 w-auto mx-4"
                  alt="Stanford University"
                />

                <h2 className="text-gray-500 text-lg w-fit text-left">
                  Developed by
                  <br></br>
                  {" "}
                  {developedByHeader()}
                </h2>
              </div>

              {!showFooter &&
                <div className="mt-6 w-full flex mx-auto justify-center">
                  {footerSponsors()}
                </div>
              }

            </div>
          </div>
        </div>
        <div className="py-5">
          <Chat isHomePage={true} showSideBar={false} showHeader={true} showSpeechButton={true} skipEvaluation={false} shouldShuffleSystems={false} />
        </div>
      </div>
    </div>
  );
}
