import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiCheck,
  FiGlobe,
  FiHeart,
  FiPackage,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";

import React from "react";

const ProductInfo = ({
  product,
  selectedVariant,
  setSelectedVariant,
  quantity,
  setQuantity,
  handleAddToCart,
  handleWishlist,
  wishlistLoading,
  isWishlisted,
  averageRating,
  totalReviews,
  format,
}) => {
  return (
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
            {product.category === "agarwood" ? "Agarwood · Oud" : "Sandalwood"}
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
              i < Math.round(averageRating)
                ? "var(--chakra-colors-brand-400)"
                : "none"
            }
            color="var(--chakra-colors-brand-400)"
          />
        ))}

        <Text fontFamily="'Jost', sans-serif" fontSize="sm" color="oud.500">
          {averageRating || 0} · {totalReviews} reviews
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
                variant={selectedVariant?.id === v.id ? "gold" : "outline_gold"}
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
            setQuantity(Math.min(Number(val), selectedVariant?.stock || 1))
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
          onClick={handleWishlist}
          isLoading={wishlistLoading}
          isDisabled={wishlistLoading}
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

          <Text fontFamily="'Jost', sans-serif" fontSize="xs" color="oud.500">
            {product.sustainabilityNote}
          </Text>
        </HStack>

        <HStack spacing={1}>
          <FiGlobe size={12} color="var(--chakra-colors-brand-400)" />

          <Text fontFamily="'Jost', sans-serif" fontSize="xs" color="oud.500">
            Ships worldwide
          </Text>
        </HStack>

        <HStack spacing={1}>
          <FiPackage size={12} color="var(--chakra-colors-brand-400)" />

          <Text fontFamily="'Jost', sans-serif" fontSize="xs" color="oud.500">
            Gift packaging available
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default React.memo(ProductInfo);
