import React from "react";
import routes from "../../../data/routes";
import socials from "../../../data/socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { footerMessage, footerSponsors } from "../branding";

export default function Footer() {
  return (
    <footer className="bg-ovalchat-secondary">
      <div className="max-w-7xl mx-auto pt-4 pb-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        {/* <nav
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
        </nav> */}
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

        <p className="my-8 text-center text-base text-gray-300">
          {footerMessage()}
        </p>
        <div className="my-7 ml-auto text-center text-base text-gray-300">
          {footerSponsors()}
        </div>
      </div>
    </footer>
  );
}
