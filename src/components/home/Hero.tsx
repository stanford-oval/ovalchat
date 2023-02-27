import React from "react";
import Chat from '../wikichat/Chat';
import Alert from './Alert';

export default function Hero() {
  return (
    <div
      className="bg-white isolate flex flex-col justify-center align-center pt-16"
      id="homeHero"
    >
      <Alert />
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2DD4BF" />
              <stop offset={1} stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="container pt-12 sm:pt-16 md:pt-18 2xl:pt-20">
        <div className="flex mx-auto items-center flex-col text-center gap-y-8 sm:gap-y-6 sm:gap-x-12 lg:gap-x-0 max-w-xl sm:max-w-2xl md:max-w-3xl">
          <div className="px-4 sm:px-0">
            <p className="inline leading-tight bg-gradient-to-r from-wikichat-primary via-teal-900 to-wikichat-primary-dark bg-clip-text font-bold text-4xl xl:text-5xl tracking-tight text-transparent">
              Stay informed with WikiChat.
            </p>
            <p className="mt-4 text-xl xl:text-2xl tracking-tight text-gray-600">
              WikiChat is an experimental chatbot aimed at improving the factuality of GPT-3 by retrieving data from Wikipedia.
            </p>
            <div className="mt-4 w-full">
              <h2 className="text-gray-500 text-lg">
                Developed by{" "}
                <a
                  href="https://oval.cs.stanford.edu/"
                  className="font-medium text-[#8C1515]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stanford&apos;s Open Virtual Assistant Lab
                </a>
              </h2>
              <div className="mt-2 w-full flex mx-auto justify-center md:justify-start">
                <img
                  src="/img/logos/stanford/university.png"
                  className="h-10 lg:h-12 mt-0.5 w-auto mx-auto"
                  alt="Stanford University"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 sm:py-6 md:py-7 2xl:py-8">
          <Chat />
        </div>
      </div>
    </div>
  );
}
