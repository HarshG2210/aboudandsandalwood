import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import {
  fetchWishlist,
  removeFromWishlist,
  selectWishlist,
} from "../../store/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { motion } from "framer-motion";
import { useCurrency } from "../../hooks/useCurrency";

const MotionBox = motion(Box);

const badgeColors = {
  Bestseller: { bg: "brand.400", color: "white" },
  Rare: { bg: "oud.700", color: "brand.200" },
  "Top Rated": { bg: "green.500", color: "white" },
  Spiritual: { bg: "purple.500", color: "white" },
  Heritage: { bg: "orange.500", color: "white" },
  Pure: { bg: "teal.500", color: "white" },
  "Daily Use": { bg: "blue.500", color: "white" },
  Gifting: { bg: "pink.500", color: "white" },
  Value: { bg: "gray.500", color: "white" },
  Sacred: { bg: "red.500", color: "white" },
};

export default function Wishlist() {
  const dispatch = useDispatch();
  const toast = useToast();

  const { format } = useCurrency();

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const wishlist = useSelector(selectWishlist);

  const items = wishlist || [];

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token || token === "undefined" || token === "null") {
      return;
    }

    dispatch(fetchWishlist());
  }, [dispatch]);

  // ================= REMOVE WISHLIST =================

  const handleRemoveWishlist = async ({ productId, variantId }) => {
    const key = `${productId}-${variantId}`;

    try {
      setWishlistLoading((prev) => ({
        ...prev,
        [key]: true,
      }));

      await dispatch(
        removeFromWishlist({
          productId,
          variantId,
        })
      ).unwrap();

      toast({
        title: "Removed from wishlist",
        status: "info",
        duration: 2500,
        isClosable: true,
      });

      dispatch(fetchWishlist());
    } catch (err) {
      toast({
        title: "Failed",
        description: "Unable to remove item",
        status: "error",
      });
    } finally {
      setWishlistLoading((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  };

  // ================= ADD TO CART =================

  const handleAddToCart = async ({ productId, variantId }) => {
    try {
      await dispatch(
        addToCart({
          productId,
          variantId,
          quantity: 1,
        })
      ).unwrap();

      toast({
        title: "Added to cart",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Failed",
        status: "error",
      });
    }
  };

  return (
    <Box p={{ base: 4, md: 10 }}>
      {/* HEADER */}

      <VStack align="start" mb={8}>
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          color="oud.800"
        >
          Your Wishlist ❤️
        </Text>

        <Text color="gray.500">
          {items.length} item
          {items.length !== 1 ? "s" : ""} saved
        </Text>
      </VStack>

      {/* EMPTY */}

      {items.length === 0 ? (
        <Box
          bg="white"
          p={10}
          borderRadius="2xl"
          textAlign="center"
          border="1px solid"
          borderColor="gray.100"
        >
          <Text fontSize="xl" fontWeight="600">
            Your wishlist is empty
          </Text>

          <Text color="gray.500" mt={2}>
            Add products to see them here.
          </Text>
        </Box>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
            xl: "repeat(4,1fr)",
          }}
          gap={6}
        >
          {items.map((item) => {
            if (!item?.product) return null;

            const product = item.product;

            const variant = item.variant_detail || item.variant;

            const loadingKey = `${product.id}-${variant?.id}`;

            const isRemoving = wishlistLoading[loadingKey] || false;

            const images = Array.isArray(product.images)
              ? product.images.map((img) => img.image)
              : [];

            const badge =
              product.tags?.replaceAll("_", " ")?.toUpperCase() || "Value";

            const bc = badgeColors[badge] || badgeColors["Value"];

            return (
              <MotionBox
                key={`${product.id}-${variant?.id}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
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
                      h={{
                        base: "220px",
                        md: "260px",
                      }}
                    >
                      <Image
                        src={images[0]}
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
                          onClick={(e) => {
                            e.preventDefault();

                            handleAddToCart({
                              productId: product.id,
                              variantId: variant?.id,
                            });
                          }}
                          leftIcon={<FiShoppingBag />}
                        >
                          Add to Bag
                        </Button>
                      </Box>
                      {/* BADGE */}
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
                      >
                        {badge}
                      </Badge>
                      {/* WISHLIST */}
                      <IconButton
                        icon={<FiHeart fill="currentColor" />}
                        position="absolute"
                        top={2}
                        right={2}
                        size="sm"
                        variant="ghost"
                        color="red.400"
                        bg="rgba(255,255,255,0.85)"
                        backdropFilter="blur(4px)"
                        borderRadius="full"
                        opacity={1}
                        transition="opacity 0.2s"
                        aria-label="Wishlist"
                        isLoading={isRemoving}
                        isDisabled={isRemoving}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          handleRemoveWishlist({
                            productId: product.id,
                            variantId: variant?.id,
                          });
                        }}
                      />
                    </Box>

                    {/* INFO */}

                    <VStack align="start" spacing={2} p={4}>
                      <HStack justify="space-between" w="full">
                        <Text
                          fontFamily="'Jost', sans-serif"
                          fontSize="9px"
                          letterSpacing="0.2em"
                          textTransform="uppercase"
                          color="brand.400"
                          fontWeight="600"
                        >
                          {product.category === "agarwood"
                            ? "Agarwood · Oud"
                            : "Sandalwood"}
                          {" · "}
                          {product.product_type}
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
                            4.8 (120)
                          </Text>
                        </HStack>
                      </HStack>

                      {/* PRODUCT NAME */}

                      <Text
                        fontFamily="'Cormorant Garamond', serif"
                        fontSize={{
                          base: "lg",
                          md: "xl",
                        }}
                        fontWeight="400"
                        color="oud.800"
                        lineHeight="1.2"
                        noOfLines={2}
                      >
                        {product.name}
                      </Text>

                      {/* SUBTITLE */}

                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        color="oud.500"
                        noOfLines={2}
                        lineHeight="1.6"
                      >
                        {product.short_description}
                      </Text>

                      {/* VARIANT */}

                      <Badge
                        bg="brand.50"
                        color="brand.600"
                        fontSize="10px"
                        borderRadius="full"
                        px={2}
                        py={1}
                      >
                        {variant?.label}
                      </Badge>

                      {/* PRICE */}

                      <HStack justify="space-between" w="full" pt={1}>
                        <Text
                          fontFamily="'Cormorant Garamond', serif"
                          fontSize="xl"
                          fontWeight="500"
                          color="brand.500"
                        >
                          {format({
                            INR: Number(variant?.price || 0),
                          })}
                        </Text>

                        <Text
                          fontFamily="'Jost', sans-serif"
                          fontSize="9px"
                          color="oud.400"
                        >
                          {product.origin}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Link>
              </MotionBox>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
