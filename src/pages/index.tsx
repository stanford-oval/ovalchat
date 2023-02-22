import React from "react";
import Page from "../components/global/utility/Page";
import Hero from "../components/home/Hero";

export default function index() {
  return (
    <Page
      fullTitle="Noora"
      desc="A platform utilizing conversational AI to improve the social conversation of individuals with ASD."
    >
      <Hero />
    </Page>
  );
}
