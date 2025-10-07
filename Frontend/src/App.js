import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Registration = lazy(() => import("./pages/Registration"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const OrderSummery = lazy(() => import("./pages/OrderSummery"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const UserAccount = lazy(() => import("./pages/UserAccount"));

const ProductList = lazy(() => import("./pages/ProductList"));

const ForgotPassword = lazy(() => import("./password/ForgotPassword"));
const ResetPassword = lazy(() => import("./password/ResetPassword"));


function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/productsview" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<ProtectedRoute><UserAccount/></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />
          <Route path="/summery" element={<ProtectedRoute><OrderSummery/></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
