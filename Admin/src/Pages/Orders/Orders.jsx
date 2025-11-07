import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './Orders.css'

const Orders = () => {
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem("adminToken");

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/customersorder/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      toast.error("Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="fw-bold mb-4 text-center">Orders</h1>

      {customers.length === 0 ? (
        <div className="text-center text-muted">No customers found.</div>
      ) : (
        <div className="ordercontainer">
          {customers.map((customer) => (
            <div key={customer.id} className="col-lg-10 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="fw-bold">
                    {customer.first_name} {customer.last_name}
                  </h5>
                  <p className="text-muted mb-1">{customer.email}</p>
                  <p className="text-muted mb-1">
                    🏠 {customer.address || "No address"}
                  </p>
                  <p className="text-muted">🏙️ {customer.town || "No town"}</p>
                  <hr />

                  <h6 className="fw-semibold mb-2">Orders:</h6>
                  {customer.orders && customer.orders.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {customer.orders.map((order) => (
                        <li
                          key={order.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <strong>Order #{order.id}</strong> <br />
                            <span className="text-muted small">
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-end">
                            <span className="badge bg-primary me-2">
                              ₹{order.total_amount}
                            </span>
                            <span
                              className={`badge ${
                                order.status === "Delivered"
                                  ? "bg-success"
                                  : order.status === "Pending"
                                  ? "bg-warning text-dark"
                                  : "bg-secondary"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted small mb-0">No orders yet.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

