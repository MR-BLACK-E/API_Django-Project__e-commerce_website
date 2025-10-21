import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCart,
  addToBackendCart,
  deleteFromBackendCart,
} from "../app/features/cart/cartSlice";
import Banner from "../components/Banner/Banner";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartList, loading } = useSelector((state) => state.cart);
  const token = localStorage.getItem("accessToken");

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your cart.");
      navigate("/login");
    }
  }, [token, navigate]);

  // ✅ Fetch user cart on load
  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
    window.scrollTo(0, 0);
  }, [dispatch, token]);

  // ✅ Increase quantity (using thunk)
  const handleIncrease = async (item) => {
    try {
      await dispatch(
        addToBackendCart({ product_id: item.product.id || item.id, quantity: item.quantity + 1 })
      ).unwrap();
    } catch (err) {
      console.error("Error increasing quantity:", err);
      toast.error("Failed to update quantity.");
    }
  };

  // ✅ Decrease quantity or remove if 1
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        await dispatch(
          addToBackendCart({ product_id: item.product.id || item.id, quantity: item.quantity - 1 })
        ).unwrap();
      } catch (err) {
        console.error("Error decreasing quantity:", err);
        toast.error("Failed to decrease quantity.");
      }
    } else {
      handleDelete(item);
    }
  };

  // ✅ Delete item from cart
  const handleDelete = async (item) => {
    try {
      await dispatch(deleteFromBackendCart(item.product.id || item.id)).unwrap();
      toast.success(`${item.product?.name || item.name} removed from cart.`);
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error("Failed to delete item.");
    }
  };

  // ✅ Total price
  const totalPrice = cartList.reduce(
    (sum, item) => sum + Number(item.product?.price || item.price) * item.quantity,
    0
  );

  return (
    <>
      <Banner title="Cart" />
      <section className="cart-items">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {loading && <h3 className="text-center">Loading your cart...</h3>}

              {!loading && cartList.length === 0 && (
                <h1 className="no-items product">No Items in Cart</h1>
              )}

              {cartList.map((item) => {
                const product = item.product || item; // handle both serializer styles
                const productQty = Number(product.price) * item.quantity;

                return (
                  <div className="cart-list" key={product.id}>
                    <Row>
                      <Col className="image-holder" sm={4} md={3}>
                        <img
                          loading="lazy"
                          src={
                            product.image
                              ? product.image.startsWith("http")
                                ? product.image
                                : `http://127.0.0.1:8000${product.image}`
                              : "/placeholder.jpg"
                          }
                          alt={product.name}
                        />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className="cart-content justify-content-center">
                          <Col xs={12} sm={9} className="cart-details">
                            <h3>{product.name}</h3>
                            <h4>
                              ₹{product.price}.00 × {item.quantity}
                              <span> ₹{productQty}.00</span>
                            </h4>
                          </Col>
                          <Col xs={12} sm={3} className="cartControl">
                            <button
                              className="incCart"
                              onClick={() => handleIncrease(item)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <button
                              className="desCart"
                              onClick={() => handleDecrease(item)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                      <button
                        className="delete"
                        onClick={() => handleDelete(item)}
                      >
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </Row>
                  </div>
                );
              })}
            </Col>

            {/* Cart Summary */}
            <Col md={4}>
              <div className="cart-total">
                <h2>Cart Summary</h2>
                <div className="d_flex">
                  <h4>Total Price :</h4>
                  <h3>₹{totalPrice}.00</h3>
                </div>
              </div>
              <div>
                <Link to="/checkout">
                  <button className="btn btn-danger w-100 fw-semibold text-uppercase">
                    Checkout
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Cart;


// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Col, Container, Row } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   fetchCart,
//   addToBackendCart,
//   deleteFromBackendCart,
// } from "../app/features/cart/cartSlice";
// import Banner from "../components/Banner/Banner";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { cartList, loading } = useSelector((state) => state.cart);
//   const token = localStorage.getItem("accessToken");

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!token) {
//       toast.error("Please login to view your cart.");
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   // Fetch user cart on load
//   useEffect(() => {
//     if (token) {
//       dispatch(fetchCart());
//     }
//     window.scrollTo(0, 0);
//   }, [dispatch, token]);

//   // ✅ Handle quantity increase
//   const handleIncrease = async (item) => {
//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/api/cart/",
//         { product_id: item.id, quantity: item.quantity + 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       dispatch(fetchCart());
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//       toast.error("Failed to update quantity.");
//     }
//   };

//   // ✅ Handle quantity decrease
//   const handleDecrease = async (item) => {
//     if (item.quantity > 1) {
//       try {
//         await axios.post(
//           "http://127.0.0.1:8000/api/cart/",
//           { product_id: item.id, quantity: item.quantity - 1 },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         dispatch(fetchCart());
//       } catch (err) {
//         console.error("Error decreasing quantity:", err);
//         toast.error("Failed to decrease quantity.");
//       }
//     } else {
//       handleDelete(item);
//     }
//   };

//   // ✅ Handle delete
//   const handleDelete = async (item) => {
//     dispatch(deleteFromBackendCart(item.id))
//       .unwrap()
//       .then(() => toast.success(`${item.name} removed from cart`))
//       .catch(() => toast.error("Failed to delete item"));
//   };

//   // ✅ Calculate total
//   const totalPrice = cartList.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <>
//       <Banner title="Cart" />
//       <section className="cart-items">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md={8}>
//               {loading && <h3 className="text-center">Loading your cart...</h3>}

//               {!loading && cartList.length === 0 && (
//                 <h1 className="no-items product">No Items in Cart</h1>
//               )}

//               {cartList.map((item) => {
//                 const productQty = item.price * item.quantity;
//                 return (
//                   <div className="cart-list" key={item.id}>
//                     <Row>
//                       <Col className="image-holder" sm={4} md={3}>
//                         <img
//                           loading="lazy"
//                           src={
//                             item.image
//                               ? item.image.startsWith("http")
//                                 ? item.image
//                                 : `http://127.0.0.1:8000${item.image}`
//                               : "/placeholder.jpg"
//                           }
//                           alt={item.name}
//                         />
//                       </Col>
//                       <Col sm={8} md={9}>
//                         <Row className="cart-content justify-content-center">
//                           <Col xs={12} sm={9} className="cart-details">
//                             <h3>{item.name}</h3>
//                             <h4>
//                               ₹{item.price}.00 × {item.quantity}
//                               <span> ₹{productQty}.00</span>
//                             </h4>
//                           </Col>
//                           <Col xs={12} sm={3} className="cartControl">
//                             <button
//                               className="incCart"
//                               onClick={() => handleIncrease(item)}
//                             >
//                               <i className="fa-solid fa-plus"></i>
//                             </button>
//                             <button
//                               className="desCart"
//                               onClick={() => handleDecrease(item)}
//                             >
//                               <i className="fa-solid fa-minus"></i>
//                             </button>
//                           </Col>
//                         </Row>
//                       </Col>
//                       <button
//                         className="delete"
//                         onClick={() => handleDelete(item)}
//                       >
//                         <ion-icon name="close"></ion-icon>
//                       </button>
//                     </Row>
//                   </div>
//                 );
//               })}
//             </Col>

//             {/* Cart Summary */}
//             <Col md={4}>
//               <div className="cart-total">
//                 <h2>Cart Summary</h2>
//                 <div className="d_flex">
//                   <h4>Total Price :</h4>
//                   <h3>₹{totalPrice}.00</h3>
//                 </div>
//               </div>
//               <div>
//                 <Link to="/checkout">
//                   <button className="btn btn-danger w-100 fw-semibold text-uppercase">
//                     Checkout
//                   </button>
//                 </Link>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default Cart;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Col, Container, Row } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   addToCart,
//   decreaseQty,
//   deleteProduct,
// } from "../app/features/cart/cartSlice";
// import Banner from "../components/Banner/Banner";

// const Cart = () => {
//   const [cartList, setCartList] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const dispatch = useDispatch();

//   const token = localStorage.getItem("accessToken");

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/cart/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCartList(res.data);
//       setTotalPrice(
//         res.data.reduce((sum, item) => sum + item.price * item.quantity, 0)
//       );
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   const handleIncrease = async (item) => {
//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/api/cart/",
//         { product_id: item.id, quantity: item.quantity + 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart();
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//     }
//   };

//   const handleDecrease = async (item) => {
//     if (item.quantity > 1) {
//       try {
//         await axios.post(
//           "http://127.0.0.1:8000/api/cart/",
//           { product_id: item.id, quantity: item.quantity - 1 },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         fetchCart();
//       } catch (err) {
//         console.error("Error decreasing quantity:", err);
//       }
//     }
//   };

//   const handleDelete = async (item) => {
//     try {
//       await axios.delete("http://127.0.0.1:8000/api/cart/", {
//         data: { product_id: item.id },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCart();
//     } catch (err) {
//       console.error("Error deleting item:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <>
//       <Banner title="Cart" />
//       <section className="cart-items">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md={8}>
//               {cartList.length === 0 && (
//                 <h1 className="no-items product">No Items in Cart</h1>
//               )}
//               {cartList.map((item) => {
//                 const productQty = item.price * item.quantity;
//                 return (
//                   <div className="cart-list" key={item.id}>
//                     <Row>
//                       <Col className="image-holder" sm={4} md={3}>
//                         <img
//                           loading="lazy"
//                           src={
//                             item.image
//                               ? item.image.startsWith("http")
//                                 ? item.image
//                                 : `http://127.0.0.1:8000${item.image}`
//                               : "/placeholder.jpg"
//                           }
//                           alt={item.name}
//                         />
//                       </Col>
//                       <Col sm={8} md={9}>
//                         <Row className="cart-content justify-content-center">
//                           <Col xs={12} sm={9} className="cart-details">
//                             <h3>{item.name}</h3>
//                             <h4>
//                               ₹{item.price}.00 × {item.quantity}
//                               <span> ₹{productQty}.00</span>
//                             </h4>
//                           </Col>
//                           <Col xs={12} sm={3} className="cartControl">
//                             <button
//                               className="incCart"
//                               onClick={() => handleIncrease(item)}
//                             >
//                               <i className="fa-solid fa-plus"></i>
//                             </button>
//                             <button
//                               className="desCart"
//                               onClick={() => handleDecrease(item)}
//                             >
//                               <i className="fa-solid fa-minus"></i>
//                             </button>
//                           </Col>
//                         </Row>
//                       </Col>
//                       <button
//                         className="delete"
//                         onClick={() => handleDelete(item)}
//                       >
//                         <ion-icon name="close"></ion-icon>
//                       </button>
//                     </Row>
//                   </div>
//                 );
//               })}
//             </Col>
//             <Col md={4}>
//               <div className="cart-total">
//                 <h2>Cart Summary</h2>
//                 <div className="d_flex">
//                   <h4>Total Price :</h4>
//                   <h3>₹{totalPrice}.00</h3>
//                 </div>
//               </div>
//               <div>
//                 <Link to="/checkout">
//                   <button className="btn btn-danger w-100 fw-semibold text-uppercase">
//                     Checkout
//                   </button>
//                 </Link>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default Cart;
