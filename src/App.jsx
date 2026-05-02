import { Box, Center, Spinner } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AdminLayout from "./admin/layout/AdminLayout";
import AdminRoute from "./admin/routes/AdminRoute";
import CartDrawer from "./components/ui/CartDrawer";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

// USER PAGES
const Home = lazy(() => import("./pages/Home"));
const ProductListing = lazy(() => import("./pages/ProductListing"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const SpiritualExperience = lazy(() => import("./pages/SpiritualExperience"));
const GlobalStore = lazy(() => import("./pages/GlobalStore"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const CartCheckout = lazy(() => import("./pages/CartCheckout"));
const UserProfile = lazy(() => import("./pages/Auth/UserProfile"));
const Register = lazy(() => import("./pages/Auth/Register"));
const VerifyOTP = lazy(() => import("./pages/Auth/VerifyOTP"));
const Login = lazy(() => import("./pages/Auth/Login"));
const CompleteProfile = lazy(() => import("./pages/Auth/CompleteProfile"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const AddressPage = lazy(() => import("./pages/Auth/AddressPage"));

// ADMIN
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminHome = lazy(() => import("./admin/pages/AdminHome"));
const AdminProducts = lazy(() =>
  import("./admin/pages/products/AdminProducts")
);
const AdminOrders = lazy(() => import("./admin/pages/AdminOrders"));
const AdminUsers = lazy(() => import("./admin/pages/AdminUsers"));
const AdminProductDetail = lazy(() =>
  import("./admin/pages//products/AdminProductDetail")
);

const Loader = () => (
  <Center h="60vh">
    <Spinner size="xl" color="brand.400" thickness="3px" />
  </Center>
);

export default function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Box minH="100vh" bg="ivory">
      {/* ✅ USER LAYOUT ONLY */}
      {!isAdminRoute && (
        <>
          <Navbar />
          <CartDrawer />
        </>
      )}

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ================= USER ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/addresses" element={<AddressPage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/spiritual" element={<SpiritualExperience />} />
          <Route path="/global" element={<GlobalStore />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CartCheckout />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route element={<AdminDashboard />}>
              <Route index element={<AdminHome />} />
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:id" element={<AdminProductDetail />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>

      {/* ✅ USER FOOTER ONLY */}
      {!isAdminRoute && <Footer />}
    </Box>
  );
}
