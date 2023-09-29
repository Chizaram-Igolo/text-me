import { useState, useEffect } from "react";

import client from "@/apollo";

export default async function Home({ initialData }) {
  const [data, setData] = useState(initialData);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // Use the data from the Apollo Server response here

  return (
    <div>
      <h1>Data</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

// if (process.env.NODE_ENV === "development") {
//   // Adds messages only in a dev environment
//   loadDevMessages();
//   loadErrorMessages();
// }
