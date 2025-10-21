import React, { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useWindowScrollToTop();

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/productsview/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Example filtering logic (you can change it)
  const discountProducts = products.filter((item) => item.discount && item.discount > 0);
  const newArrivals = products.slice(-6); // last 6 items
  const bestSales = products
    .filter((item) => item.price > 5000) // sample logic
    .slice(0, 6);

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />

      <Section title="Big Discount" bgColor="#f6f9fc" productItems={discountProducts} />

      <Section title="New Arrivals" bgColor="white" productItems={newArrivals} />

      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;

// import react, {  Fragment } from "react";
// import Wrapper from "../components/wrapper/Wrapper";
// import Section from "../components/Section";
// import { products, discoutProducts } from "../utils/products";
// import SliderHome from "../components/Slider";
// import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
// import axios from "axios";

// const Home = () => {
//   const newArrivalData = products.filter(
//     (item) => item.category === "mobile" || item.category === "Earphones"
//   );
//   const bestSales = products.filter((item) => item.category === "Laptop");
//   useWindowScrollToTop();
 

//   return (
//     <Fragment>
//       <SliderHome />
//       <Wrapper />
//       <Section
//         title="Big Discount"
//         bgColor="#f6f9fc"
//         productItems={discoutProducts}
//       />
//       <Section
//         title="New Arrivals"
//         bgColor="white"
//         productItems={newArrivalData}
//       />
//       <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
//     </Fragment>
//   );
// };

// export default Home;
