import React from "react";
import Footer from "./Footer";
import ReplyList from "./ReplyList";

export default function Summary({ convoState, history }: any) {
  return (
    <div className="min-h-full rounded-lg">
      <div className="bg-factgpt-secondary rounded-t-lg text-white w-full py-4 border-2 border-factgpt-secondary-dark">
        <div className="text-2xl text-center font-bold text-white">Summary</div>
      </div>
      <ReplyList convoState={convoState} />
      <Footer convoState={convoState} history={history} />
    </div>
  );
}
