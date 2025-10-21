import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToBackendCart } from "../../app/features/cart/cartSlice";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/${productItem.id || productItem._id || productItem.slug}`);
  };

  const handleAdd = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    const productId =
      productItem.id ||
      productItem._id ||
      productItem.product_id ||
      productItem.product ||
      productItem.slug;

    if (!productId) {
      toast.error("Invalid product data — cannot add to cart.");
      return;
    }

    try {
      await dispatch(addToBackendCart({ product_id: productId, quantity: 1 })).unwrap();

      toast.success(`${productItem.name} added to your cart!`);
    } catch (error) {
      console.error("Cart Add Error:", error);

      if (error === "User not authenticated.") {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error("Failed to add item to cart. Try again.");
      }
    }
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {title === "Big Discount" && productItem.discount ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}

      <img
        loading="lazy"
        onClick={handleClick}
        src={
          productItem.image
            ? productItem.image.startsWith("http")
              ? productItem.image
              : `http://127.0.0.1:8000${productItem.image}`
            : "/placeholder.jpg"
        }
        alt={productItem.name}
      />

      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>

      <div className="product-details">
        <h3 onClick={handleClick}>{productItem.name}</h3>
        {productItem.description && (
          <h6 onClick={handleClick}>{productItem.description}</h6>
        )}

        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>

        <div className="price">
          <h4>₹{productItem.price}</h4>
          <button
            aria-label="Add"
            type="button"
            className="add"
            onClick={handleAdd}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;


// import { Col } from "react-bootstrap";
// import "./product-card.css";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../app/features/cart/cartSlice";

// const ProductCard = ({ title, productItem }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/shop/${productItem.id || productItem._id}`);
//   };

//   const handleAdd = () => {
//     // ✅ Ensure unique and consistent ID key for every product
//     const normalizedProduct = {
//       ...productItem,
//       id:
//         productItem.id ||
//         productItem._id ||
//         productItem.product_id ||
//         productItem.slug ||
//         Math.random().toString(36).substr(2, 9), // fallback unique id
//     };

//     console.log("🛒 Adding product to cart:", normalizedProduct);

//     dispatch(addToCart({ product: normalizedProduct, num: 1 }));
//     toast.success(`${normalizedProduct.name} added to cart!`);
//   };

//   return (
//     <Col md={3} sm={5} xs={10} className="product mtop">
//       {title === "Big Discount" && productItem.discount ? (
//         <span className="discount">{productItem.discount}% Off</span>
//       ) : null}

//       <img
//         loading="lazy"
//         onClick={handleClick}
//         src={
//           productItem.image
//             ? productItem.image.startsWith("http")
//               ? productItem.image
//               : `http://127.0.0.1:8000${productItem.image}`
//             : "/placeholder.jpg"
//         }
//         alt={productItem.name}
//       />

//       <div className="product-like">
//         <ion-icon name="heart-outline"></ion-icon>
//       </div>

//       <div className="product-details">
//         <h3 onClick={handleClick}>{productItem.name}</h3>
//         {productItem.description && (
//           <h6 onClick={handleClick}>{productItem.description}</h6>
//         )}

//         <div className="rate">
//           <i className="fa fa-star"></i>
//           <i className="fa fa-star"></i>
//           <i className="fa fa-star"></i>
//           <i className="fa fa-star"></i>
//           <i className="fa fa-star"></i>
//         </div>

//         <div className="price">
//           <h4>₹{productItem.price}</h4>
//           <button
//             aria-label="Add"
//             type="button"
//             className="add"
//             onClick={handleAdd}
//           >
//             <ion-icon name="add"></ion-icon>
//           </button>
//         </div>
//       </div>
//     </Col>
//   );
// };

// export default ProductCard;
