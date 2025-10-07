import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categoriesview/")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-success">Categories</h2>
      <ul className="list-group">
        {categories.map(cat => (
          <li key={cat.id} className="list-group-item">{cat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
