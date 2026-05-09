import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Grid,
  HStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  FiCheck,
  FiGlobe,
  FiHeart,
  FiPackage,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  selectAllProducts,
} from "../../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../components/ui/ProductCard";
import { addToCart } from "../../store/slices/cartSlice";
import { motion } from "framer-motion";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import { useCurrency } from "../../hooks/useCurrency";

const MotionBox = motion(Box);

export default function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const toast = useToast();

  const allProducts = useSelector(selectAllProducts);

  // ✅ PRODUCT FROM ROUTE PARAM
  const product = allProducts.find((p) => String(p.id) === String(id));

  const wishlist = useSelector((s) => s.wishlist.items);

  const { format } = useCurrency();

  const bg = useColorModeValue("ivory", "gray.900");

  const [selectedImage, setSelectedImage] = useState(0);

  const [selectedVariant, setSelectedVariant] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.some((i) => i.id === product?.id);

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  // ==========================================
  // DEFAULT VARIANT
  // ==========================================

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // ==========================================
  // RELATED PRODUCTS
  // ==========================================

  const related = product
    ? allProducts
        .filter((p) => p.id !== product.id && p.type === product.type)
        .slice(0, 6)
    : [];

  // ==========================================
  // LOADING
  // ==========================================

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

  // ==========================================
  // NOT FOUND
  // ==========================================

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

        <Button as={Link} to="/products" variant="gold" mt={6} size="sm">
          Back to Collection
        </Button>
      </Box>
    );
  }

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async () => {
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
  };

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
            <Text color="oud.700" noOfLines={1}>
              {product.name}
            </Text>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* MAIN GRID */}

        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={16} mb={24}>
          {/* IMAGE GALLERY */}

          <VStack spacing={4}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              w="full"
            >
              <Box
                borderRadius="2xl"
                overflow="hidden"
                h={{ base: "320px", md: "520px" }}
                bg="white"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                  fallbackSrc="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800"
                />
              </Box>
            </MotionBox>

            {product.images.length > 1 && (
              <HStack spacing={3}>
                {product.images.map((img, i) => (
                  <Box
                    key={i}
                    w="72px"
                    h="72px"
                    borderRadius="lg"
                    overflow="hidden"
                    border="2px solid"
                    borderColor={
                      selectedImage === i ? "brand.400" : "transparent"
                    }
                    cursor="pointer"
                    onClick={() => setSelectedImage(i)}
                    transition="border-color 0.2s"
                  >
                    <Image
                      src={img}
                      alt=""
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </HStack>
            )}
          </VStack>

          {/* PRODUCT INFO */}

          <VStack align="start" spacing={6}>
            <Box>
              <HStack mb={2} flexWrap="wrap" gap={2}>
                <Badge
                  bg={product.category === "agarwood" ? "oud.700" : "brand.400"}
                  color="white"
                  fontFamily="'Jost', sans-serif"
                  fontSize="9px"
                  letterSpacing="0.15em"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {product.category === "agarwood"
                    ? "Agarwood · Oud"
                    : "Sandalwood"}
                </Badge>

                {product.badge && (
                  <Badge
                    bg="brand.50"
                    color="brand.600"
                    fontFamily="'Jost', sans-serif"
                    fontSize="9px"
                    letterSpacing="0.15em"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {product.badge}
                  </Badge>
                )}
              </HStack>

              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="300"
                color="oud.900"
                lineHeight="1.1"
                mb={2}
              >
                {product.name}
              </Text>

              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="sm"
                color="oud.500"
                letterSpacing="0.05em"
              >
                {product.subtitle}
              </Text>
            </Box>

            {/* RATING */}

            <HStack spacing={2}>
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={14}
                  fill={
                    i < Math.round(product.rating)
                      ? "var(--chakra-colors-brand-400)"
                      : "none"
                  }
                  color="var(--chakra-colors-brand-400)"
                />
              ))}

              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="sm"
                color="oud.500"
              >
                {product.rating} · {product.reviews} reviews
              </Text>
            </HStack>

            {/* PRICE */}

            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize="4xl"
              fontWeight="400"
              color="brand.500"
            >
              {selectedVariant
                ? format({
                    INR: Number(selectedVariant.price) * quantity,
                  })
                : "N/A"}
            </Text>

            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="sm"
              color="oud.600"
              lineHeight="1.9"
            >
              {product.description}
            </Text>

            <Divider borderColor="brand.100" />

            {/* VARIANTS */}

            {product.variants && (
              <Box w="full">
                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  color="oud.600"
                  mb={3}
                >
                  Size / Quantity
                </Text>

                <HStack spacing={3} flexWrap="wrap">
                  {product.variants.map((v) => (
                    <Button
                      key={v.id}
                      size="sm"
                      variant={
                        selectedVariant?.id === v.id ? "gold" : "outline_gold"
                      }
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v.label}
                    </Button>
                  ))}
                </HStack>
              </Box>
            )}

            {/* QUANTITY */}

            <HStack spacing={4} w="full" flexWrap="wrap">
              <NumberInput
                min={1}
                max={selectedVariant?.stock || 1}
                value={quantity}
                onChange={(val) =>
                  setQuantity(
                    Math.min(Number(val), selectedVariant?.stock || 1)
                  )
                }
                maxW="120px"
              >
                <NumberInputField
                  fontFamily="'Jost', sans-serif"
                  border="1px solid"
                  borderColor="brand.200"
                />

                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Button
                variant="gold"
                size="lg"
                flex={1}
                leftIcon={<FiShoppingBag />}
                onClick={handleAddToCart}
                isDisabled={!selectedVariant || selectedVariant.stock === 0}
              >
                {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Bag"}
              </Button>

              <Button
                size="lg"
                variant="outline_gold"
                px={4}
                onClick={() =>
                  dispatch(
                    toggleWishlist({
                      id: product.id,
                      name: product.name,
                    })
                  )
                }
              >
                <FiHeart
                  fill={isWishlisted ? "currentColor" : "none"}
                  color="var(--chakra-colors-brand-500)"
                />
              </Button>
            </HStack>

            {/* STOCK */}

            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              color={selectedVariant?.stock < 10 ? "red.400" : "green.500"}
            >
              {selectedVariant?.stock < 10
                ? `Only ${selectedVariant?.stock} left in stock`
                : `In stock · ${selectedVariant?.stock} available`}
            </Text>

            <Divider borderColor="brand.100" />

            {/* QUICK INFO */}

            <SimpleGrid columns={2} spacing={4} w="full">
              {[
                {
                  label: "Origin",
                  value: product.origin,
                },
                {
                  label: "Grade",
                  value: product.grade,
                },
                {
                  label: "Scent Profile",
                  value: product.scent,
                },
                {
                  label: "Purpose",
                  value: product.purpose?.join(", "),
                },
              ].map((item) => (
                <Box key={item.label}>
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="9px"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    color="brand.400"
                    mb={1}
                  >
                    {item.label}
                  </Text>

                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    color="oud.700"
                    lineHeight="1.5"
                  >
                    {item.value}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            {/* FEATURES */}

            <HStack spacing={3} flexWrap="wrap">
              <HStack spacing={1}>
                <FiCheck size={12} color="var(--chakra-colors-green-500)" />

                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  color="oud.500"
                >
                  {product.sustainabilityNote}
                </Text>
              </HStack>

              <HStack spacing={1}>
                <FiGlobe size={12} color="var(--chakra-colors-brand-400)" />

                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  color="oud.500"
                >
                  Ships worldwide
                </Text>
              </HStack>

              <HStack spacing={1}>
                <FiPackage size={12} color="var(--chakra-colors-brand-400)" />

                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  color="oud.500"
                >
                  Gift packaging available
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Grid>

        {/* RELATED PRODUCTS */}

        {related.length > 0 && (
          <Box>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="300"
              color="oud.800"
              mb={8}
            >
              You May Also Like
            </Text>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Box>
    </Box>
  );
}
