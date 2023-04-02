import React from "react";
import { chatbotName, pageDescription } from "../components/global/branding";
import Page from "../components/global/utility/Page";
import Hero from "../components/home/Hero";

export default function index() {
  return (
    <Page
      fullTitle={chatbotName()}
      desc={pageDescription()}
    >
      <Hero />
    </Page>
  );
}
