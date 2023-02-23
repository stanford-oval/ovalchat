import Link from "next/link";
import React from "react";
import Page from "../components/global/utility/Page";

export default function Custom404() {
  return (
    <Page title="404">
      <div className="h-screen w-screen">
        <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="max-w-max mx-auto">
            <main className="sm:flex">
              <p className="text-4xl font-extrabold text-factgpt-primary sm:text-5xl">
                404
              </p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Page not found
                  </h1>
                  <p className="mt-1 text-base text-gray-500">
                    Please check the URL in the address bar and try again.
                  </p>
                </div>
                <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <Link href="/">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-factgpt-primary hover:bg-factgpt-primary-dark focus:outline-none">
                      Go Back Home
                    </button>
                  </Link>
                  <Link href="/noora">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-factgpt-primary-dark bg-emerald-100 hover:bg-emerald-200 focus:outline-none">
                      Noora Chat
                    </button>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Page>
  );
}
