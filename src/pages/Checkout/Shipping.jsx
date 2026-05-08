import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  createAddress,
  deleteAddress,
  fetchAddresses,
} from "../../store/slices/addressSlice";
import { useDispatch, useSelector } from "react-redux";

import { FiArrowLeft } from "react-icons/fi";
import { placeOrder } from "../../store/slices/checkoutSlice";

export default function Shipping({ setStep }) {
  const dispatch = useDispatch();
  const toast = useToast();

  const { addresses, loading } = useSelector((s) => s.address);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [shipping, setShipping] = useState({
    full_name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
    is_default: false,
  });

  // FETCH ADDRESSES
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  // CREATE ADDRESS
  const handleAddAddress = async () => {
    if (
      !shipping.full_name ||
      !shipping.line1 ||
      !shipping.city ||
      !shipping.state ||
      !shipping.postal_code ||
      !shipping.country ||
      !shipping.phone
    ) {
      toast({
        title: "Please fill all required fields",
        status: "warning",
        duration: 2000,
        position: "top",
      });

      return;
    }

    const res = await dispatch(createAddress(shipping));

    if (res.meta.requestStatus === "fulfilled") {
      setShipping({
        full_name: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone: "",
        is_default: false,
      });
    }
  };

  // CHECKOUT
  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast({
        title: "Please select address",
        status: "warning",
        duration: 2000,
        position: "top",
      });

      return;
    }

    const res = await dispatch(
      placeOrder({
        addressId: selectedAddress,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast({
        title: "Order placed successfully",
        status: "success",
        duration: 3000,
        position: "top",
      });

      setStep(1);
    } else {
      console.log("❌ ORDER FAILED:", res.payload);

      toast({
        title: "Checkout failed",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  return (
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
        {/* Full Name */}
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>

          <Input
            value={shipping.full_name}
            onChange={(e) =>
              setShipping((s) => ({
                ...s,
                full_name: e.target.value,
              }))
            }
          />
        </FormControl>

        {/* Phone */}
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>

          <Input
            value={shipping.phone}
            onChange={(e) =>
              setShipping((s) => ({
                ...s,
                phone: e.target.value,
              }))
            }
            placeholder="+91 or international"
          />
        </FormControl>

        {/* Address Line 1 */}
        <FormControl isRequired>
          <FormLabel>Address Line 1</FormLabel>

          <Input
            value={shipping.line1}
            onChange={(e) =>
              setShipping((s) => ({
                ...s,
                line1: e.target.value,
              }))
            }
          />
        </FormControl>

        {/* Address Line 2 */}
        <FormControl>
          <FormLabel>Address Line 2</FormLabel>

          <Input
            value={shipping.line2}
            onChange={(e) =>
              setShipping((s) => ({
                ...s,
                line2: e.target.value,
              }))
            }
          />
        </FormControl>

        {/* City / State / Postal */}
        <SimpleGrid columns={3} spacing={4} w="full">
          <FormControl isRequired>
            <FormLabel>City</FormLabel>

            <Input
              value={shipping.city}
              onChange={(e) =>
                setShipping((s) => ({
                  ...s,
                  city: e.target.value,
                }))
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>State</FormLabel>

            <Input
              value={shipping.state}
              onChange={(e) =>
                setShipping((s) => ({
                  ...s,
                  state: e.target.value,
                }))
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Postal Code</FormLabel>

            <Input
              value={shipping.postal_code}
              onChange={(e) =>
                setShipping((s) => ({
                  ...s,
                  postal_code: e.target.value,
                }))
              }
            />
          </FormControl>
        </SimpleGrid>

        {/* Country */}
        <FormControl>
          <FormLabel>Country</FormLabel>

          <Select
            value={shipping.country}
            onChange={(e) =>
              setShipping((s) => ({
                ...s,
                country: e.target.value,
              }))
            }
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

        {/* ADD ADDRESS BUTTON */}
        <Button
          w="full"
          colorScheme="blackAlpha"
          onClick={handleAddAddress}
          isLoading={loading}
        >
          Add Address
        </Button>

        {/* Buttons */}
        <HStack w="full" spacing={4} pt={2}>
          <Button onClick={() => setStep(0)} leftIcon={<FiArrowLeft />}>
            Back
          </Button>

          <Button
            onClick={handleCheckout}
            isLoading={loading}
            colorScheme="green"
          >
            Continue to Cart Review
          </Button>
        </HStack>
      </VStack>

      {/* ADDRESS LIST */}
      <Grid
        templateColumns="repeat(auto-fill,minmax(280px,1fr))"
        gap={6}
        mt={10}
      >
        {addresses.map((a) => (
          <Box
            key={a.id}
            bg={selectedAddress === a.id ? "brand.50" : "white"}
            p={5}
            borderRadius="xl"
            boxShadow="sm"
            border="2px solid"
            borderColor={selectedAddress === a.id ? "brand.400" : "gray.100"}
            cursor="pointer"
            transition="0.2s"
            onClick={() => setSelectedAddress(a.id)}
          >
            <Text fontWeight="bold">{a.full_name}</Text>

            <Text fontSize="sm">{a.line1}</Text>

            <Text fontSize="sm">{a.line2}</Text>

            <Text fontSize="sm">
              {a.city}, {a.state} - {a.postal_code}
            </Text>

            <Text fontSize="sm">{a.country}</Text>

            <Text fontSize="sm">📞 {a.phone}</Text>

            {selectedAddress === a.id && (
              <Text mt={2} fontSize="xs" fontWeight="bold" color="green.500">
                Selected Address
              </Text>
            )}

            <Button
              mt={3}
              size="sm"
              colorScheme="red"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteAddress(a.id));
              }}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
