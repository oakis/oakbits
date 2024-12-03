import Navigation from "@/components/Navigation";
import "@/styles/globals.css";
import { initializeDatadogRum } from "@/utils/datadogInit";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // if (process.env.NEXT_PUBLIC_ENV === "local") return;

    if (typeof window.Cookiebot !== "undefined" && window.Cookiebot.consented) {
      initializeDatadogRum();
    }
  }, []);

  return (
    <>
      <header>
        <Navigation />
      </header>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
}
