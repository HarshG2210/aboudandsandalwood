import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  Text,
  VStack,
  HStack,
  Divider,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { FiInstagram, FiYoutube } from "react-icons/fi";
import { RiWhatsappLine } from "react-icons/ri";
export default function Footer() {
  return (
    <Box as="footer" bg="oud.900" color="oud.100" pt={16} pb={8} mt={24}>
      <Box maxW="1400px" mx="auto" px={{ base: 6, md: 12 }}>
        <Grid
          templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }}
          gap={12}
          mb={12}
        >
          {/* Brand */}
          <VStack align="start" spacing={4}>
            <Box>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="3xl"
                fontWeight="300"
                letterSpacing="0.12em"
                color="brand.200"
              >
                ABOUD
              </Text>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="9px"
                letterSpacing="0.3em"
                color="brand.400"
                textTransform="uppercase"
              >
                & Sandalwood
              </Text>
            </Box>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="sm"
              color="oud.300"
              lineHeight="1.8"
              maxW="280px"
            >
              India's first dedicated agarwood and sandalwood atelier. Rare
              fragrances, sacred traditions, global reach.
            </Text>
            <HStack spacing={3} pt={2}>
              <IconButton
                icon={<FiInstagram />}
                variant="ghost"
                size="sm"
                color="oud.300"
                _hover={{ color: "brand.300" }}
                aria-label="Instagram"
              />
              <IconButton
                icon={<RiWhatsappLine />}
                variant="ghost"
                size="sm"
                color="oud.300"
                _hover={{ color: "brand.300" }}
                aria-label="WhatsApp"
              />
              <IconButton
                icon={<FiYoutube />}
                variant="ghost"
                size="sm"
                color="oud.300"
                _hover={{ color: "brand.300" }}
                aria-label="YouTube"
              />
            </HStack>
          </VStack>
          {/* Shop */}
          <VStack align="start" spacing={3}>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="brand.300"
              fontWeight="600"
            >
              Shop
            </Text>
            {[
              "Agarwood (Oud)",
              "Sandalwood",
              "Prayer Malas",
              "Oils & Attars",
              "Bakhoor Chips",
            ].map((item) => (
              <Link key={item} to="/products">
                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="sm"
                  color="oud.300"
                  _hover={{ color: "brand.200" }}
                  transition="color 0.2s"
                >
                  {item}
                </Text>
              </Link>
            ))}
          </VStack>
          {/* Company */}
          <VStack align="start" spacing={3}>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="brand.300"
              fontWeight="600"
            >
              Company
            </Text>
            {[
              { label: "Our Story", to: "/about" },
              { label: "Sustainability", to: "/about" },
              { label: "Journal", to: "/blog" },
              { label: "Global Stores", to: "/global" },
              { label: "Contact", to: "/contact" },
            ].map((item) => (
              <Link key={item.to + item.label} to={item.to}>
                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="sm"
                  color="oud.300"
                  _hover={{ color: "brand.200" }}
                  transition="color 0.2s"
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </VStack>

          {/* Newsletter */}
          <VStack align="start" spacing={4}>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="brand.300"
              fontWeight="600"
            >
              Sacred Scents Newsletter
            </Text>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="sm"
              color="oud.300"
              lineHeight="1.8"
            >
              Rare drops, heritage stories, and exclusive offers.
            </Text>
            <HStack w="full">
              <Input
                placeholder="your@email.com"
                size="sm"
                bg="oud.800"
                border="1px solid"
                borderColor="oud.700"
                color="white"
                _placeholder={{ color: "oud.500" }}
                fontFamily="'Jost', sans-serif"
                _focus={{ borderColor: "brand.400", boxShadow: "none" }}
              />
              <Button variant="gold" size="sm" px={4}>
                Join
              </Button>
            </HStack>
          </VStack>
        </Grid>

        <Divider borderColor="oud.700" mb={6} />

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontFamily="'Jost', sans-serif" fontSize="xs" color="oud.500">
            © 2025 Aboud & Sandalwood. India's First Agarwood Atelier. All
            rights reserved.
          </Text>
          <HStack spacing={6} wrap="wrap">
            {[
              "Privacy Policy",
              "Terms of Use",
              "Shipping Policy",
              "CITES Compliance",
            ].map((item) => (
              <Text
                key={item}
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                color="oud.500"
                cursor="pointer"
                _hover={{
                  color: "brand.300",
                }}
              >
                {item}
              </Text>
            ))}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
