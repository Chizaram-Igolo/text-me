import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_BOOK, GET_BOOKS } from "@/graphql/queries";

const UpdateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    publishedDate: "",
  });

  const { loading, error, data } = useQuery(GET_BOOKS);

  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();

    try {
      const response = await updateBook({
        variables: {
          id: "your-book-id", // Replace with the ID of the book to update
          ...formData,
        },
      });
      console.log("Book updated:", response.data.updateBook);
    } catch (error) {
      console.error("Updating book failed:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Update Book</h1>
      <form onSubmit={handleUpdateBook}>
        <select
          name="id"
          onChange={handleInputChange}
          value={formData.id}
          required
        >
          <option value="" disabled>
            Select a Book
          </option>
          {data.books.map((book: Book) => (
            <option key={book._id} value={book._id}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          placeholder="Author"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
