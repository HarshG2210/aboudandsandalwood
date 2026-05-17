import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Grid,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import {
  fetchProductReviews,
  fetchUserReviews,
  selectAverageRating,
  selectProductReviews,
  selectTotalReviews,
} from "../../store/slices/reviewSlice";
import {
  fetchProducts,
  selectAllProducts,
} from "../../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import CustomerReviews from "../../components/ProductDetail/CustomerReviews";
import MyReviews from "../../components/ProductDetail/MyReviews";
import ProductGallery from "../../components/ProductDetail/ProductGallery";
import ProductInfo from "../../components/ProductDetail/ProductInfo";
import RelatedProducts from "../../components/ProductDetail/RelatedProducts";
import { addToCart } from "../../store/slices/cartSlice";
import { motion } from "framer-motion";
import { useCurrency } from "../../hooks/useCurrency";

const MotionBox = motion(Box);

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toast = useToast();

  const { format } = useCurrency();

  const bg = useColorModeValue("ivory", "gray.900");

  const allProducts = useSelector(selectAllProducts);

  const wishlist = useSelector((s) => s.wishlist.items || []);

  const reviews = useSelector(selectProductReviews);

  const userReviews = useSelector((s) => s.review.userReviews || []);

  const averageRating = useSelector(selectAverageRating);

  const totalReviews = useSelector(selectTotalReviews);

  const product = useMemo(
    () => allProducts.find((p) => String(p.id) === String(id)),
    [allProducts, id]
  );

  const related = useMemo(() => {
    if (!product) return [];

    return allProducts
      .filter((p) => p.id !== product.id && p.type === product.type)
      .slice(0, 6);
  }, [allProducts, product]);

  const [selectedImage, setSelectedImage] = useState(0);

  const [selectedVariant, setSelectedVariant] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [wishlistLoading, setWishlistLoading] = useState(false);

  // FETCH PRODUCTS

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  // DEFAULT VARIANT

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // FETCH REVIEWS

  useEffect(() => {
    if (product?.id) {
      dispatch(fetchProductReviews(product.id));

      dispatch(fetchUserReviews());
    }
  }, [dispatch, product?.id]);

  // ADD TO CART

  const handleAddToCart = useCallback(async () => {
    if (!selectedVariant) return;

    try {
      await dispatch(
        addToCart({
          productId: product.id,
          variantId: selectedVariant.id,
          quantity,
        })
      ).unwrap();

      toast({
        title: "Added to cart",
        status: "success",
      });
    } catch (err) {
      toast({
        title: "Failed",
        status: "error",
      });
    }
  }, [dispatch, product, quantity, selectedVariant, toast]);

  // WISHLIST

  const isWishlisted = useMemo(() => {
    return Array.isArray(wishlist)
      ? wishlist.some(
          (i) =>
            i.product?.id === product?.id &&
            i.variant?.id === selectedVariant?.id
        )
      : false;
  }, [wishlist, product, selectedVariant]);

  const handleWishlist = useCallback(
    async (e) => {
      e.preventDefault();

      e.stopPropagation();

      if (!selectedVariant || wishlistLoading) return;

      try {
        setWishlistLoading(true);

        if (isWishlisted) {
          await dispatch(
            removeFromWishlist({
              productId: product.id,
              variantId: selectedVariant.id,
            })
          ).unwrap();
        } else {
          await dispatch(
            addToWishlist({
              productId: product.id,
              variantId: selectedVariant.id,
            })
          ).unwrap();
        }

        await dispatch(fetchWishlist());

        toast({
          title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
          status: isWishlisted ? "info" : "success",
        });
      } catch (err) {
        toast({
          title: "Wishlist Error",
          status: "warning",
        });
      } finally {
        setWishlistLoading(false);
      }
    },
    [dispatch, isWishlisted, product, selectedVariant, toast, wishlistLoading]
  );

  // LOADING

  if (allProducts.length === 0) {
    return (
      <Box
        pt={32}
        minH="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  // NOT FOUND

  if (!product) {
    return (
      <Box pt={32} textAlign="center" minH="60vh">
        <Text
          fontFamily="'Cormorant Garamond', serif"
          fontSize="3xl"
          color="oud.700"
        >
          Product not found
        </Text>

        <Button as={Link} to="/products" variant="gold" mt={6}>
          Back to Collection
        </Button>
      </Box>
    );
  }

  return (
    <Box bg={bg} pt={24} minH="100vh">
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 10 }} py={8}>
        {/* BREADCRUMB */}

        <Breadcrumb
          mb={8}
          fontFamily="'Jost', sans-serif"
          fontSize="xs"
          color="oud.400"
          separator="/"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/products">
              Collection
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Text color="oud.700">{product.name}</Text>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* MAIN */}

        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={16} mb={24}>
          <ProductGallery
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            MotionBox={MotionBox}
          />

          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            handleWishlist={handleWishlist}
            wishlistLoading={wishlistLoading}
            isWishlisted={isWishlisted}
            averageRating={averageRating}
            totalReviews={totalReviews}
            format={format}
          />
        </Grid>

        <CustomerReviews
          reviews={reviews}
          totalReviews={totalReviews}
          averageRating={averageRating}
          navigate={navigate}
          product={product}
        />

        <MyReviews
          userReviews={userReviews}
          product={product}
          navigate={navigate}
        />

        <RelatedProducts related={related} />
      </Box>
    </Box>
  );
};

export default React.memo(ProductDetail);
