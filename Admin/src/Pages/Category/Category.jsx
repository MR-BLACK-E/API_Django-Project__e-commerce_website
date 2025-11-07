import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(
        "http://127.0.0.1:8000/api/category/",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setName("");
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.detail || "Something went wrong"));
    }
  };

  return (
    <div style={{placeItems:"center"}} className="container mt-5">
      <h2>Add Category</h2>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Add Category
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default AddCategory;
