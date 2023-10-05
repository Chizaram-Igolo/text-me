import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apolloClient";
import useAuth from "@/components/hooks/useAuth";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (
      !isAuthenticated &&
      !loading &&
      router.pathname !== "/auth/signin" &&
      router.pathname !== "/auth/signup"
    ) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, loading]);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
