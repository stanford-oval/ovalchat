import React from "react";
import WikiChat from "../components/wikichat/WikiChat";
import Page from '../components/global/utility/Page';

export default function wikichat() {
  return (
    <Page
      title="Improve WikiChat"
      desc="Contribute to WikiChat by picking the best reply option and evaluating replies."
    >
      <WikiChat />
    </Page>
  );
}
