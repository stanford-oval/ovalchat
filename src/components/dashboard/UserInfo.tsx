import React from "react";

export default function UserHero() {
  return (
    <div className="pt-16 bg-gray-100">
      <div className="py-6 md:py-8 container">
        <div className="flex flex-col md:flex-row md:text-left md:justify-start text-center gap-x-6 gap-y-2 justify-center items-center">
          <img
            src="/img/dashboard/default_pfp.png"
            alt="Default Picture"
            className="h-28 w-28 rounded-full bg-gray-400"
          />
          <div>
            <h1 className="font-bold text-factgpt-secondary text-3xl">Guest</h1>
            <p className="text-slate-700">No login required! Just get started practicing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
