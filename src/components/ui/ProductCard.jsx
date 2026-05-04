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
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import React from "react";
import { addToCart } from "../../store/slices/cartSlice";
import { motion } from "framer-motion";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
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
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { format } = useCurrency();
  const wishlist = useSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        prices: product.prices,
        price: product.prices.INR,
        image: product.images[0],
        variant: product.variants?.[0] || null,
        category: product.category,
      })
    );
    toast({
      title: "Added to bag",
      description: product.name,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
  };
  const bc = badgeColors[product.badge] || badgeColors["Value"];
  return (
    <MotionBox whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link to={`/products/${product.id}`}>
        {" "}
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
          {/* Image */}
          <Box
            position="relative"
            overflow="hidden"
            h={{ base: "220px", md: "260px" }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              w="full"
              h="full"
              objectFit="cover"
              transition="transform 0.5s ease"
              _groupHover={{ transform: "scale(1.06)" }}
              fallbackSrc="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
            />
            {/* Overlay on hover */}
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
            {/* Badge */}
            {product.badge && (
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
                {product.badge}
              </Badge>
            )}
            {/* Wishlist */}
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
              opacity={0}
              _groupHover={{ opacity: 1 }}
              transition="opacity 0.2s"
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  toggleWishlist({ id: product.id, name: product.name })
                );
              }}
              aria-label="Wishlist"
            />
          </Box>
          {/* Info */}
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
                {product.type}{" "}
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
                  {product.rating} ({product.reviews})
                </Text>
              </HStack>
            </HStack>

            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="400"
              color="oud.800"
              lineHeight="1.2"
              noOfLines={2}
            >
              {product.name}
            </Text>

            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              color="oud.500"
              noOfLines={2}
              lineHeight="1.6"
            >
              {product.subtitle}
            </Text>

            <HStack justify="space-between" w="full" pt={1}>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="xl"
                fontWeight="500"
                color="brand.500"
              >
                {format(product.prices)}
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
}