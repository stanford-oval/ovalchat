import React from "react";
import Image from "next/image";
import { chatbotLogo, chatbotName } from "../../../global/branding";

export default function Header() {
  return (
    <div className="w-full bg-white p-2 pt-3 border-2 border-b-0 border-gray-400 rounded-t-md">
      <Image
        className="h-14 w-auto mx-auto rounded-full bg-gradient-to-br"
        width="50"
        height="50"
        src={chatbotLogo()}
        alt={chatbotName() + " logo"}
      />
      <div className="text-2xl text-center font-bold text-ovalchat-secondary mt-0.5">
        {chatbotName()}
      </div>
    </div>
  );
}
