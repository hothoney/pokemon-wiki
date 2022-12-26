import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RequestServiceProvider } from "../services/http";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <RequestServiceProvider
        config={{
          timeout: 10000,
          headers: {
            ABC: "DEF",
          },
        }}
      >
        <Component {...pageProps} />
      </RequestServiceProvider>
    </SessionProvider>
  );
}
