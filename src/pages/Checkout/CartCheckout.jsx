import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";

import CartReview from "./CartReview";
import Confirmation from "./Confirmation";
import { FiCheck } from "react-icons/fi";
import Payment from "./Payment";
import Shipping from "./Shipping";

const steps = ["Shipping", "Cart Review", "Payment", "Confirmation"];

export default function CartCheckout() {
  const bg = useColorModeValue("ivory", "gray.900");

  const [step, setStep] = useState(0);

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
        {/* Steps */}
        {step === 0 && <Shipping setStep={setStep} />}

        {step === 1 && <CartReview setStep={setStep} />}

        {step === 2 && <Payment setStep={setStep} />}

        {step === 3 && <Confirmation />}
      </Box>
    </Box>
  );
}
