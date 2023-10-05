import { useRouter } from "next/router";

import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOOK, GET_BOOKS } from "@/graphql/queries";
import { Book } from "@/utils/types";
import Button from "./Button";
import Link from "next/link";

// Inside Dashboard component

export default function BookList() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_BOOKS);

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    // ...
    <div className="">
      {data.books.map((book: Book) => (
        <div
          key={book._id}
          className="flex gap-4 p-2 border-b transition duration-300"
        >
          <div>
            <img
              src={"https://picsum.photos/50/50?random=1"}
              alt="Placeholder book image"
              className=""
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600 mb-2">{book.author}</p>
            <p className="text-gray-600 mb-2">{book.description}</p>
          </div>

          <div className="justifys-end">
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              // @ts-ignore
              onClick={() =>
                router.push(
                  `/user/update-book?id=${book._id}&title=${book.title}&author=${book.author}&description=${book.description}&publishedDate=${book.publishedDate}`
                )
              }
            >
              Update
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 ml-2"
              // @ts-ignore
              onClick={() => deleteBook({ variables: { id: book._id } })}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
    // ...
  );
}
