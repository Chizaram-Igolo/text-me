import { useMutation } from "@apollo/client";
import { ADD_BOOK, GET_BOOKS } from "@/graphql/queries";
import { useState } from "react";

const AddBook = () => {
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    publishedDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const response = await addBook({
        variables: {
          ...formData,
        },
      });
      console.log("Book added:", response.data.addBook);
    } catch (error) {
      console.error("Adding book failed:", error);
    }
  };

  return (
    <div>
      <h1>Add a Book</h1>
      <form onSubmit={handleAddBook}>
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
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
