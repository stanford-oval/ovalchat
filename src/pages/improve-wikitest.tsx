import React from "react";
import WikiTest from "../components/wikitest/WikiTest";
import Page from '../components/global/utility/Page';

export default function wikitest() {
  return (
    <Page
      title="Improve WikiTest"
      desc="Contribute to WikiTest by picking the best reply option and evaluating replies."
    >
      <WikiTest />
    </Page>
  );
}
