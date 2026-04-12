import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Spinner, Center } from "@chakra-ui/react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/ui/CartDrawer";
const Home = lazy(() => import("./pages/Home"));
const ProductListing = lazy(() => import("./pages/ProductListing"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const SpiritualExperience = lazy(() => import("./pages/SpiritualExperience"));
const GlobalStore = lazy(() => import("./pages/GlobalStore"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const CartCheckout = lazy(() => import("./pages/CartCheckout"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Loader = () => (
  <Center h="60vh">
    <Spinner size="xl" color="brand.400" thickness="3px" />
  </Center>
);
export default function App() {
  return (
    <Box minH="100vh" bg="ivory">
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/spiritual" element={<SpiritualExperience />} />
          <Route path="/global" element={<GlobalStore />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CartCheckout />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Suspense>
      <Footer />
    </Box>
  );
}
