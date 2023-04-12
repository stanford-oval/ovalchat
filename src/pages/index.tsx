import React from "react";
import { chatbotName, pageDescription, showFooter } from "../components/global/branding";
import Page from "../components/global/utility/Page";
import Hero from "../components/home/Hero";
import Header from "../components/global/header/Header";
import Footer from "../components/global/footer/Footer";

export default function index() {
  return (
    <Page
      fullTitle={chatbotName()}
      desc={pageDescription()}
    >
      <Header />
      <Hero />
      {showFooter &&
        <Footer />
      }

    </Page>
  );
}
