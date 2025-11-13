import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useWindowScrollToTop();

  // ✅ Step 1: Fetch selected product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/productsview/${id}/`
        );
        setSelectedProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // ✅ Step 2: Fetch related products (only when selectedProduct is available)
  useEffect(() => {
    const fetchRelated = async () => {
      if (!selectedProduct) return;

      try {
        const { data: allProducts } = await axios.get(
          `http://127.0.0.1:8000/api/productsview/`
        );

        const related = allProducts.filter(
          (p) =>
            String(p.category) === String(selectedProduct.category) &&
            p.id !== selectedProduct.id
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelated();
  }, [selectedProduct]); // ✅ Correct dependency

  if (loading) {
    return (
      <div className="text-center py-5">
        <h3 className="text-secondary">Loading product details...</h3>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-5">
        <h3 className="text-danger">Product not found.</h3>
      </div>
    );
  }

  return (
    <Fragment>
      <Banner title={selectedProduct.name} />
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />

      {/* ✅ Related Products Section */}
      <section className="related-products my-5">
        <Container>
          <h3 className="mb-4 fw-semibold" style={{ color: "#45595b" }}>
            You might also like
          </h3>
          <ShopList productItems={relatedProducts} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Product;




