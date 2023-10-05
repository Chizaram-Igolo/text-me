import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_BOOK, GET_BOOKS } from "@/graphql/queries";

const UpdateBook = () => {
  const router = useRouter();

  const { id, title, author, description, publishedDate } = router.query;

  const [formData, setFormData] = useState({
    title: title,
    author: author,
    description: description,
    publishedDate: publishedDate,
  });

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
          id: id,
          ...formData,
        },
      });
      console.log("Book updated:", response.data.updateBook);
    } catch (error) {
      console.error("Updating book failed:", error);
    }
  };

  return (
    <div>
      <h1>Update Book</h1>
      <form onSubmit={handleUpdateBook}>
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
