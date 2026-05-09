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
  Spinner,
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
import React, { useEffect, useMemo } from "react";
import {
  fetchOrders,
  selectCheckoutLoading,
  selectOrders,
} from "../../store/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";

import { useCurrency } from "../../hooks/useCurrency";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { symbol } = useCurrency();

  const loading = useSelector(selectCheckoutLoading);

  const orders = useSelector(selectOrders);

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // ==========================================
  // GET LATEST ORDER
  // ==========================================

  const latestOrder = useMemo(() => {
    if (!orders || orders.length === 0) return null;

    const sortedOrders = [...orders].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );

    return sortedOrders[0];
  }, [orders]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Box
        bg="white"
        borderRadius="3xl"
        p={10}
        textAlign="center"
        border="1px solid"
        borderColor="gray.200"
      >
        <Spinner size="xl" color="brand.400" />
      </Box>
    );
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (!latestOrder) {
    return (
      <Box
        bg="white"
        borderRadius="3xl"
        p={10}
        textAlign="center"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="lg" fontWeight="600">
          No order found
        </Text>

        <Button mt={6} variant="gold" onClick={() => navigate("/products")}>
          Start Shopping
        </Button>
      </Box>
    );
  }

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const cartTotal = Number(latestOrder.total_amount || 0);

  const shippingCharge = cartTotal > 5000 ? 0 : 199;

  const platformFee = 49;

  const gst = Math.round(cartTotal * 0.18);

  const paymentCharge = 99;

  const grandTotal =
    cartTotal + shippingCharge + platformFee + gst + paymentCharge;

  const totalItems =
    latestOrder.items?.reduce(
      (acc, item) => acc + Number(item.quantity || 0),
      0
    ) || 0;

  // ==========================================
  // UI
  // ==========================================

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
        {/* ICON */}
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
            maxW="700px"
            lineHeight="1.9"
          >
            Thank you for your purchase. Your payment was completed successfully
            and your order is now being processed for shipment.
          </Text>
        </VStack>

        {/* BADGES */}
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
            Order #{latestOrder.id}
          </Badge>

          <Badge
            px={4}
            py={2}
            borderRadius="full"
            colorScheme="orange"
            fontSize="sm"
          >
            {latestOrder.status}
          </Badge>
        </HStack>

        <Text fontSize="sm" color="gray.400">
          {new Date(latestOrder.created_at).toLocaleString()}
        </Text>
      </VStack>

      {/* ========================================= */}
      {/* MAIN GRID */}
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
                {latestOrder.items?.map((item, index) => {
                  const itemTotal =
                    Number(item.price || 0) * Number(item.quantity || 0);

                  return (
                    <Box key={index}>
                      <HStack spacing={5} align="start" p={6}>
                        {/* IMAGE */}
                        <Image
                          src={
                            item.product?.images?.find((img) => img.is_primary)
                              ?.image ||
                            item.product?.images?.[0]?.image ||
                            "https://via.placeholder.com/120"
                          }
                          boxSize="100px"
                          borderRadius="2xl"
                          objectFit="cover"
                        />

                        {/* INFO */}
                        <VStack align="start" spacing={2} flex={1}>
                          <Text fontWeight="700" fontSize="lg">
                            {item.product?.name}
                          </Text>

                          <HStack spacing={2} flexWrap="wrap">
                            <Badge colorScheme="purple">
                              {item.variant_detail?.label}
                            </Badge>

                            <Badge colorScheme="green">
                              {item.product?.grade}
                            </Badge>

                            <Badge colorScheme="orange">
                              {item.product?.origin}
                            </Badge>
                          </HStack>

                          <Text fontSize="sm" color="gray.500">
                            {item.product?.short_description}
                          </Text>

                          <HStack spacing={5} flexWrap="wrap">
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
                                {Number(item.price).toLocaleString()}
                              </Text>
                            </Text>

                            <Text fontSize="sm">
                              Size:{" "}
                              <Text as="span" fontWeight="700">
                                {item.variant_detail?.size}
                              </Text>
                            </Text>
                          </HStack>
                        </VStack>

                        {/* TOTAL */}
                        <VStack align="end" spacing={2}>
                          <Text
                            fontWeight="700"
                            color="brand.500"
                            fontSize="xl"
                          >
                            {symbol}
                            {itemTotal.toLocaleString()}
                          </Text>

                          <Text
                            fontSize="xs"
                            color="green.500"
                            fontWeight="700"
                          >
                            Confirmed
                          </Text>
                        </VStack>
                      </HStack>

                      {index !== latestOrder.items.length - 1 && <Divider />}
                    </Box>
                  );
                })}
              </VStack>
            </Box>

            {/* TIMELINE */}
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
                Order Timeline
              </Text>

              <VStack spacing={6} align="stretch">
                <HStack align="start" spacing={4}>
                  <Box bg="green.500" color="white" p={2} borderRadius="full">
                    <FiCheck size={14} />
                  </Box>

                  <Box>
                    <Text fontWeight="700">Order Confirmed</Text>

                    <Text fontSize="sm" color="gray.500">
                      Your order has been placed successfully
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
                      Your products are currently being packed
                    </Text>
                  </Box>
                </HStack>

                <HStack align="start" spacing={4}>
                  <Box bg="orange.400" color="white" p={2} borderRadius="full">
                    <FiTruck size={14} />
                  </Box>

                  <Box>
                    <Text fontWeight="700">Estimated Delivery</Text>

                    <Text fontSize="sm" color="gray.500">
                      Delivery expected within 3-5 business days
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
                    <Text color="gray.600">Products Total</Text>

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

            {/* DELIVERY */}
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
                    Your order will be dispatched shortly and delivered within
                    3-5 business days.
                  </Text>
                </Box>
              </HStack>
            </Box>

            {/* ACTIONS */}
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
                leftIcon={<FiPackage />}
                onClick={() => navigate("/orders")}
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
