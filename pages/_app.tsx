import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import AppContextProvider from "../lib/AppContextProvider";
import "../styles/globals.css";

const client = new ApolloClient({
  uri: "https://teste.deliverycenter.io/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ApolloProvider>
  );
}
export default MyApp;
