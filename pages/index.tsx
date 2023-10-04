"use client";

import { gql } from "@apollo/client";
import client from "@/graphql/apolloClient";

const GET_DATA = gql`
  query {
    hello
  }
`;

export default async function FirstPage() {
  const resp = await client.query({ query: GET_DATA });

  console.log(resp);

  return <div>{!resp.loading && resp.data.hello}</div>;
}
