import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    town: "",
    payment_status: "", // will be set as success or failed
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // ✅ Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartList(res.data);
      setTotalPrice(
        res.data.reduce(
          (sum, item) => sum + item.product?.price * item.quantity,
          0
        )
      );
    } catch (err) {
      console.error("Error fetching cart:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  // ✅ Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Order Placement
  const handlePlaceOrder = async (status) => {
    // status => "success" or "failed"
    const { first_name, last_name, email, address, town } = formData;

    if (!first_name || !last_name || !email || !address || !town) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cartList.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (status === "failed") {
      toast.error("❌ Payment Failed. Redirecting to Cart...");
      navigate("/cart");
      return;
    }

    try {
      // 1️⃣ Save Billing Details
      await axios.post("http://127.0.0.1:8000/api/userdetails/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2️⃣ Place Order (only if success)
      await axios.post(
        "http://127.0.0.1:8000/api/order/",
        { payment_status: "success" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("🎉 Order placed successfully!");
      setTimeout(() => navigate("/summery"), 800);

      // 3️⃣ Clear Cart
      await axios.delete("http://127.0.0.1:8000/api/cart/clear/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCart();
      navigate("/summery");

    } catch (err) {
      console.error("Order placement failed:", err);
      // toast.error("Order failed. Try again.");
    }
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
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Last Name <sup className="text-danger">*</sup>
                </label>
                <input
                  type="text" 
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Address <sup className="text-danger">*</sup>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Town/City <sup className="text-danger">*</sup>
                </label>
                <input
                  type="text"
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Email Address <sup className="text-danger">*</sup>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
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

            <div
              className="d-flex justify-content-between fw-bold px-2 my-3"
              style={{ color: "#45595b" }}
            >
              <h5>Total</h5>
              <span>₹{totalPrice}</span>
            </div>

            {/* Pay Now Button */}
            <div className="mb-4">
              <button
                type="button"
                className="btn btn-danger w-100"
                data-bs-toggle="modal"
                data-bs-target="#paymentModal"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Payment Modal */}
      <div
        className="modal fade"
        id="paymentModal"
        tabIndex="-1"
        aria-labelledby="paymentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="paymentModalLabel">
                Payment Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body text-center">
              <p className="fw-semibold mb-3">
                Choose your payment status:
              </p>
              <button
                type="button"
                className="btn btn-success mx-2"
                data-bs-dismiss="modal"
                onClick={() => handlePlaceOrder("success")}
              >
                Success
              </button>
              <button
                type="button"
                className="btn btn-danger mx-2"
                data-bs-dismiss="modal"
                onClick={() => handlePlaceOrder("failed")}
              >
                Failed
              </button>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
