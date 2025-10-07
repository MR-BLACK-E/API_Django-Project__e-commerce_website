import React from "react";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container my-5 mt-5" style={{minHeight:"600px"}}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group shadow-sm">
            <h5 className="list-group-item fw-bold text-center bg-light">
              My Account
            </h5>
            <button className="list-group-item list-group-item-action">
              Profile Information
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate("/orders")}>
              My Orders
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate("/cart")}>
              Wishlist
            </button>
            <button className="list-group-item list-group-item-action">
              Saved Addresses
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate("/summery")}>
              Order Summery
            </button>
            <button
              className="list-group-item list-group-item-action text-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-3">Welcome, {user?.username || "User"} </h4>
            <p><strong>Email:</strong> {user?.email || "N/A"}</p>
            {/* <p><strong>Member since:</strong> Jan 2025</p> */}
            <hr />
            <h5>Quick Links</h5>
            <div className="d-flex flex-wrap gap-3 mt-3">
              <button
                onClick={() => navigate("/orders")}
                className="btn btn-outline-primary"
              >
                My Orders
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="btn btn-outline-warning"
              >
                My Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-outline-success"
              >
                Checkout
              </button>
              {/* <button
                onClick={() => navigate("/summery")}
                className="btn btn-outline-success"
              >
                Order Summery
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
