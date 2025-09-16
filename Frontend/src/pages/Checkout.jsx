import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../app/features/cart/cartSlice";
import Banner from "../components/Banner/Banner";


const Checkout = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const handlePlaceOrder = () => {
    dispatch(placeOrder());
    alert("Order placed successfully!");
  };

  return (
    <div>
    {/* <div className="container my-5">
      <h2>Checkout</h2>
      {cartList.length === 0 ? (
        <h4>No items in cart</h4>
      ) : (
        <>
          <ul>
            {cartList.map((item) => (
              <li key={item.id}>
                {item.productName} x {item.qty} = ${item.price * item.qty}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice}</h3>
          <button className="btn btn-success" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
      </div> */}
    {/* </div>
  );
};

export default Checkout;


import React from 'react'

const Checkout = () => {
  
    return (
      <div> */}
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
            Company Name <sup className="text-danger">*</sup>
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
            Country <sup className="text-danger">*</sup>
          </label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Postcode/Zip <sup className="text-danger">*</sup>
          </label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Mobile <sup className="text-danger">*</sup>
          </label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Email Address <sup className="text-danger">*</sup>
          </label>
          <input type="email" className="form-control" />
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="account" />
          <label className="form-check-label" htmlFor="account">
            Create an account?
          </label>
        </div>

        <hr />

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="ship" />
          <label className="form-check-label" htmlFor="ship">
            Ship to a different address?
          </label>
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Order Notes (Optional)"
          ></textarea>
        </div>
      </form>
    </div>

    {/* Order Summary */}
    <div className="col-lg-5">      
      <div className="table-responsive shadow rounded">
        {cartList.length === 0 ? (
        <h4>No items in cart</h4>
      ) : (
        <>
        {cartList.map((item) => (
              // <li key={item.id}>
              //   {item.productName} x {item.qty} = ${item.price * item.qty}
              // </li>
            
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
        ))}
        </>
        )}
      </div>
      
      {/* Subtotal */}
      <div className="d-flex justify-content-between px-2 my-3 fw-semibold" style={{ color: "#45595b" }}>
        <h5>Subtotal</h5>
        <span>${totalPrice}</span>
      </div>
      <hr />

      {/* Shipping */}
      <div className="my-3 px-2" style={{ color: "#45595b" }}>
        <h5>Shipping</h5>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="free" />
          <label className="form-check-label" htmlFor="free">
            Free Shipping
          </label>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="flat" />
          <label className="form-check-label" htmlFor="flat">
            Flat rate: $15.00
          </label>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="local" />
          <label className="form-check-label" htmlFor="local">
            Local Pickup: $8.00
          </label>
        </div>
      </div>
      <hr />

      {/* Total */}
      <div className="d-flex justify-content-between fw-bold px-2 my-3" style={{ color: "#45595b" }}>
        <h5>Total</h5>
        <span>${totalPrice}</span>
      </div>
      <hr />

      {/* Payment Methods */}
      <div className="px-2" style={{ color: "#45595b" }}>
        <div className="form-check mb-2">
          <input type="checkbox" className="form-check-input" id="direct" />
          <label className="form-check-label" htmlFor="direct">
            Direct Bank Transfer
          </label>
        </div>
        <p className="small">
          Make your payment directly into our bank account. Please use your
          Order ID as the payment reference. Your order will not be shipped
          until the funds have cleared in our account.
        </p>
      </div>
      <hr />

      <div className="form-check px-2 my-2" style={{ color: "#45595b" }}>
        <input type="checkbox" className="form-check-input" id="check" />
        <label className="form-check-label" htmlFor="check">
          Check Payments
        </label>
      </div>
      <hr />

      <div className="form-check px-2 my-2" style={{ color: "#45595b" }}>
        <input type="checkbox" className="form-check-input" id="cash" />
        <label className="form-check-label" htmlFor="cash">
          Cash On Delivery
        </label>
      </div>
      <hr />

      <div className="form-check px-2 my-2" style={{ color: "#45595b" }}>
        <input type="checkbox" className="form-check-input" id="pay" />
        <label className="form-check-label" htmlFor="pay">
          Paypal
        </label>
      </div>
      <hr />

      <div className="text-center my-4">
        <button className="btn btn-warning w-100 fw-semibold text-uppercase" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
      
    </div>
  </div>
</div>

       
        
      </div> 
    )
}

export default Checkout
