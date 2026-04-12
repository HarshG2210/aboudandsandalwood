import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  Badge,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import {
  FiStar,
  FiHeart,
  FiShoppingBag,
  FiArrowLeft,
  FiCheck,
  FiGlobe,
  FiPackage,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { addToCart } from "../store/slices/cartSlice";
import { toggleWishlist } from "../store/slices/wishlistSlice";
import {
  selectProductById,
  selectAllProducts,
} from "../store/slices/productsSlice";
import { useCurrency } from "../hooks/useCurrency";
import ProductCard from "../components/ui/ProductCard";
const MotionBox = motion(Box);
export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const product = useSelector(selectProductById(id));
  const allProducts = useSelector(selectAllProducts);
  const wishlist = useSelector((s) => s.wishlist.items);
  const { format, currency } = useCurrency();
  const bg = useColorModeValue("ivory", "gray.900");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = wishlist.some((i) => i.id === product?.id);
  const related =
    product?.relatedIds
      ?.map((rid) => allProducts.find((p) => p.id === rid))
      .filter(Boolean) || [];
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
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        prices: product.prices,
        price: product.prices.INR,
        image: product.images[0],
        variant: selectedVariant,
        category: product.category,
        quantity,
      })
    );
    toast({
      title: "Added to bag",
      description: `${product.name}${
        selectedVariant ? ` · ${selectedVariant}` : ""
      }`,
      status: "success",
      duration: 2500,
      position: "bottom-right",
    });
  };
  return (
    <Box bg={bg} pt={24} minH="100vh">
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 10 }} py={8}>
        {/* Breadcrumb */}
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
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={16} mb={24}>
          {/* Image Gallery */}
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
          {/* Product Info */}
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

            {/* Rating */}
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
            {/* Price */}
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize="4xl"
              fontWeight="400"
              color="brand.500"
            >
              {format(product.prices)}
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
            {/* Variant selector */}
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
                      key={v}
                      size="sm"
                      variant={selectedVariant === v ? "gold" : "outline_gold"}
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v}
                    </Button>
                  ))}
                </HStack>
              </Box>
            )}
            {/* Quantity + Add to Cart */}
            <HStack spacing={4} w="full" flexWrap="wrap">
              <NumberInput
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(val) => setQuantity(Number(val))}
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
                isDisabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
              </Button>

              <Button
                size="lg"
                variant="outline_gold"
                px={4}
                onClick={() =>
                  dispatch(
                    toggleWishlist({ id: product.id, name: product.name })
                  )
                }
                aria-label="Wishlist"
              >
                <FiHeart
                  fill={isWishlisted ? "currentColor" : "none"}
                  color="var(--chakra-colors-brand-500)"
                />
              </Button>
            </HStack>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              color={product.stock < 10 ? "red.400" : "green.500"}
            >
              {product.stock < 10
                ? `Only ${product.stock} left in stock`
                : `In stock · ${product.stock} available`}
            </Text>
            <Divider borderColor="brand.100" />
            {/* Quick info grid */}
            <SimpleGrid columns={2} spacing={4} w="full">
              {[
                { label: "Origin", value: product.origin },
                { label: "Grade", value: product.grade },
                { label: "Scent Profile", value: product.scent },
                { label: "Purpose", value: product.purpose?.join(", ") },
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
        {/* Detail Tabs */}
        <Box mb={20}>
          <Tabs colorScheme="orange" variant="line">
            <TabList borderColor="brand.100">
              {["Description", "Details & Specs", "Shipping"].map((tab) => (
                <Tab
                  key={tab}
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  _selected={{ color: "brand.500", borderColor: "brand.400" }}
                >
                  {tab}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel px={0} py={8}>
                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="sm"
                  color="oud.600"
                  lineHeight="2"
                  maxW="720px"
                >
                  {product.longDescription}
                </Text>
              </TabPanel>
              <TabPanel px={0} py={8}>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={6}
                  maxW="600px"
                >
                  {[
                    [
                      "Category",
                      product.category === "agarwood"
                        ? "Agarwood (Oud)"
                        : "Sandalwood",
                    ],
                    ["Type", product.type],
                    ["Grade", product.grade],
                    ["Origin", product.origin],
                    ["Scent", product.scent],
                    product.beads && ["Bead Count", `${product.beads} beads`],
                    product.beadSize && ["Bead Size", product.beadSize],
                    ["Purpose", product.purpose?.join(" · ")],
                    ["Sustainability", product.sustainabilityNote],
                  ]
                    .filter(Boolean)
                    .map(([k, v]) => (
                      <HStack key={k} align="start" spacing={3}>
                        <Text
                          fontFamily="'Jost', sans-serif"
                          fontSize="xs"
                          letterSpacing="0.1em"
                          textTransform="uppercase"
                          color="brand.400"
                          minW="110px"
                        >
                          {k}
                        </Text>
                        <Text
                          fontFamily="'Jost', sans-serif"
                          fontSize="sm"
                          color="oud.700"
                        >
                          {v}
                        </Text>
                      </HStack>
                    ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel px={0} py={8}>
                <VStack align="start" spacing={4} maxW="560px">
                  {[
                    ["India", "3–5 business days", "Free above 999"],
                    [
                      "UAE & Middle East",
                      "5–8 business days",
                      "Free above AED 150",
                    ],
                    ["USA & Canada", "8–14 business days", "Free above $50"],
                    [
                      "Japan & China",
                      "7–12 business days",
                      "Flat rate shipping",
                    ],
                  ].map(([region, time, note]) => (
                    <HStack
                      key={region}
                      justify="space-between"
                      w="full"
                      py={3}
                      borderBottom="1px solid"
                      borderColor="brand.100"
                    >
                      <Box>
                        <Text
                          fontFamily="'Jost', sans-serif"
                          fontSize="sm"
                          fontWeight="500"
                          color="oud.800"
                        >
                          {region}
                        </Text>
                        <Text
                          fontFamily="'Jost', sans-serif"
                          fontSize="xs"
                          color="oud.500"
                        >
                          {note}
                        </Text>
                      </Box>
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        color="brand.500"
                      >
                        {time}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        {/* Related Products */}
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
