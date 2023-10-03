import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

function HelloWorld() {
  const { loading, error, data } = useQuery(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <p>{data.hello}</p>;
}

export default HelloWorld;
