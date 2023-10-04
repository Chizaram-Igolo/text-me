import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS, DELETE_BOOK } from "@/graphql/queries";
import { Book } from "@/utils/types";
import Link from "next/link";

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {data.books.map((book: Book) => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => deleteBook({ variables: { id: book._id } })}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <Link href="add-book">Add Book</Link>
    </div>
  );
};

export default Books;
