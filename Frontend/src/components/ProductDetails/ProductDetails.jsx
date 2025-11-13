import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToBackendCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAdd = (selectedProduct, quantity) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    dispatch(
      addToBackendCart({
        product: selectedProduct,
        num: quantity,
      })
    );
    toast.success("✅ Product added to your cart!");
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img
              loading="lazy"
              src={
                selectedProduct?.image
                  ? selectedProduct.image.startsWith("http")
                    ? selectedProduct.image
                    : `http://127.0.0.1:8000${selectedProduct.image}`
                  : selectedProduct?.imgUrl
              }
              alt={selectedProduct?.productName}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.productName}</h2>
            <div className="rate">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa fa-star"></i>
                ))}
              </div>
              <span>{selectedProduct?.avgRating} ratings</span>
            </div>
            <div className="info">
              <span className="price">₹{selectedProduct?.price}</span>
              <span>Category: {selectedProduct?.category}</span>
            </div>
            <p>{selectedProduct?.shortDesc}</p>
            <input
              className="qty-input"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <div>
              <h4>Description</h4>
               < h5 className="mt-2">
              {selectedProduct?.description || "No description available."}
            </h5>
            </div>
            {/* <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handleAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;

