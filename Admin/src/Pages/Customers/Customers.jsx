import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './Customers.css'

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  // ✅ Fetch customers data
  const fetchCustomers = async () => {
    if (!token) {
      toast.error("Unauthorized! Please login as Admin.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/allcustomerslist/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-3 fw-semibold">Loading customers...</span>
      </div>
    );
  }

  return (
    <div className="container container1 my-5">
      <h2 className="fw-bold text-center mb-5">👥 Registered Customers</h2>

      {customers.length === 0 ? (
        <div className="text-center text-muted fs-5">No customers found.</div>
      ) : (
        <div className="row g-4">
          {customers.map((customer, index) => (
            <div className="col-md-4" key={index}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="fw-bold text-primary mb-2">
                    {customer.first_name} {customer.last_name}
                  </h5>
                  <p className="text-muted mb-1">
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p className="text-muted mb-1">
                    <strong>Address:</strong> {customer.address || "No address"}
                  </p>
                  <p className="text-muted">
                    <strong>Town:</strong> {customer.town || "No town"}
                  </p>
                </div>
                <div className="card-footer bg-light text-center">
                  <small className="text-secondary">
                    Registered Customer
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
