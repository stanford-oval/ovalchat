import React from "react";
import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/solid";

export default function Hero() {
  return (
    <div
      className="bg-[#ECEFF5] bg-cover bg-no-repeat bg-center overflow-hidden min-h-screen flex flex-col justify-center align-center"
      id="homeHero"
    >
      <div className="container pb-12 md:py-18 pt-24 lg:pt-14">
        <div className="grid grid-cols-12 items-center justify-between text-center md:text-left gap-y-8 sm:gap-y-6 sm:gap-x-12 lg:gap-x-0">
          <div className="px-4 sm:px-0 col-span-12 sm:col-start-2 sm:col-span-10 md:col-span-6 md:col-start-0 xl:col-span-6">
            <p className="inline leading-tight bg-gradient-to-r from-factgpt-primary-dark via-factgpt-secondary-light to-factgpt-primary-dark1 bg-clip-text font-bold text-4xl xl:text-5xl tracking-tight text-transparent">
              Improve your social conversation using AI.
            </p>
            <p className="mt-3 text-xl xl:text-2xl tracking-tight text-gray-600">
              Noora is a chatbot who guides you through a diverse set of social
              scenarios.
            </p>
            <div className="mt-6 mb-2 flex gap-x-3 gap-y-2 flex-wrap justify-center md:justify-start">
              <Link href="/noora?module=general">
                <button className="pulse-button uppercase rounded-full outline-none px-6 py-4 flex text-lg text-white bg-factgpt-primary hover:bg-factgpt-primary-dark font-medium">
                  Get started{" "}
                  <ArrowSmRightIcon className="h-6 w-6 mt-0.5 ml-1.5" />
                </button>
              </Link>
            </div>
            <div className="mt-6 w-full col-span-12">
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
              <div className="mt-2 w-full flex gap-x-4 justify-center md:justify-start">
                <img
                  src="/img/logos/stanford/medicine.png"
                  className="h-9 lg:h-11 w-auto"
                  alt="Stanford Medicine"
                />
                <img
                  src="/img/logos/stanford/engineering.png"
                  className="h-10 lg:h-12 mt-0.5 w-auto"
                  alt="Stanford Engineering"
                />
              </div>
            </div>
          </div>
          <div className="px-4 col-span-12 sm:px-0 sm:col-span-8 sm:col-start-3 md:col-span-6 md:pt-8 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <Link href="/noora"><img src="/img/home/demo.png" className="rounded-md cursor-pointer" alt="Noora demo" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
