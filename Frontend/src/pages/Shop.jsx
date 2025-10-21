import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [categories, setCategories] = useState([]);

  useWindowScrollToTop();

  // Fetch products & categories from Django
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get("http://127.0.0.1:8000/api/productsview/");
        const categoryRes = await axios.get("http://127.0.0.1:8000/api/categoriesview/");

        setProducts(productRes.data);
        setFilterList(productRes.data);
        setCategories(categoryRes.data);
      } catch (err) {
        console.error("Error fetching products or categories:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Banner title="Products" />
      <section className="filter-bar">
        <Container className="filter-bar-container">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect
                setFilterList={setFilterList}
                products={products}
                categories={categories}
              />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} products={products} />
            </Col>
          </Row>
        </Container>

        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;

// import React, { useState, useEffect, Fragment } from "react";
// import axios from "axios";
// import { Col, Container, Row } from "react-bootstrap";
// import FilterSelect from "../components/FilterSelect";
// import SearchBar from "../components/SeachBar/SearchBar";
// import ShopList from "../components/ShopList";
// import Banner from "../components/Banner/Banner";
// import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [filterList, setFilterList] = useState([]);

//   useWindowScrollToTop();

//   // Fetch all products from Django backend
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/productsview/")
//       .then((res) => {
//         setProducts(res.data);
//         setFilterList(res.data); // show all by default
//       })
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   return (
//     <Fragment>
//       <Banner title="Products" />
//       <section className="filter-bar">
//         <Container className="filter-bar-container">
//           <Row className="justify-content-center">
//             <Col md={4}>
//               {/* Filter and Search can use the full product list */}
//               <FilterSelect setFilterList={setFilterList} products={products} />
//             </Col>
//             <Col md={8}>
//               <SearchBar setFilterList={setFilterList} products={products} />
//             </Col>
//           </Row>
//         </Container>

//         <Container>
//           <ShopList productItems={filterList} />
//         </Container>
//       </section>
//     </Fragment>
//   );
// };

// export default Shop;
