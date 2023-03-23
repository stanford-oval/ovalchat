import React from "react";
import Page from "../components/global/utility/Page";
import Hero from "../components/home/Hero";

export default function index() {
  return (
    <Page
      fullTitle="Health Survey"
      desc="Supported functions: dispute charge, replace card, ask for card arrival, ask for card expiry, search for transactions, and search for accounts."
    >
      <Hero />
    </Page>
  );
}
