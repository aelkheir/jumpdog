import { Html, Head, Main, NextScript } from "next/document";
import { useState } from "react";

export default function Document() {
  return (
    <Html>
      <Head />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Changa:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    const getInitialTheme = () => {
      const persistedColorPreference = window.localStorage.getItem("theme");
      const hasPersistedPreference =
        typeof persistedColorPreference === "string";
      // If the user has explicitly chosen light or dark,
      // let's use it. Otherwise, this value will be null.
      if (hasPersistedPreference) {
        return persistedColorPreference;
      }
      // If they haven't been explicit, let's check the media
      // query
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const hasMediaQueryPreference = typeof mql.matches === "boolean";
      if (hasMediaQueryPreference) {
        return mql.matches ? "dark" : "light";
      }
      // If they are using a browser/OS that doesn't support
      // color themes, let's default to 'light'.
      return "light";
    };
    const root = document.documentElement;
    if (getInitialTheme() === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
