import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // ✅ Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartList(res.data);
      setTotalPrice(
        res.data.reduce((sum, item) => sum + item.product?.price * item.quantity, 0)
      );
    } catch (err) {
      console.error("Error fetching cart:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  // ✅ Handle placing the order (backend sync)
  const handlePlaceOrder = async () => {
    if (cartList.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
      try {
  const res = await axios.post(
    "http://127.0.0.1:8000/api/order/",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  toast.success("🎉 Order placed successfully!");

  // Try to clear cart, but don’t throw if it fails
  try {
    await axios.delete("http://127.0.0.1:8000/api/cart/clear/", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (cartErr) {
    console.warn("Cart clear failed:", cartErr);
  }

  fetchCart();
  navigate("/summery");
} catch (err) {
  console.error("Order placement failed:", err);
  toast.error("Failed to place order. Try again.");
}

    // try {
    //   const res = await axios.post(
    //     "http://127.0.0.1:8000/api/orders/",
    //     {}, // send empty data, backend should infer from user's cart
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   );

    //   toast.success("🎉 Order placed successfully!");
    //   console.log("Order placed:", res.data);

    //   // ✅ Optionally clear cart after order
    //   await axios.delete("http://127.0.0.1:8000/api/cart/clear/", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });

    //   // Refresh cart state
    //   fetchCart();
    //   navigate("/orders"); // if you have an order summary page
    // } catch (err) {
    //   console.error("Order placement failed:", err);
    //   toast.error("Failed to place order. Try again.");
    // }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
    fetchCart();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner title="Checkout Page" />

      <div className="container my-5">
        <h2 className="h2 fw-semibold mb-4 mt-5" style={{ color: "#45595b" }}>
          Billing details
        </h2>

        <div className="row">
          {/* Billing Form */}
          <div className="col-lg-7 mb-4" style={{ color: "#45595b" }}>
            <form>
              <div className="mb-3">
                <label className="form-label">
                  First Name <sup className="text-danger">*</sup>
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Last Name <sup className="text-danger">*</sup>
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Address <sup className="text-danger">*</sup>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="House Number Street Name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Town/City <sup className="text-danger">*</sup>
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Email Address <sup className="text-danger">*</sup>
                </label>
                <input type="email" className="form-control" />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-lg-5">
            <div className="table-responsive shadow rounded">
              {cartList.length === 0 ? (
                <h4>No items in cart</h4>
              ) : (
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={
                              item.product?.image
                                ? item.product.image.startsWith("http")
                                  ? item.product.image
                                  : `http://127.0.0.1:8000${item.product.image}`
                                : "/placeholder.jpg"
                            }
                            alt={item.product?.name}
                            style={{ maxWidth: 100 }}
                          />
                        </td>
                        <td>{item.product?.name}</td>
                        <td>₹{item.product?.price}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.product?.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Total */}
            <div
              className="d-flex justify-content-between fw-bold px-2 my-3"
              style={{ color: "#45595b" }}
            >
              <h5>Total</h5>
              <span>₹{totalPrice}</span>
            </div>

            <div className="text-center my-4">
              <button
                className="btn btn-warning w-100 fw-semibold text-uppercase"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
