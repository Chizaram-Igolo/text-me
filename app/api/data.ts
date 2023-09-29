import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";

const GET_DATA = gql`
  query {
    hello
  }
`;

export async function getData() {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: GET_DATA,
  });

  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getData();

  res.status(200).json(data);
}
