import { useState } from "react";
import { Container } from "react-bootstrap";
import "./product-review.css";

const ProductReviews = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");

  const reviews = selectedProduct?.reviews || [];

  return (
    <section className="product-reviews">
      <Container>
        {/* Tabs */}
        <ul className="d-flex gap-4 mb-3" style={{ cursor: "pointer" }}>
          <li
            style={{
              color: listSelected === "desc" ? "black" : "#9c9b9b",
              borderBottom: listSelected === "desc" ? "2px solid black" : "none",
            }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            style={{
              color: listSelected === "rev" ? "black" : "#9c9b9b",
              borderBottom: listSelected === "rev" ? "2px solid black" : "none",
            }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({reviews.length})
          </li>
        </ul>

        {/* Content */}
        {listSelected === "desc" ? (
          <div>
            <h5 className="fw-semibold">Product Description</h5>
            <p className="mt-2">
              {selectedProduct?.description || "No description available."}
            </p>
          </div>
        ) : (
          <div className="rates">
            <h5 className="fw-semibold mb-3">Customer Reviews</h5>

            {reviews.length > 0 ? (
              reviews.map((rate, index) => (
                <div
                  className="rate-comment p-3 mb-3 border rounded"
                  key={index}
                  style={{ backgroundColor: "#f9f9f9" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">John Doe</span>
                    <span className="text-warning">
                      ⭐ {rate.rating} / 5
                    </span>
                  </div>
                  <p className="mt-2 mb-0 text-secondary">{rate.text}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No reviews yet for this product.</p>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductReviews;
