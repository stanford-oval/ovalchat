import React from "react";
import FactGpt from "../components/factgpt/FactGpt";
import Page from '../components/global/utility/Page';

export default function factgpt() {
  return (
    <Page
      title="Improve FactGPT"
      desc="Contribute to FactGPT by picking the best reply option and evaluating replies."
    >
      <FactGpt />
    </Page>
  );
}
