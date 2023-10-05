import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apolloClient";
import useAuth from "@/components/hooks/useAuth";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (
      !isAuthenticated &&
      router.pathname !== "/auth/signup" &&
      router.pathname !== "/auth/signin"
    ) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated]);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
