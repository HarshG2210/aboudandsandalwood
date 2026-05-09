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
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  FiCheckCircle,
  FiCreditCard,
  FiLock,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import React, { useEffect, useMemo, useState } from "react";
import {
  fetchOrders,
  selectCheckoutLoading,
  selectOrders,
} from "../../store/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";

import { useCurrency } from "../../hooks/useCurrency";

export default function Payment({ setStep }) {
  const dispatch = useDispatch();

  const toast = useToast();

  const { symbol } = useCurrency();

  // ==========================================
  // REDUX
  // ==========================================

  const orders = useSelector(selectOrders);

  const loading = useSelector(selectCheckoutLoading);

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
  // LOCAL STATES
  // ==========================================

  const [payMethod, setPayMethod] = useState("card");

  const [placing, setPlacing] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Box
        bg="white"
        p={10}
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.200"
        textAlign="center"
      >
        <Spinner size="xl" color="brand.400" />
      </Box>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (!latestOrder) {
    return (
      <Box
        bg="white"
        p={10}
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text>No latest order found.</Text>
      </Box>
    );
  }

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const items = latestOrder.items || [];

  const totalItems = items.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  );

  const cartTotal = Number(latestOrder.total_amount || 0);

  const shippingCharge = cartTotal > 5000 ? 0 : 199;

  const platformFee = 49;

  const gst = Math.round(cartTotal * 0.18);

  const paymentCharge = payMethod === "card" ? 99 : 0;

  const grandTotal =
    cartTotal + shippingCharge + platformFee + gst + paymentCharge;

  // ==========================================
  // PAYMENT
  // ==========================================

  const handlePayment = () => {
    if (payMethod === "card") {
      if (
        !cardData.cardNumber ||
        !cardData.cardName ||
        !cardData.expiry ||
        !cardData.cvv
      ) {
        toast({
          title: "Please fill all card details",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });

        return;
      }
    }

    setPlacing(true);

    setTimeout(() => {
      setPlacing(false);

      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setStep(3);
    }, 2500);
  };

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1.3fr 0.7fr" }}
      gap={8}
      alignItems="start"
    >
      {/* ========================================= */}
      {/* LEFT SIDE */}
      {/* ========================================= */}

      <GridItem>
        <VStack spacing={6} align="stretch">
          {/* PAYMENT METHOD */}
          <Box
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            overflow="hidden"
          >
            <Box px={6} py={5} borderBottom="1px solid" borderColor="gray.100">
              <HStack spacing={3}>
                <Icon as={FiCreditCard} color="brand.500" boxSize={5} />

                <Text
                  fontSize="xl"
                  fontWeight="700"
                  fontFamily="'Cormorant Garamond', serif"
                >
                  Payment Method
                </Text>
              </HStack>
            </Box>

            <Box p={6}>
              <RadioGroup value={payMethod} onChange={setPayMethod}>
                <Stack spacing={4}>
                  {/* CARD */}
                  <Box
                    border="2px solid"
                    borderColor={
                      payMethod === "card" ? "brand.400" : "gray.200"
                    }
                    borderRadius="2xl"
                    p={5}
                  >
                    <Radio value="card" colorScheme="purple">
                      <HStack spacing={3}>
                        <Text fontWeight="600">Credit / Debit Card</Text>

                        <Badge colorScheme="green">Recommended</Badge>
                      </HStack>
                    </Radio>

                    {payMethod === "card" && (
                      <VStack spacing={4} mt={6}>
                        <Input
                          placeholder="Card Holder Name"
                          h="56px"
                          value={cardData.cardName}
                          onChange={(e) =>
                            setCardData({
                              ...cardData,
                              cardName: e.target.value,
                            })
                          }
                        />

                        <Input
                          placeholder="Card Number"
                          h="56px"
                          maxLength={16}
                          value={cardData.cardNumber}
                          onChange={(e) =>
                            setCardData({
                              ...cardData,
                              cardNumber: e.target.value,
                            })
                          }
                        />

                        <HStack w="full">
                          <Input
                            placeholder="MM/YY"
                            h="56px"
                            value={cardData.expiry}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                expiry: e.target.value,
                              })
                            }
                          />

                          <Input
                            placeholder="CVV"
                            h="56px"
                            type="password"
                            maxLength={3}
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                cvv: e.target.value,
                              })
                            }
                          />
                        </HStack>

                        <HStack
                          w="full"
                          bg="green.50"
                          p={4}
                          borderRadius="xl"
                          spacing={3}
                        >
                          <Icon as={FiLock} color="green.500" boxSize={5} />

                          <Text fontSize="sm" color="green.700">
                            100% Secure encrypted payment
                          </Text>
                        </HStack>
                      </VStack>
                    )}
                  </Box>
                </Stack>
              </RadioGroup>
            </Box>
          </Box>

          {/* ORDER ITEMS */}
          <Box
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            overflow="hidden"
          >
            <Box px={6} py={5} borderBottom="1px solid" borderColor="gray.100">
              <HStack justify="space-between">
                <HStack spacing={3}>
                  <Icon as={FiShoppingBag} color="brand.500" boxSize={5} />

                  <Text
                    fontSize="xl"
                    fontWeight="700"
                    fontFamily="'Cormorant Garamond', serif"
                  >
                    Order Items
                  </Text>
                </HStack>

                <Badge colorScheme="purple" px={3} py={1}>
                  {totalItems} Items
                </Badge>
              </HStack>
            </Box>

            <VStack spacing={0} align="stretch">
              {items.map((item, index) => {
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
                        boxSize="110px"
                        objectFit="cover"
                        borderRadius="xl"
                      />

                      {/* INFO */}
                      <VStack align="start" spacing={2} flex={1}>
                        <Text fontWeight="700" fontSize="lg" lineHeight="1.3">
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

                          <Badge colorScheme="pink">
                            {item.product?.product_type}
                          </Badge>
                        </HStack>

                        <Text fontSize="sm" color="gray.500">
                          {item.product?.short_description}
                        </Text>

                        <HStack spacing={6} pt={2} flexWrap="wrap">
                          <Text fontSize="sm">
                            Qty:{" "}
                            <Text as="span" fontWeight="700">
                              {item.quantity}
                            </Text>
                          </Text>

                          <Text fontSize="sm">
                            Size:{" "}
                            <Text as="span" fontWeight="700">
                              {item.variant_detail?.size}
                            </Text>
                          </Text>

                          <Text fontSize="sm">
                            Unit Price:{" "}
                            <Text as="span" fontWeight="700">
                              {symbol}
                              {Number(item.price).toLocaleString()}
                            </Text>
                          </Text>
                        </HStack>
                      </VStack>

                      {/* PRICE */}
                      <VStack align="end" spacing={2}>
                        <Text fontWeight="700" color="brand.500" fontSize="xl">
                          {symbol}
                          {itemTotal.toLocaleString()}
                        </Text>

                        <Text fontSize="xs" color="green.500" fontWeight="600">
                          In Stock
                        </Text>
                      </VStack>
                    </HStack>

                    {index !== items.length - 1 && <Divider />}
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </VStack>
      </GridItem>

      {/* ========================================= */}
      {/* RIGHT SIDE */}
      {/* ========================================= */}

      <GridItem position="sticky" top="120px">
        <VStack spacing={6} align="stretch">
          {/* BILL DETAILS */}
          <Box
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            overflow="hidden"
          >
            <Box px={6} py={5} borderBottom="1px solid" borderColor="gray.100">
              <Text
                fontSize="xl"
                fontWeight="700"
                fontFamily="'Cormorant Garamond', serif"
              >
                Bill Details
              </Text>
            </Box>

            <Box p={6}>
              <VStack spacing={5} align="stretch">
                <HStack justify="space-between">
                  <Text color="gray.600">Cart Total ({totalItems} items)</Text>

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
                  <Text color="gray.600">Payment Processing Fee</Text>

                  <Text fontWeight="600">
                    {symbol}
                    {paymentCharge}
                  </Text>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="700">
                    Grand Total
                  </Text>

                  <Text
                    fontSize="2xl"
                    fontWeight="700"
                    color="brand.500"
                    fontFamily="'Cormorant Garamond', serif"
                  >
                    {symbol}
                    {grandTotal.toLocaleString()}
                  </Text>
                </HStack>

                <Box bg="green.50" borderRadius="xl" p={4}>
                  <HStack align="start">
                    <Icon as={FiTruck} color="green.500" mt={1} />

                    <Box>
                      <Text fontWeight="700" color="green.700" fontSize="sm">
                        Estimated Delivery
                      </Text>

                      <Text fontSize="sm" color="green.600">
                        3 - 5 Business Days
                      </Text>
                    </Box>
                  </HStack>
                </Box>

                <Button
                  size="lg"
                  h="58px"
                  variant="gold"
                  isLoading={placing}
                  loadingText="Processing Payment..."
                  onClick={handlePayment}
                  leftIcon={<FiCheckCircle />}
                >
                  Pay {symbol}
                  {grandTotal.toLocaleString()}
                </Button>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}
