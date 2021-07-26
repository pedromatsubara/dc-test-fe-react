import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import AppContextProvider from "../lib/AppContextProvider";
import "../styles/globals.css";

const TopBar = dynamic(() => import("../components/TopBar"), { ssr: false });

const client = new ApolloClient({
  uri: "https://teste.deliverycenter.io/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <TopBar />
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ApolloProvider>
  );
}
export default MyApp;
