import React from "react";
import { chatbotName } from "../../../global/branding";

export default function Header() {
  return (
    <div className="w-full bg-white p-2 pt-3 border-2 border-b-0 border-gray-400 rounded-t-md">
      <div className="h-14 w-14 mx-auto rounded-full bg-gradient-to-br from-wikichat-primary-light via-wikichat-primary-dark to-wikichat-primary-dark2"></div>
      <div className="text-2xl text-center font-bold text-wikichat-secondary mt-0.5">
        {chatbotName()}
      </div>
    </div>
  );
}
