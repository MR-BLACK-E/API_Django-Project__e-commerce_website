import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null, // new field
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://127.0.0.1:8000/api/categories/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProductData({ ...productData, image: e.target.files[0] }); // file upload
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");

      // Create FormData
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("description", productData.description);
      if (productData.image) {
        formData.append("image", productData.image);
      }
      // formData.append("image",productData.image);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/product/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // important for images
          },
        }
      );

      setMessage(res.data.message || "Product added successfully!");
      setProductData({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
      });
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.detail || "Something went wrong"));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          className="form-control my-2"
          placeholder="Price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
        />
        <select
          className="form-control my-2"
          name="category"
          value={productData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <textarea
          className="form-control my-2"
          placeholder="Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
        <input
          type="file"
          className="form-control my-2"
          name="image"
          // value={productData.image}
          accept="image/*"
          onChange={handleChange}
        />
        <button className="btn btn-success" type="submit">
          Add Product
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default AddProduct;

