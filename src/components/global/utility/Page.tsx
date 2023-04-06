import React from "react";
import Header from "../../global/header/Header";
import Footer from "../../global/footer/Footer";
import Head from "next/head";
import { chatbotName, websitePreviewImage } from "../branding";

export default function Page({ fullTitle, title, desc, children }: PageProps) {
  let pageTitle = fullTitle ? fullTitle : title + " | " + chatbotName();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={desc} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={pageTitle} />
        <meta name="og:description" property="og:description" content={desc} />
        <meta property="og:image" content={websitePreviewImage()} />
        <meta property="og:site_name" content={pageTitle} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={desc} />
        {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {children}
    </>
  );
}

type PageProps = {
  fullTitle?: string;
  title?: string;
  desc?: string;
  children?: React.ReactNode;
};
