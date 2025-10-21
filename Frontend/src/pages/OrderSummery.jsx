import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const fetchLatestOrder = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/summery/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(res.data);
    } catch (err) {
      console.error("Error fetching latest order:", err);
      if (err.response?.status === 404) {
        toast.error("No recent orders found.");
      } else if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error("Failed to load order summary.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
    fetchLatestOrder();
    window.scrollTo(0, 0);
  }, []);

  if (loading)
    return (
      <>
        <Banner title="Order Summary" />
        <div className="text-center py-5">
          <h3 className="text-secondary">Loading your order...</h3>
        </div>
      </>
    );

  if (!order)
    return (
      <>
        <Banner title="Order Summary" />
        <div className="text-center py-5">
          <h2 className="text-danger">No recent orders found.</h2>
        </div>
      </>
    );

  return (
    <>
      <Banner title="Order Summary" />
      <div className="container my-5">
        <div className="card shadow border-0">
          <div className="card-body">
            <h2 className="text-success mb-3">Order Summary</h2>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <h4 className="text-end text-warning fw-bold">
              Total: ₹{order.total_amount}
            </h4>

            <div className="table-responsive mt-4">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={
                            item.product.image
                              ? item.product.image.startsWith("http")
                                ? item.product.image
                                : `http://127.0.0.1:8000${item.product.image}`
                              : "/placeholder.jpg"
                          }
                          alt={item.product.name}
                          style={{ maxWidth: "90px" }}
                        />
                      </td>
                      <td>{item.product.name}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;

// import React from 'react'
// import Banner from "../components/Banner/Banner";
// // // import { testimonial } from '../../data/Data'

// // import React from "react";
// import { useSelector } from "react-redux";

// const OrderSummary = () => {
//   const { orders } = useSelector((state) => state.cart);

//   // Get last placed order
//   const lastOrder = orders && orders.length > 0 ? orders[orders.length - 1] : null;

//     if (!lastOrder) return (
//     <div className=''>
//         <Banner title="Order Summery" /> 
//         <h3 className="text-center mt-5 mb-5 text-danger">No recent orders</h3>
//     </div>    
//         );

//   return (
//     <>
//      <Banner title="Order Summery" /> 
//     <div className="container mt-5 my-5">
//       <div className="row">
//       <div className="col-lg-6 mb-4 place-items-center" style={{placeItems:"center"}}> 
//       <h2 className='text-success'>Order Summary</h2>
//       <p><strong>Order ID:</strong> {lastOrder.id}</p>
//       <p><strong>Date:</strong> {new Date(lastOrder.date).toLocaleString()}</p>
//       <p><strong>Total:</strong> ${lastOrder.total}</p>
//       </div>  
//       <div className="col-lg-6">
//         <div className="table-responsive shadow rounded">
//       <h3 className='text-center'>Items</h3>
//       <ul>
//         {lastOrder.items.map((item) => (
//             <table className="table table-bordered text-center align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>Products</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Qty</th>
//               <th>Total</th>
//             </tr>
      
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <img className="" style={{maxWidth:"100px"}} src={item.imgUrl} alt="" />
//               </td>
//               <td>{item.productName}</td>
//               <td>{item.price}</td>
//               <td>{item.qty}</td>
//               <td>${item.price * item.qty}</td>
//             </tr>
            
            
//           </tbody>
//         </table>
//         //   <li key={item.id}>
//         //     {item.productName} – {item.qty} × ${item.price} = ${item.qty * item.price}
//         //   </li>
//         ))}
//       </ul>
//       </div>
//       </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default OrderSummary;

