import React from "react";

export default function Header() {
  return (
    <div className="w-full bg-white p-2 pt-3 border-2 border-gray-400 rounded-t-md">
      <div className="h-14 w-14 mx-auto rounded-full bg-gradient-to-br from-factgpt-primary-light via-factgpt-primary-dark to-factgpt-primary-dark2"></div>
      <div className="text-2xl text-center font-bold text-factgpt-secondary mt-0.5">
        FactGPT
      </div>
    </div>
  );
}
