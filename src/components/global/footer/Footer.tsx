import React from "react";
import routes from "../../../data/routes";
import socials from "../../../data/socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-wikichat-secondary">
      <div className="max-w-7xl mx-auto pt-12 pb-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {routes.map((r: any) => {
            if (r.href)
              return (
                <div key={r.name} className="px-5 py-2">
                  <a
                    href={r.href}
                    className="text-base text-gray-300 hover:text-gray-200"
                  >
                    {r.name}
                  </a>
                </div>
              );
          })}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {socials.map((s: any) => (
            <a key={s.name} href={s.href}>
              <FontAwesomeIcon
                icon={s.icon}
                className="text-gray-300 hover:text-gray-200 h-6 w-6 trans-150"
              />
            </a>
          ))}
        </div>

        <p className="mt-8 text-center text-base text-gray-300">
          WikiChat is part of a research project at Stanford University&apos;s{" "}
          <a
            href="https://oval.cs.stanford.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-gray-200 trans-150"
          >
            Open Virtual Assistant Lab
          </a>
          .
        </p>
        <div className="mt-7 ml-auto text-center text-base text-gray-300">
          <a
            href="https://vercel.com/?utm_source=[stanford-oval]&utm_campaign=oss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image alt="vercel logo" src="/img/logos/vercel/powered-by.svg" className="mx-auto" height="38" width="200" />
          </a>
        </div>
      </div>
    </footer>
  );
}
