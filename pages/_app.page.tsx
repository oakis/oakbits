import DatadogInit from "@/components/DatadogInit";
import Navigation from "@/components/Navigation";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <NextNProgress />
      <DatadogInit />
      <Component {...pageProps} />
    </>
  );
}
