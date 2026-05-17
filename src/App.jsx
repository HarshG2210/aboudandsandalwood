import { Box, Center, Spinner } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import CartDrawer from "./components/ui/CartDrawer";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { fetchAddresses } from "./store/slices/addressSlice";
import { fetchCart } from "./store/slices/cartSlice";
import { fetchOrders } from "./store/slices/checkoutSlice";
import { fetchProducts } from "./store/slices/productsSlice";
import { fetchProfile } from "./store/slices/userSlice";
import { fetchWishlist } from "./store/slices/wishlistSlice";
import { useDispatch } from "react-redux";

// USER PAGES
const Home = lazy(() => import("./pages/Home/Home"));
const ProductListing = lazy(() => import("./pages/Products/ProductListing"));
const ProductDetail = lazy(() => import("./pages/Products/ProductDetail"));
const SpiritualExperience = lazy(() =>
  import("./pages/SpiritualExperience/SpiritualExperience")
);
const GlobalStore = lazy(() => import("./pages/GlobalStore"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const BlogDetail = lazy(() => import("./pages/Blog/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const CartCheckout = lazy(() => import("./pages/Checkout/CartCheckout"));
const UserProfile = lazy(() => import("./pages/Auth/UserProfile"));
const Register = lazy(() => import("./pages/Auth/Register"));
const VerifyOTP = lazy(() => import("./pages/Auth/VerifyOTP"));
const Login = lazy(() => import("./pages/Auth/Login"));
const CompleteProfile = lazy(() => import("./pages/Auth/CompleteProfile"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const VerifyForgotOtp = lazy(() => import("./pages/Auth/VerifyForgotOtp"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const AddressPage = lazy(() => import("./pages/Auth/AddressPage"));
const Orders = lazy(() => import("./pages/Auth/Orders"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist"));
const ReviewProduct = lazy(() => import("./pages/Review/ReviewProduct"));
const ProductsByTypePage = lazy(() =>
  import("./pages/Home/HeroSection/ProductsByTypePage")
);

const Loader = () => (
  <Center h="60vh">
    <Spinner size="xl" color="brand.400" thickness="3px" />
  </Center>
);

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());

    const token = localStorage.getItem("access_token");

    if (!token || token === "undefined" || token === "null") {
      return;
    }

    dispatch(fetchCart());
    dispatch(fetchProfile());
    dispatch(fetchAddresses());
    dispatch(fetchOrders());
    dispatch(fetchWishlist());
  }, [dispatch]);
  return (
    <Box minH="100vh" bg="ivory">
      <Navbar />
      <CartDrawer />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ================= USER ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-forgot-otp" element={<VerifyForgotOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/addresses" element={<AddressPage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<CartCheckout />} />
          <Route path="/spiritual" element={<SpiritualExperience />} />
          <Route path="/global" element={<GlobalStore />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products/:id/review" element={<ReviewProduct />} />
          <Route path="/products/type/:type" element={<ProductsByTypePage />} />
        </Routes>
      </Suspense>

      <Footer />
    </Box>
  );
}
