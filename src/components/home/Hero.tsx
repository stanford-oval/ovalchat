import React from "react";
import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/solid";

export default function Hero() {
  return (
    <div
      className="bg-[#ECEFF5] bg-cover bg-no-repeat bg-center overflow-hidden min-h-screen flex flex-col justify-center align-center"
      id="homeHero"
    >
      <div className="container">
        <div className="flex mx-auto items-center justify-between text-center gap-y-8 sm:gap-y-6 sm:gap-x-12 lg:gap-x-0 max-w-xl sm:max-w-2xl md:max-w-3xl">
          <div className="px-4 sm:px-0">
            <p className="inline leading-tight bg-gradient-to-r from-factgpt-primary via-teal-900 to-factgpt-primary-dark bg-clip-text font-bold text-4xl xl:text-5xl tracking-tight text-transparent">
              Stay informed with FactGPT. 
            </p>
            <p className="mt-3 text-xl xl:text-2xl tracking-tight text-gray-600">
              FactGPT is a chatbot who provides factually accurate and up-to-date information about a wide range of topics.
            </p>
            <div className="mt-6 w-full">
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
      </div>
    </div>
  );
}
