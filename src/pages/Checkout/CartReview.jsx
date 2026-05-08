import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import {
  fetchOrders,
  selectCheckoutLoading,
  selectOrders,
} from "../../store/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";

import { useCurrency } from "../../hooks/useCurrency";

export default function CartReview({ setStep }) {
  const dispatch = useDispatch();

  const { symbol } = useCurrency();

  const loading = useSelector(selectCheckoutLoading);

  const orders = useSelector(selectOrders);

  // fetch orders on mount
  useEffect(() => {
    dispatch(fetchOrders());
    // dispatch(fetchCart());
  }, [dispatch]);

  // ==========================================
  // GET LATEST ORDER
  // ==========================================

  const latestOrder = useMemo(() => {
    if (!orders || orders.length === 0) return null;

    // sort by newest id
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
        p={8}
        borderRadius="2xl"
        border="1px solid"
        borderColor="brand.100"
        textAlign="center"
      >
        <Spinner size="lg" />
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
        p={8}
        borderRadius="2xl"
        border="1px solid"
        borderColor="brand.100"
      >
        <Text>No latest order found.</Text>
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="2xl"
      border="1px solid"
      borderColor="brand.100"
    >
      {/* HEADER */}
      <HStack justify="space-between" mb={8}>
        <Box>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize="3xl"
            fontWeight="500"
            color="oud.900"
          >
            Order Review
          </Text>

          <Text color="gray.500" mt={1}>
            Order #{latestOrder.id}
          </Text>

          <Text color="gray.400" fontSize="sm">
            {new Date(latestOrder.created_at).toLocaleString()}
          </Text>
        </Box>

        <Badge
          colorScheme={
            latestOrder.status === "PENDING"
              ? "orange"
              : latestOrder.status === "COMPLETED"
              ? "green"
              : "blue"
          }
          px={4}
          py={2}
          borderRadius="full"
        >
          {latestOrder.status}
        </Badge>
      </HStack>

      {/* ITEMS */}
      <VStack spacing={6} align="stretch">
        {latestOrder.items?.map((item, index) => {
          const itemTotal =
            Number(item.price || 0) * Number(item.quantity || 0);

          return (
            <Box key={index}>
              <HStack align="start" spacing={5}>
                {/* IMAGE */}
                <Image
                  src={
                    item.product?.images?.find((img) => img.is_primary)
                      ?.image ||
                    item.product?.images?.[0]?.image ||
                    "https://via.placeholder.com/100"
                  }
                  boxSize="90px"
                  borderRadius="xl"
                  objectFit="cover"
                />

                {/* INFO */}
                <VStack align="start" spacing={2} flex={1}>
                  <Text fontWeight="600" fontSize="lg">
                    {item.product?.name}
                  </Text>

                  <Badge colorScheme="purple">
                    {item.variant_detail?.label}
                  </Badge>

                  <Text fontSize="sm" color="gray.500">
                    {item.product?.short_description}
                  </Text>

                  <HStack spacing={5}>
                    <Text fontSize="sm">
                      Qty: <b>{item.quantity}</b>
                    </Text>

                    <Text fontSize="sm">
                      Price:{" "}
                      <b>
                        {symbol}
                        {Number(item.price).toLocaleString()}
                      </b>
                    </Text>
                  </HStack>
                </VStack>

                {/* ITEM TOTAL */}
                <Text fontWeight="700" fontSize="lg" color="brand.500">
                  {symbol}
                  {itemTotal.toLocaleString()}
                </Text>
              </HStack>

              <Divider mt={5} />
            </Box>
          );
        })}
      </VStack>

      {/* TOTAL */}
      <HStack justify="space-between" mt={8}>
        <Text
          fontFamily="'Cormorant Garamond', serif"
          fontSize="2xl"
          fontWeight="500"
        >
          Total
        </Text>

        <Text
          fontFamily="'Cormorant Garamond', serif"
          fontSize="3xl"
          fontWeight="600"
          color="brand.500"
        >
          {symbol}
          {Number(latestOrder.total_amount || 0).toLocaleString()}
        </Text>
      </HStack>

      {/* BUTTON */}
      <Button
        mt={10}
        w="full"
        size="lg"
        variant="gold"
        onClick={() => setStep(2)}
      >
        Continue to Payment
      </Button>
    </Box>
  );
}
