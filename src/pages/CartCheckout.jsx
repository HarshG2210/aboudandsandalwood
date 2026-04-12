import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Divider,
  Image,
  Badge,
  Grid,
  useToast,
  useColorModeValue,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { FiLock, FiArrowLeft, FiCheck } from "react-icons/fi";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../store/slices/cartSlice";
import { addOrder } from "../store/slices/userSlice";
import { useCurrency } from "../hooks/useCurrency";
const steps = ["Cart Review", "Shipping", "Payment", "Confirmation"];
export default function CartCheckout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { symbol, currency, format } = useCurrency();
  const bg = useColorModeValue("ivory", "gray.900");
  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState("card");
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "India",
    pincode: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [placing, setPlacing] = useState(false);
  const handleSendOtp = () => {
    if (!shipping.phone || shipping.phone.length < 8) {
      toast({
        title: "Enter a valid phone number",
        status: "warning",
        duration: 2000,
        position: "top",
      });
      return;
    }
    setOtpSent(true);
    toast({
      title: "OTP Sent!",
      description: `A demo OTP: 123456 has been sent to ${shipping.phone}`,
      status: "info",
      duration: 4000,
      position: "top",
    });
  };
  const handlePlaceOrder = () => {
    if (!otpSent || otp !== "123456") {
      toast({
        title: "Invalid OTP",
        description: "Use demo OTP: 123456",
        status: "error",
        duration: 3000,
        position: "top",
      });
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        total,
        currency,
        shipping,
        date: new Date().toISOString(),
        status: "Confirmed",
      };
      dispatch(addOrder(order));
      dispatch(clearCart());
      setStep(3);
      setPlacing(false);
    }, 1800);
  };
  if (items.length === 0 && step < 3) {
    return (
      <Box pt={32} textAlign="center" minH="60vh" bg={bg}>
        <Text
          fontFamily="'Cormorant Garamond', serif"
          fontSize="3xl"
          color="oud.700"
          mb={4}
        >
          Your bag is empty
        </Text>
        <Button as={Link} to="/products" variant="gold" size="lg">
          Shop Collection
        </Button>
      </Box>
    );
  }
  return (
    <Box bg={bg} pt={24} pb={24} minH="100vh">
      <Box maxW="1100px" mx="auto" px={{ base: 4, md: 8 }}>
        <Text
          fontFamily="'Cormorant Garamond', serif"
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="300"
          color="oud.900"
          mb={8}
        >
          Checkout
        </Text>
        {/* Step indicator */}
        <HStack spacing={0} mb={10} overflowX="auto">
          {steps.map((s, i) => (
            <HStack key={s} spacing={0}>
              <HStack spacing={2}>
                <Box
                  w="28px"
                  h="28px"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={step >= i ? "brand.400" : "brand.100"}
                  color={step >= i ? "white" : "brand.400"}
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  fontWeight="600"
                  flexShrink={0}
                >
                  {step > i ? <FiCheck size={12} /> : i + 1}
                </Box>
                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color={step >= i ? "brand.500" : "oud.400"}
                  whiteSpace="nowrap"
                >
                  {s}
                </Text>
              </HStack>
              {i < steps.length - 1 && (
                <Box
                  h="1px"
                  w={{ base: "20px", md: "40px" }}
                  bg="brand.200"
                  mx={2}
                  flexShrink={0}
                />
              )}
            </HStack>
          ))}
        </HStack>
        {step === 3 ? (
          <VStack
            spacing={6}
            textAlign="center"
            py={16}
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="brand.100"
          >
            <Box
              w="64px"
              h="64px"
              borderRadius="full"
              bg="green.50"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiCheck size={28} color="var(--chakra-colors-green-500)" />
            </Box>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize="4xl"
              fontWeight="300"
              color="oud.900"
            >
              Order Confirmed!
            </Text>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="sm"
              color="oud.600"
              maxW="400px"
              lineHeight="1.9"
            >
              Thank you, {shipping.name || "valued patron"}. Your order has been
              placed and will be shipped to
              {shipping.city || "your address"} soon.
            </Text>
            <Text fontFamily="'Jost', sans-serif" fontSize="xs" color="oud.400">
              Confirmation sent to: {shipping.email}
            </Text>
            <HStack spacing={4} pt={4}>
              <Button as={Link} to="/profile" variant="outline_gold" size="sm">
                View Orders
              </Button>
              <Button as={Link} to="/products" variant="gold" size="sm">
                Continue Shopping
              </Button>
            </HStack>
          </VStack>
        ) : (
          <Grid templateColumns={{ base: "1fr", lg: "1.4fr 1fr" }} gap={10}>
            {/* Left */}
            <Box>
              {step === 0 && (
                <Box
                  bg="white"
                  p={8}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="brand.100"
                >
                  <Text
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="2xl"
                    fontWeight="400"
                    color="oud.900"
                    mb={6}
                  >
                    Your Bag
                  </Text>
                  <VStack
                    spacing={5}
                    divider={<Divider borderColor="brand.100" />}
                  >
                    {items.map((item) => (
                      <HStack
                        key={`${item.id}-${item.variant}`}
                        spacing={4}
                        w="full"
                        align="start"
                      >
                        <Image
                          src={item.image}
                          boxSize="72px"
                          objectFit="cover"
                          borderRadius="lg"
                          fallbackSrc="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200"
                        />
                        <VStack align="start" flex={1} spacing={1}>
                          <Text
                            fontFamily="'Cormorant Garamond', serif"
                            fontSize="md"
                            fontWeight="500"
                          >
                            {item.name}
                          </Text>
                          {item.variant && (
                            <Badge
                              bg="brand.50"
                              color="brand.600"
                              fontSize="9px"
                              fontFamily="'Jost', sans-serif"
                            >
                              {item.variant}
                            </Badge>
                          )}
                          <Text
                            fontFamily="'Jost', sans-serif"
                            fontSize="xs"
                            color="oud.500"
                          >
                            Qty: {item.quantity}
                          </Text>
                        </VStack>
                        <Text
                          fontFamily="'Cormorant Garamond', serif"
                          fontSize="lg"
                          fontWeight="500"
                          color="brand.500"
                        >
                          {format(item.prices)}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                  <Button
                    variant="gold"
                    w="full"
                    mt={8}
                    size="lg"
                    onClick={() => setStep(1)}
                  >
                    Proceed to Shipping
                  </Button>
                </Box>
              )}
              {step === 1 && (
                <Box
                  bg="white"
                  p={8}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="brand.100"
                >
                  <Text
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="2xl"
                    fontWeight="400"
                    color="oud.900"
                    mb={6}
                  >
                    Shipping Details
                  </Text>
                  <VStack spacing={5}>
                    <SimpleGrid columns={2} spacing={4} w="full">
                      {[
                        ["Full Name", "name", "text"],
                        ["Email", "email", "email"],
                      ].map(([label, key, type]) => (
                        <FormControl key={key} isRequired>
                          <FormLabel
                            fontFamily="'Jost', sans-serif"
                            fontSize="xs"
                            textTransform="uppercase"
                            letterSpacing="0.1em"
                            color="oud.600"
                          >
                            {label}
                          </FormLabel>
                          <Input
                            type={type}
                            value={shipping[key]}
                            onChange={(e) =>
                              setShipping((s) => ({
                                ...s,
                                [key]: e.target.value,
                              }))
                            }
                            fontFamily="'Jost', sans-serif"
                            fontSize="sm"
                            borderColor="brand.200"
                            _focus={{
                              borderColor: "brand.400",
                              boxShadow: "none",
                            }}
                          />
                        </FormControl>
                      ))}
                    </SimpleGrid>
                    <FormControl isRequired>
                      <FormLabel
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="0.1em"
                        color="oud.600"
                      >
                        Phone Number
                      </FormLabel>
                      <HStack>
                        <Input
                          value={shipping.phone}
                          onChange={(e) =>
                            setShipping((s) => ({
                              ...s,
                              phone: e.target.value,
                            }))
                          }
                          fontFamily="'Jost', sans-serif"
                          fontSize="sm"
                          borderColor="brand.200"
                          placeholder="+91 or international"
                          _focus={{
                            borderColor: "brand.400",
                            boxShadow: "none",
                          }}
                        />
                        <Button
                          variant="outline_gold"
                          size="md"
                          onClick={handleSendOtp}
                          flexShrink={0}
                          isDisabled={otpSent}
                        >
                          {otpSent ? "Sent " : "Send OTP"}
                        </Button>
                      </HStack>
                    </FormControl>
                    {otpSent && (
                      <FormControl isRequired>
                        <FormLabel
                          fontFamily="'Jost', sans-serif"
                          fontSize="xs"
                          textTransform="uppercase"
                          letterSpacing="0.1em"
                          color="oud.600"
                        >
                          Enter OTP
                        </FormLabel>
                        <Input
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP (demo: 123456)"
                          fontFamily="'Jost', sans-serif"
                          fontSize="sm"
                          borderColor="brand.200"
                          _focus={{
                            borderColor: "brand.400",
                            boxShadow: "none",
                          }}
                          maxLength={6}
                        />
                      </FormControl>
                    )}
                    <FormControl isRequired>
                      <FormLabel
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="0.1em"
                        color="oud.600"
                      >
                        Street Address
                      </FormLabel>
                      <Input
                        value={shipping.address}
                        onChange={(e) =>
                          setShipping((s) => ({
                            ...s,
                            address: e.target.value,
                          }))
                        }
                        fontFamily="'Jost', sans-serif"
                        fontSize="sm"
                        borderColor="brand.200"
                        _focus={{
                          borderColor: "brand.400",

                          boxShadow: "none",
                        }}
                      />
                    </FormControl>
                    <SimpleGrid columns={3} spacing={4} w="full">
                      {[
                        ["City", "city"],
                        ["Pin/ZIP", "pincode"],
                      ].map(([label, key]) => (
                        <FormControl key={key} isRequired>
                          <FormLabel
                            fontFamily="'Jost', sans-serif"
                            fontSize="xs"
                            textTransform="uppercase"
                            letterSpacing="0.1em"
                            color="oud.600"
                          >
                            {label}
                          </FormLabel>
                          <Input
                            value={shipping[key]}
                            onChange={(e) =>
                              setShipping((s) => ({
                                ...s,
                                [key]: e.target.value,
                              }))
                            }
                            fontFamily="'Jost', sans-serif"
                            fontSize="sm"
                            borderColor="brand.200"
                            _focus={{
                              borderColor: "brand.400",
                              boxShadow: "none",
                            }}
                          />
                        </FormControl>
                      ))}
                      <FormControl>
                        <FormLabel
                          fontFamily="'Jost', sans-serif"
                          fontSize="xs"
                          textTransform="uppercase"
                          letterSpacing="0.1em"
                          color="oud.600"
                        >
                          Country
                        </FormLabel>
                        <Select
                          value={shipping.country}
                          onChange={(e) =>
                            setShipping((s) => ({
                              ...s,
                              country: e.target.value,
                            }))
                          }
                          fontFamily="'Jost', sans-serif"
                          fontSize="sm"
                          borderColor="brand.200"
                          _focus={{
                            borderColor: "brand.400",
                            boxShadow: "none",
                          }}
                        >
                          {[
                            "India",
                            "UAE",
                            "Saudi Arabia",
                            "Qatar",
                            "Japan",
                            "China",
                            "USA",
                            "Canada",
                          ].map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </SimpleGrid>
                    <HStack w="full" spacing={4} pt={2}>
                      <Button
                        variant="outline_gold"
                        flex={1}
                        onClick={() => setStep(0)}
                        leftIcon={<FiArrowLeft />}
                      >
                        Back
                      </Button>
                      <Button
                        variant="gold"
                        flex={2}
                        size="lg"
                        onClick={() => setStep(2)}
                      >
                        Continue to Payment
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              )}
              {step === 2 && (
                <Box
                  bg="white"
                  p={8}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="brand.100"
                >
                  <Text
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="2xl"
                    fontWeight="400"
                    color="oud.900"
                    mb={6}
                  >
                    Payment
                  </Text>
                  <RadioGroup value={payMethod} onChange={setPayMethod} mb={6}>
                    <Stack spacing={3}>
                      {[
                        { val: "card", label: "Credit / Debit Card" },
                        { val: "upi", label: "UPI (India only)" },
                        {
                          val: "wallet",
                          label: "Digital Wallet (Razorpay / Stripe)",
                        },
                        { val: "cod", label: "Cash on Delivery (India only)" },
                      ].map((opt) => (
                        <Box
                          key={opt.val}
                          border="1px solid"
                          borderColor={
                            payMethod === opt.val ? "brand.400" : "brand.100"
                          }
                          borderRadius="lg"
                          p={4}
                          cursor="pointer"
                          onClick={() => setPayMethod(opt.val)}
                          bg={payMethod === opt.val ? "brand.50" : "white"}
                          transition="all 0.2s"
                        >
                          <Radio value={opt.val} colorScheme="orange">
                            <Text
                              fontFamily="'Jost', sans-serif"
                              fontSize="sm"
                              color="oud.700"
                            >
                              {opt.label}
                            </Text>
                          </Radio>
                        </Box>
                      ))}
                    </Stack>
                  </RadioGroup>
                  {payMethod === "card" && (
                    <VStack spacing={4} mb={6}>
                      <FormControl>
                        <FormLabel
                          fontFamily="'Jost', sans-serif"
                          fontSize="xs"
                          textTransform="uppercase"
                          letterSpacing="0.1em"
                          color="oud.600"
                        >
                          Card Number
                        </FormLabel>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          fontFamily="'Jost', sans-serif"
                          fontSize="sm"
                          borderColor="brand.200"
                          _focus={{
                            borderColor: "brand.400",
                            boxShadow: "none",
                          }}
                        />
                      </FormControl>
                      <SimpleGrid columns={2} spacing={4} w="full">
                        <FormControl>
                          <FormLabel
                            fontFamily="'Jost', sans-serif"
                            fontSize="xs"
                            textTransform="uppercase"
                            letterSpacing="0.1em"
                            color="oud.600"
                          >
                            Expiry
                          </FormLabel>

                          <Input
                            placeholder="MM / YY"
                            fontFamily="'Jost', sans-serif"
                            fontSize="sm"
                            borderColor="brand.200"
                            _focus={{
                              borderColor: "brand.400",
                              boxShadow: "none",
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            fontFamily="'Jost', sans-serif"
                            fontSize="xs"
                            textTransform="uppercase"
                            letterSpacing="0.1em"
                            color="oud.600"
                          >
                            CVV
                          </FormLabel>
                          <Input
                            placeholder="•••"
                            fontFamily="'Jost', sans-serif"
                            fontSize="sm"
                            type="password"
                            borderColor="brand.200"
                            _focus={{
                              borderColor: "brand.400",
                              boxShadow: "none",
                            }}
                          />
                        </FormControl>
                      </SimpleGrid>
                    </VStack>
                  )}
                  <HStack w="full" spacing={4}>
                    <Button
                      variant="outline_gold"
                      flex={1}
                      onClick={() => setStep(1)}
                      leftIcon={<FiArrowLeft />}
                    >
                      Back
                    </Button>
                    <Button
                      variant="gold"
                      flex={2}
                      size="lg"
                      leftIcon={<FiLock />}
                      onClick={handlePlaceOrder}
                      isLoading={placing}
                      loadingText="Processing..."
                    >
                      Place Order · {symbol}
                      {total.toLocaleString()}
                    </Button>
                  </HStack>
                  <HStack justify="center" mt={4} spacing={2}>
                    <FiLock size={11} color="var(--chakra-colors-oud-400)" />
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="10px"
                      color="oud.400"
                    >
                      Secured by Razorpay / Stripe · 256-bit SSL
                    </Text>
                  </HStack>
                </Box>
              )}
            </Box>
            {/* Order Summary */}
            <Box>
              <Box
                bg="white"
                p={6}
                borderRadius="2xl"
                border="1px solid"
                borderColor="brand.100"
                position="sticky"
                top="100px"
              >
                <Text
                  fontFamily="'Cormorant Garamond', serif"
                  fontSize="xl"
                  fontWeight="400"
                  color="oud.900"
                  mb={5}
                >
                  Order Summary
                </Text>
                <VStack spacing={4} mb={5}>
                  {items.map((item) => (
                    <HStack
                      key={`${item.id}-${item.variant}-s`}
                      justify="space-between"
                      w="full"
                    >
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        color="oud.600"
                        noOfLines={1}
                        flex={1}
                      >
                        {item.name} ×{item.quantity}
                      </Text>
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        color="oud.800"
                        fontWeight="500"
                      >
                        {format(item.prices)}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
                <Divider borderColor="brand.100" mb={4} />
                <VStack spacing={2} mb={4}>
                  {[
                    ["Subtotal", `${symbol}${total.toLocaleString()}`],
                    ["Shipping", "Calculated at delivery"],
                    ["Tax", "Included"],
                  ].map(([k, v]) => (
                    <HStack key={k} justify="space-between" w="full">
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        color="oud.500"
                      >
                        {k}
                      </Text>
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        color="oud.700"
                      >
                        {v}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
                <Divider borderColor="brand.200" mb={4} />
                <HStack justify="space-between">
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontWeight="600"
                    color="oud.900"
                  >
                    Total
                  </Text>
                  <Text
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="2xl"
                    fontWeight="500"
                    color="brand.500"
                  >
                    {symbol}
                    {total.toLocaleString()}
                  </Text>
                </HStack>
              </Box>
            </Box>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
