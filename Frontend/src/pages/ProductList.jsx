import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/productsview/")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-success">Products</h2>
      <div className="row">
        {products.map(prod => (
          <div key={prod.id} className="col-md-4 mb-3">
            <div className="card">
              {prod.image && (
                <img
                  src={`http://127.0.0.1:8000${prod.image}`}
                  className="card-img-top"
                  alt={prod.name}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">{prod.description}</p>
                <span className="badge bg-primary">${prod.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
