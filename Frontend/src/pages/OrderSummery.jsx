import React from 'react'
import Banner from "../components/Banner/Banner";
// // import { testimonial } from '../../data/Data'

// import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const { orders } = useSelector((state) => state.cart);

  // Get last placed order
  const lastOrder = orders && orders.length > 0 ? orders[orders.length - 1] : null;

    if (!lastOrder) return (
    <div className=''>
        <Banner title="Order Summery" /> 
        <h3 className="text-center mt-5 mb-5 text-danger">No recent orders</h3>
    </div>    
        );

  return (
    <>
     <Banner title="Order Summery" /> 
    <div className="container mt-5 my-5">
      <div className="row">
      <div className="col-lg-6 mb-4 place-items-center" style={{placeItems:"center"}}> 
      <h2 className='text-success'>Order Summary</h2>
      <p><strong>Order ID:</strong> {lastOrder.id}</p>
      <p><strong>Date:</strong> {new Date(lastOrder.date).toLocaleString()}</p>
      <p><strong>Total:</strong> ${lastOrder.total}</p>
      </div>  
      <div className="col-lg-6">
        <div className="table-responsive shadow rounded">
      <h3 className='text-center'>Items</h3>
      <ul>
        {lastOrder.items.map((item) => (
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
                <img className="" style={{maxWidth:"100px"}} src={item.imgUrl} alt="" />
              </td>
              <td>{item.productName}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>${item.price * item.qty}</td>
            </tr>
            
            
          </tbody>
        </table>
        //   <li key={item.id}>
        //     {item.productName} – {item.qty} × ${item.price} = ${item.qty * item.price}
        //   </li>
        ))}
      </ul>
      </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default OrderSummary;


// const OrderSummery = () => {
//     return (
//         <div>
//              <Banner title="Order Summery" /> 

//         </div>
//     )
// }

// export default OrderSummery

// import { useSelector } from "react-redux";

// const OrderSummary = () => {
//   const { orders } = useSelector((state) => state.cart);
//   const lastOrder = orders[orders.length - 1];

//   if (!lastOrder) return (
//     <div>
//         <Banner title="Order Summery" /> 
//         <h3 className="text-center mt-5 mb-5">No recent orders</h3>
//     </div>    
//         );

//   return (
//     <div>
//         <Banner title="Order Summery" /> 
    
//     <div className="container my-5">
//       <h2>Order Summary</h2>
//       <p>Order ID: {lastOrder.id}</p>
//       <p>Date: {lastOrder.date}</p>
//       <ul>
//         {lastOrder.products.map((item) => (
//           <li key={item.id}>
//             {item.productName} - {item.qty} x ${item.price}
//           </li>
//         ))}
//       </ul>
//       <h3>Total: ${lastOrder.total}</h3>
//     </div>
//     </div>
//   );
// };

// export default OrderSummary;

