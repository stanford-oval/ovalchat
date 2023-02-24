import React from "react";
import Page from "../components/global/utility/Page";
import Hero from "../components/home/Hero";

export default function index() {
  return (
    <Page
      fullTitle="WikiTest"
      desc="WikiTest is an experimental chatbot aimed at improving the factuality of GPT-3 by retrieving data from Wikipedia."
    >
      <Hero />
    </Page>
  );
}
