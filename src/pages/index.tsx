import React from "react";
import Page from "../components/global/utility/Page";
import Hero from "../components/home/Hero";

export default function index() {
  return (
    <Page
      fullTitle="FactGPT"
      desc="FactGPT is a chatbot who provides factually accurate and up-to-date information about a wide range of topics."
    >
      <Hero />
    </Page>
  );
}
