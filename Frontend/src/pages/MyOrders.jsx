// import React from 'react'
import Banner from "../components/Banner/Banner";
// import { Link } from 'react-router-dom'

import React from "react";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const { orders } = useSelector((state) => state.cart);

  // If no orders exist, show a message
  if (!orders || orders.length === 0) {
    return (
      <div className=" text-center">
        <Banner title="My Orders" /> 
    <h2 className="text-center mt-5 mb-5 text-danger">You don’t have any orders yet</h2>
    </div>
    )
  }

  return (
    <div>
      <Banner title="My Orders" />       
    <div className="container mt-5">

      {orders.map((order) => (
        <div key={order.id} className="card mb-4 p-3 shadow">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
          <p><strong>Total:</strong> ${order.total}</p>

          <h5>Items:</h5>
          <ul>
            {order.items.map((item) => (
              <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Products</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
      
          </thead>
          <tbody>
            <tr>
              <td>
                <img className="" style={{maxWidth:"90px"}} src={item.imgUrl} alt="" />
              </td>
              <td>{item.productName}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>${item.price * item.qty}</td>
            </tr>
            
            
          </tbody>
        </table>
              // <li key={item.id}>
              //   {item.productName} – {item.qty} × ${item.price} = ${item.qty * item.price}
              // </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MyOrders;


// import { useSelector } from "react-redux";

// const MyOrders = () => {
//   const { orders } = useSelector((state) => state.cart);

//   if (orders.length === 0) return <h3>No orders yet</h3>;

//   return (
//     <div className="container my-5">
//       <Banner title="My Orders" /> 
//       <h2>My Orders</h2>
//       {orders.map((order) => (
//         <div key={order.id} className="border p-3 mb-3">
//           <p><b>Order ID:</b> {order.id}</p>
//           <p><b>Date:</b> {order.date}</p>
//           <ul>
//             {order.products.map((item) => (
//               <li key={item.id}>
//                 {item.productName} - {item.qty} x ${item.price}
//               </li>
//             ))}
//           </ul>
//           <h5>Total: ${order.total}</h5>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyOrders;

// const MyOrders = () => {
//     return (
//         <div>
//             <Banner title="My Orders" />
//                 <div className="error m-auto text-center">
//                     {/* <span className='text-7xl'><i class="fa fa-exclamation-triangle" style={{color: '#ffb524'}}></i></span>
//                     <h2 className='font-bold text-7xl my-6' style={{color: '#45595b'}}>404</h2>
//                     <h1 className='font-semibold text-4xl' style={{color: '#45595b'}}>Page Not Found</h1>
//                     <p className='my-6 w-8/12 m-auto' style={{color: '#45595b'}}>We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
//                     <div className='w-fit m-auto border border-orange-400 rounded-full py-4 px-10 btn-error duration-500 font-semibold'><Link to='/'>Go Back To Home</Link></div> */}
//                 </div>
//         </div>
//     )
// }

// export default MyOrders
// import React from "react";

// const MyOrders = () => {
//   const orders = [
//     { id: 101, date: "2025-09-10", total: 45.99, status: "Delivered" },
//     { id: 102, date: "2025-09-05", total: 29.49, status: "Shipped" },
//   ];

//   return (
//     <div>
//        <Banner title="My Orders" /> 
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-6">My Orders</h1>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="p-3">Order ID</th>
//             <th className="p-3">Date</th>
//             <th className="p-3">Total</th>
//             <th className="p-3">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(order => (
//             <tr key={order.id} className="border-b">
//               <td className="p-3">#{order.id}</td>
//               <td className="p-3">{order.date}</td>
//               <td className="p-3">${order.total}</td>
//               <td className="p-3">{order.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// };

// export default MyOrders;

