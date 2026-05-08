import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiHome,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import React, { useEffect } from "react";
import {
  fetchCart,
  selectCartItemsWithTotal,
  selectCartTotal,
} from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import { useCurrency } from "../../hooks/useCurrency";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector(selectCartItemsWithTotal);

  const cartTotal = useSelector(selectCartTotal);

  const { symbol } = useCurrency();

  // fetch cart on mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const shippingCharge = cartTotal > 5000 ? 0 : 199;

  const platformFee = 49;

  const gst = Math.round(cartTotal * 0.18);

  const paymentCharge = 99;

  const grandTotal =
    cartTotal + shippingCharge + platformFee + gst + paymentCharge;

  const totalItems = items.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  );

  const orderId = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <Box>
      {/* ========================================= */}
      {/* SUCCESS HEADER */}
      {/* ========================================= */}

      <VStack
        spacing={6}
        textAlign="center"
        py={{ base: 10, md: 16 }}
        px={{ base: 5, md: 10 }}
        bg="white"
        borderRadius="3xl"
        border="1px solid"
        borderColor="green.100"
        mb={8}
      >
        {/* SUCCESS ICON */}
        <Box
          w="90px"
          h="90px"
          borderRadius="full"
          bg="green.50"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="8px solid"
          borderColor="green.100"
        >
          <Icon as={FiCheckCircle} boxSize={10} color="green.500" />
        </Box>

        {/* TITLE */}
        <VStack spacing={3}>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="600"
            color="oud.900"
          >
            Order Confirmed
          </Text>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="gray.500"
            maxW="650px"
            lineHeight="1.9"
          >
            Thank you for shopping with us. Your payment was processed
            successfully and your order is now being prepared for shipment.
          </Text>
        </VStack>

        {/* ORDER BADGES */}
        <HStack spacing={4} flexWrap="wrap" justify="center">
          <Badge
            px={4}
            py={2}
            borderRadius="full"
            colorScheme="green"
            fontSize="sm"
          >
            Payment Successful
          </Badge>

          <Badge
            px={4}
            py={2}
            borderRadius="full"
            colorScheme="purple"
            fontSize="sm"
          >
            Order ID: {orderId}
          </Badge>

          <Badge
            px={4}
            py={2}
            borderRadius="full"
            colorScheme="orange"
            fontSize="sm"
          >
            Estimated Delivery: 3-5 Days
          </Badge>
        </HStack>
      </VStack>

      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}

      <Grid
        templateColumns={{ base: "1fr", lg: "1.2fr 0.8fr" }}
        gap={8}
        alignItems="start"
      >
        {/* ========================================= */}
        {/* LEFT SIDE */}
        {/* ========================================= */}

        <GridItem>
          <VStack spacing={8} align="stretch">
            {/* ORDER ITEMS */}
            <Box
              bg="white"
              borderRadius="3xl"
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
            >
              <Box
                px={6}
                py={5}
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <HStack justify="space-between">
                  <HStack spacing={3}>
                    <Icon as={FiShoppingBag} color="brand.500" boxSize={5} />

                    <Text
                      fontSize="xl"
                      fontWeight="700"
                      fontFamily="'Cormorant Garamond', serif"
                    >
                      Ordered Products
                    </Text>
                  </HStack>

                  <Badge colorScheme="purple">{totalItems} Items</Badge>
                </HStack>
              </Box>

              <VStack spacing={0} align="stretch">
                {items.map((item, index) => (
                  <Box key={index}>
                    <HStack spacing={5} align="start" p={6}>
                      {/* IMAGE */}
                      <Image
                        src={
                          item.product_detail?.images?.[0]?.image ||
                          "https://via.placeholder.com/120"
                        }
                        boxSize="100px"
                        borderRadius="2xl"
                        objectFit="cover"
                      />

                      {/* PRODUCT INFO */}
                      <VStack align="start" spacing={2} flex={1}>
                        <Text fontWeight="700" fontSize="lg">
                          {item.product_detail?.name}
                        </Text>

                        <HStack spacing={2} flexWrap="wrap">
                          <Badge colorScheme="purple">
                            {item.variant_detail?.label}
                          </Badge>

                          <Badge colorScheme="green">
                            {item.product_detail?.grade}
                          </Badge>

                          <Badge colorScheme="orange">
                            {item.product_detail?.origin}
                          </Badge>
                        </HStack>

                        <Text fontSize="sm" color="gray.500">
                          {item.product_detail?.short_description}
                        </Text>

                        <HStack spacing={6} pt={2}>
                          <Text fontSize="sm">
                            Quantity:{" "}
                            <Text as="span" fontWeight="700">
                              {item.quantity}
                            </Text>
                          </Text>

                          <Text fontSize="sm">
                            Unit Price:{" "}
                            <Text as="span" fontWeight="700">
                              {symbol}
                              {Number(
                                item.variant_detail?.price
                              ).toLocaleString()}
                            </Text>
                          </Text>
                        </HStack>
                      </VStack>

                      {/* PRICE */}
                      <Text fontWeight="700" color="brand.500" fontSize="xl">
                        {symbol}
                        {item.itemTotal.toLocaleString()}
                      </Text>
                    </HStack>

                    {index !== items.length - 1 && <Divider />}
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* ORDER TIMELINE */}
            <Box
              bg="white"
              borderRadius="3xl"
              border="1px solid"
              borderColor="gray.200"
              p={6}
            >
              <Text
                fontSize="xl"
                fontWeight="700"
                mb={6}
                fontFamily="'Cormorant Garamond', serif"
              >
                Order Status
              </Text>

              <VStack spacing={6} align="stretch">
                <HStack align="start" spacing={4}>
                  <Box bg="green.500" color="white" p={2} borderRadius="full">
                    <FiCheck size={14} />
                  </Box>

                  <Box>
                    <Text fontWeight="700">Order Confirmed</Text>

                    <Text fontSize="sm" color="gray.500">
                      Your order has been successfully placed
                    </Text>
                  </Box>
                </HStack>

                <HStack align="start" spacing={4}>
                  <Box bg="blue.500" color="white" p={2} borderRadius="full">
                    <FiPackage size={14} />
                  </Box>

                  <Box>
                    <Text fontWeight="700">Preparing Shipment</Text>

                    <Text fontSize="sm" color="gray.500">
                      Your products are being packed carefully
                    </Text>
                  </Box>
                </HStack>

                <HStack align="start" spacing={4}>
                  <Box bg="orange.400" color="white" p={2} borderRadius="full">
                    <FiTruck size={14} />
                  </Box>

                  <Box>
                    <Text fontWeight="700">Ready for Dispatch</Text>

                    <Text fontSize="sm" color="gray.500">
                      Estimated delivery within 3-5 business days
                    </Text>
                  </Box>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </GridItem>

        {/* ========================================= */}
        {/* RIGHT SIDE */}
        {/* ========================================= */}

        <GridItem>
          <VStack spacing={6} align="stretch">
            {/* PAYMENT SUMMARY */}
            <Box
              bg="white"
              borderRadius="3xl"
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
            >
              <Box
                px={6}
                py={5}
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <HStack spacing={3}>
                  <Icon as={FiCreditCard} color="brand.500" boxSize={5} />

                  <Text
                    fontSize="xl"
                    fontWeight="700"
                    fontFamily="'Cormorant Garamond', serif"
                  >
                    Payment Summary
                  </Text>
                </HStack>
              </Box>

              <Box p={6}>
                <VStack spacing={5} align="stretch">
                  <HStack justify="space-between">
                    <Text color="gray.600">Cart Total</Text>

                    <Text fontWeight="600">
                      {symbol}
                      {cartTotal.toLocaleString()}
                    </Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="gray.600">Shipping Charges</Text>

                    {shippingCharge === 0 ? (
                      <Text color="green.500" fontWeight="700">
                        FREE
                      </Text>
                    ) : (
                      <Text fontWeight="600">
                        {symbol}
                        {shippingCharge}
                      </Text>
                    )}
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="gray.600">Platform Fee</Text>

                    <Text fontWeight="600">
                      {symbol}
                      {platformFee}
                    </Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="gray.600">GST (18%)</Text>

                    <Text fontWeight="600">
                      {symbol}
                      {gst}
                    </Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="gray.600">Payment Charges</Text>

                    <Text fontWeight="600">
                      {symbol}
                      {paymentCharge}
                    </Text>
                  </HStack>

                  <Divider />

                  <HStack justify="space-between">
                    <Text fontWeight="700" fontSize="lg">
                      Grand Total
                    </Text>

                    <Text
                      fontSize="2xl"
                      color="brand.500"
                      fontWeight="700"
                      fontFamily="'Cormorant Garamond', serif"
                    >
                      {symbol}
                      {grandTotal.toLocaleString()}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>

            {/* DELIVERY CARD */}
            <Box
              bg="green.50"
              borderRadius="3xl"
              p={6}
              border="1px solid"
              borderColor="green.100"
            >
              <HStack align="start" spacing={4}>
                <Box bg="green.500" color="white" p={3} borderRadius="full">
                  <FiClock size={18} />
                </Box>

                <Box>
                  <Text fontWeight="700" fontSize="lg" color="green.700">
                    Delivery Information
                  </Text>

                  <Text fontSize="sm" color="green.600" mt={2} lineHeight="1.8">
                    Your order will be shipped within 24 hours and delivered in
                    approximately 3-5 business days.
                  </Text>
                </Box>
              </HStack>
            </Box>

            {/* ACTION BUTTONS */}
            <VStack spacing={4}>
              <Button
                w="full"
                size="lg"
                variant="gold"
                leftIcon={<FiShoppingBag />}
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </Button>

              <Button
                w="full"
                size="lg"
                variant="outline"
                leftIcon={<FiHome />}
                onClick={() => navigate("/profile")}
              >
                View My Orders
              </Button>

              <Button
                w="full"
                size="lg"
                variant="outline"
                leftIcon={<FiHome />}
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}
