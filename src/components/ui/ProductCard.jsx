import {
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";

import { Link } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { motion } from "framer-motion";
import { useCurrency } from "../../hooks/useCurrency";

const MotionBox = motion(Box);

// ============================================
// BADGE COLORS
// ============================================

const badgeColors = {
  Bestseller: { bg: "brand.400", color: "white" },
  BESTSELLER: { bg: "brand.400", color: "white" },

  Rare: { bg: "oud.700", color: "brand.200" },

  "Top Rated": { bg: "green.500", color: "white" },

  Spiritual: { bg: "purple.500", color: "white" },

  Heritage: { bg: "orange.500", color: "white" },

  Pure: { bg: "teal.500", color: "white" },

  "Daily Use": { bg: "blue.500", color: "white" },

  Gifting: { bg: "pink.500", color: "white" },

  Value: { bg: "gray.500", color: "white" },

  Sacred: { bg: "red.500", color: "white" },

  NEW_ARRIVAL: {
    bg: "purple.500",
    color: "white",
  },
};

// ============================================
// COMPONENT
// ============================================

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const toast = useToast();

  const { format } = useCurrency();

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const wishlist = useSelector((s) => s.wishlist.items || []);

  // ============================================
  // SAFE DATA NORMALIZATION
  // ============================================

  const normalizedProduct = useMemo(() => {
    // IMAGE SUPPORT
    // OLD:
    // images: ["url"]
    //
    // NEW:
    // images: [{ image: "url" }]

    let image = "";

    if (Array.isArray(product.images)) {
      if (typeof product.images[0] === "string") {
        image = product.images[0];
      } else {
        image = product.images?.[0]?.image;
      }
    }

    // TYPE SUPPORT

    const productType = product.product_type || product.type || "";

    // DESCRIPTION SUPPORT

    const description = product.short_description || product.subtitle || "";

    // BADGE SUPPORT

    const badge = product.tags || product.badge || "";

    // CATEGORY SUPPORT

    const category = product.category || "";

    return {
      image,
      productType,
      description,
      badge,
      category,
    };
  }, [product]);

  // ============================================
  // PRICE LOGIC
  // ============================================

  const variants = product.variants || [];

  const minVariant =
    product.selectedVariant ||
    (variants.length > 0
      ? [...variants].sort((a, b) => Number(a.price) - Number(b.price))[0]
      : null);

  const displayPrice = minVariant
    ? format({ INR: Number(minVariant.price) })
    : product.prices
    ? format(product.prices)
    : "—";

  // ============================================
  // ADD TO CART
  // ============================================

  const handleAddToCart = async (e) => {
    e.preventDefault();

    e.stopPropagation();

    const variant = minVariant;

    if (!variant) return;

    try {
      await dispatch(
        addToCart({
          productId: product.id,
          variantId: variant.id,
          quantity: 1,
        })
      ).unwrap();

      toast({
        title: "Added to cart",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Failed to add item",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  // ============================================
  // BADGE COLOR
  // ============================================

  const bc = badgeColors[normalizedProduct.badge] || badgeColors["Value"];

  // ============================================
  // WISHLIST CHECK
  // ============================================

  const isWishlisted = Array.isArray(wishlist)
    ? wishlist.some(
        (i) =>
          i.product?.id === product.id &&
          (i.variant_detail?.id === minVariant?.id ||
            i.variant?.id === minVariant?.id)
      )
    : false;

  // ============================================
  // WISHLIST
  // ============================================

  const handleWishlist = async (e) => {
    e.preventDefault();

    e.stopPropagation();

    const variant = minVariant;

    if (!variant || wishlistLoading) return;

    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        const res = await dispatch(
          removeFromWishlist({
            productId: product.id,
            variantId: variant.id,
          })
        ).unwrap();

        toast({
          title: "Removed from wishlist",
          description: res?.detail || "Item removed successfully",
          status: "info",
          duration: 2500,
          isClosable: true,
        });
      } else {
        const res = await dispatch(
          addToWishlist({
            productId: product.id,
            variantId: variant.id,
          })
        ).unwrap();

        toast({
          title: "Wishlist Updated",
          description:
            res?.detail || res?.message || "Added to wishlist successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      }

      await dispatch(fetchWishlist());
    } catch (err) {
      console.log("❌ WISHLIST ERROR", err);

      toast({
        title: "Wishlist",
        description: err?.detail || err?.message || "Something went wrong",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setWishlistLoading(false);
    }
  };

  // ============================================
  // CATEGORY LABEL
  // ============================================

  const categoryLabel =
    normalizedProduct.category?.toUpperCase() === "AGARWOOD"
      ? "Agarwood · Oud"
      : "Sandalwood";

  return (
    <MotionBox whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link to={`/products/${product.id}`}>
        <Box
          bg="white"
          borderRadius="xl"
          overflow="hidden"
          border="1px solid"
          borderColor="brand.100"
          boxShadow="0 2px 16px rgba(138,109,77,0.06)"
          _hover={{
            boxShadow: "0 8px 40px rgba(138,109,77,0.14)",
            borderColor: "brand.200",
          }}
          transition="all 0.3s ease"
          position="relative"
          role="group"
        >
          {/* IMAGE */}

          <Box
            position="relative"
            overflow="hidden"
            h={{ base: "220px", md: "260px" }}
          >
            <Image
              src={normalizedProduct.image}
              alt={product.name}
              w="full"
              h="full"
              objectFit="cover"
              transition="transform 0.5s ease"
              _groupHover={{
                transform: "scale(1.06)",
              }}
              fallbackSrc="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
            />

            {/* OVERLAY */}

            <Box
              position="absolute"
              inset={0}
              bg="rgba(30,21,3,0.28)"
              opacity={0}
              transition="opacity 0.3s"
              _groupHover={{ opacity: 1 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="gold"
                size="sm"
                onClick={handleAddToCart}
                leftIcon={<FiShoppingBag />}
              >
                Add to Bag
              </Button>
            </Box>

            {/* BADGE */}

            {normalizedProduct.badge && (
              <Badge
                position="absolute"
                top={3}
                left={3}
                bg={bc.bg}
                color={bc.color}
                fontFamily="'Jost', sans-serif"
                fontSize="9px"
                letterSpacing="0.12em"
                px={2}
                py={1}
                borderRadius="full"
                textTransform="uppercase"
              >
                {normalizedProduct.badge.replaceAll("_", " ")}
              </Badge>
            )}

            {/* WISHLIST */}

            <IconButton
              icon={<FiHeart fill={isWishlisted ? "currentColor" : "none"} />}
              position="absolute"
              top={2}
              right={2}
              size="sm"
              variant="ghost"
              color={isWishlisted ? "red.400" : "white"}
              bg="rgba(255,255,255,0.85)"
              backdropFilter="blur(4px)"
              borderRadius="full"
              opacity={1}
              transition="opacity 0.2s"
              onClick={handleWishlist}
              aria-label="Wishlist"
              isLoading={wishlistLoading}
              isDisabled={wishlistLoading}
            />
          </Box>

          {/* INFO */}

          <VStack align="start" spacing={2} p={4}>
            {/* TOP META */}

            <HStack justify="space-between" w="full" align="start">
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="9px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="brand.400"
                fontWeight="600"
              >
                {categoryLabel}
                {" · "}
                {normalizedProduct.productType}
              </Text>

              <HStack spacing={1}>
                <FiStar
                  size={10}
                  color="var(--chakra-colors-brand-400)"
                  fill="var(--chakra-colors-brand-400)"
                />

                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="10px"
                  color="oud.500"
                >
                  {product.rating || 0}
                </Text>
              </HStack>
            </HStack>

            {/* NAME */}

            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="500"
              color="oud.800"
              lineHeight="1.2"
              noOfLines={2}
            >
              {product.name}
            </Text>

            {/* DESCRIPTION */}

            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              color="oud.500"
              noOfLines={2}
              lineHeight="1.7"
            >
              {normalizedProduct.description}
            </Text>

            {/* PRICE */}

            <HStack justify="space-between" w="full" pt={2}>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="xl"
                fontWeight="600"
                color="brand.500"
              >
                {displayPrice}
              </Text>

              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="10px"
                color="oud.400"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                {product.origin}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Link>
    </MotionBox>
  );
}
