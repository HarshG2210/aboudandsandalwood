import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  fetchOrders,
  selectCheckoutLoading,
  selectOrders,
} from "../../store/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useCurrency } from "../../hooks/useCurrency";

export default function Orders() {
  const dispatch = useDispatch();

  const loading = useSelector(selectCheckoutLoading);

  const orders = useSelector(selectOrders);

  const { symbol } = useCurrency();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <Box py={32} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box bg="ivory" minH="100vh" pt={24} pb={20}>
      <Box maxW="1300px" mx="auto" px={{ base: 4, md: 8 }}>
        {/* HEADER */}
        <HStack justify="space-between" mb={10} flexWrap="wrap">
          <Box>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "4xl", md: "5xl" }}
              color="oud.900"
              fontWeight="500"
            >
              My Orders
            </Text>

            <Text mt={2} color="gray.500">
              Track and manage all your orders
            </Text>
          </Box>

          <Button
            as={Link}
            to="/products"
            variant="gold"
            size="lg"
          >
            Continue Shopping
          </Button>
        </HStack>

        {/* EMPTY */}
        {!orders?.length && (
          <Box
            bg="white"
            borderRadius="2xl"
            p={16}
            textAlign="center"
            border="1px solid"
            borderColor="brand.100"
          >
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize="4xl"
              color="oud.900"
            >
              No Orders Found
            </Text>

            <Text mt={3} color="gray.500">
              You have not placed any orders yet.
            </Text>

            <Button
              mt={8}
              as={Link}
              to="/products"
              variant="gold"
            >
              Explore Products
            </Button>
          </Box>
        )}

        {/* ORDERS */}
        <VStack spacing={8} align="stretch">
          {orders?.map((order) => {
            return (
              <Box
                key={order.id}
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor="brand.100"
                overflow="hidden"
                shadow="sm"
              >
                {/* TOP HEADER */}
                <Box
                  px={{ base: 5, md: 8 }}
                  py={5}
                  bg="brand.50"
                  borderBottom="1px solid"
                  borderColor="brand.100"
                >
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      md: "repeat(4, 1fr)",
                    }}
                    gap={5}
                  >
                    <GridItem>
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        color="gray.500"
                        letterSpacing="0.1em"
                      >
                        Order ID
                      </Text>

                      <Text mt={1} fontWeight="600">
                        #{order.id}
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        color="gray.500"
                        letterSpacing="0.1em"
                      >
                        Order Date
                      </Text>

                      <Text mt={1} fontWeight="600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        color="gray.500"
                        letterSpacing="0.1em"
                      >
                        Total Amount
                      </Text>

                      <Text mt={1} fontWeight="700" color="brand.500">
                        {symbol}
                        {Number(order.total_amount).toLocaleString()}
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        color="gray.500"
                        letterSpacing="0.1em"
                      >
                        Status
                      </Text>

                      <Badge
                        mt={2}
                        colorScheme={
                          order.status === "PENDING"
                            ? "orange"
                            : order.status === "COMPLETED"
                            ? "green"
                            : "blue"
                        }
                        px={4}
                        py={1}
                        borderRadius="full"
                      >
                        {order.status}
                      </Badge>
                    </GridItem>
                  </Grid>
                </Box>

                {/* ITEMS */}
                <Box p={{ base: 5, md: 8 }}>
                  <VStack spacing={6} align="stretch">
                    {order.items?.map((item, index) => {
                      const itemTotal =
                        Number(item.price) * Number(item.quantity);

                      return (
                        <Box key={index}>
                          <HStack
                            align="start"
                            spacing={5}
                            flexDir={{ base: "column", md: "row" }}
                          >
                            {/* IMAGE */}
                            <Image
                              src={
                                item.product?.images?.[0]?.image ||
                                "https://via.placeholder.com/150"
                              }
                              boxSize="120px"
                              objectFit="cover"
                              borderRadius="xl"
                            />

                            {/* DETAILS */}
                            <VStack
                              align="start"
                              spacing={2}
                              flex={1}
                            >
                              <Text
                                fontSize="xl"
                                fontWeight="600"
                                color="oud.900"
                              >
                                {item.product?.name}
                              </Text>

                              <Text
                                fontSize="sm"
                                color="gray.500"
                                lineHeight="1.8"
                              >
                                {item.product?.short_description}
                              </Text>

                              <HStack flexWrap="wrap">
                                <Badge colorScheme="purple">
                                  {item.variant_detail?.label}
                                </Badge>

                                <Badge colorScheme="green">
                                  {item.product?.category}
                                </Badge>

                                <Badge colorScheme="orange">
                                  {item.product?.origin}
                                </Badge>

                                <Badge colorScheme="blue">
                                  {item.product?.grade}
                                </Badge>
                              </HStack>

                              <Grid
                                templateColumns={{
                                  base: "1fr",
                                  md: "repeat(2, 1fr)",
                                }}
                                gap={3}
                                w="full"
                                pt={3}
                              >
                                <Box>
                                  <Text fontSize="xs" color="gray.500">
                                    Quantity
                                  </Text>

                                  <Text fontWeight="600">
                                    {item.quantity}
                                  </Text>
                                </Box>

                                <Box>
                                  <Text fontSize="xs" color="gray.500">
                                    Price
                                  </Text>

                                  <Text fontWeight="600">
                                    {symbol}
                                    {Number(item.price).toLocaleString()}
                                  </Text>
                                </Box>

                                <Box>
                                  <Text fontSize="xs" color="gray.500">
                                    Fragrance
                                  </Text>

                                  <Text fontWeight="600">
                                    {item.product?.scent}
                                  </Text>
                                </Box>

                                <Box>
                                  <Text fontSize="xs" color="gray.500">
                                    Purpose
                                  </Text>

                                  <Text fontWeight="600">
                                    {item.product?.purpose}
                                  </Text>
                                </Box>
                              </Grid>
                            </VStack>

                            {/* TOTAL */}
                            <Box minW="120px" textAlign="right">
                              <Text
                                fontSize="xs"
                                color="gray.500"
                                mb={1}
                              >
                                Item Total
                              </Text>

                              <Text
                                fontSize="xl"
                                fontWeight="700"
                                color="brand.500"
                              >
                                {symbol}
                                {itemTotal.toLocaleString()}
                              </Text>
                            </Box>
                          </HStack>

                          {index !== order.items.length - 1 && (
                            <Divider mt={6} />
                          )}
                        </Box>
                      );
                    })}
                  </VStack>

                  {/* BILL */}
                  <Box
                    mt={10}
                    bg="brand.50"
                    borderRadius="2xl"
                    p={6}
                  >
                    <Text
                      fontSize="lg"
                      fontWeight="600"
                      mb={5}
                    >
                      Billing Summary
                    </Text>

                    <VStack spacing={4} align="stretch">
                      <HStack justify="space-between">
                        <Text color="gray.600">Subtotal</Text>

                        <Text fontWeight="600">
                          {symbol}
                          {Number(order.total_amount).toLocaleString()}
                        </Text>
                      </HStack>

                      <HStack justify="space-between">
                        <Text color="gray.600">Shipping Charges</Text>

                        <Text fontWeight="600" color="green.500">
                          FREE
                        </Text>
                      </HStack>

                      <HStack justify="space-between">
                        <Text color="gray.600">Platform Fee</Text>

                        <Text fontWeight="600">
                          {symbol}0
                        </Text>
                      </HStack>

                      <Divider />

                      <HStack justify="space-between">
                        <Text
                          fontSize="xl"
                          fontWeight="700"
                          fontFamily="'Cormorant Garamond', serif"
                        >
                          Grand Total
                        </Text>

                        <Text
                          fontSize="2xl"
                          fontWeight="700"
                          color="brand.500"
                          fontFamily="'Cormorant Garamond', serif"
                        >
                          {symbol}
                          {Number(order.total_amount).toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
}