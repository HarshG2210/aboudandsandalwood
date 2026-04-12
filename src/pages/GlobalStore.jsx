//
// GlobalStore.jsx
//
import React from "react";
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Badge,
  Button,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiGlobe, FiTruck, FiPackage, FiShield } from "react-icons/fi";
const MotionBox = motion(Box);
const regions = [
  {
    region: "India",
    flag: " ",
    currency: "INR ",
    note: "Headquarters & Origin",
    shipping: "3–5 days",
    minFree: " 999",
    details: [
      "GST included",
      "Cash on delivery available",
      "Pan-India shipping",
      "Same-day dispatch",
    ],
  },
  {
    region: "UAE",
    flag: " ",
    currency: "AED",
    note: "Gulf Hub",
    shipping: "5–8 days",
    minFree: "AED 150",
    details: [
      "VAT compliant",
      "Aramex & Fetchr",
      "Dubai & Abu Dhabi priority",
      "Gift wrapping available",
    ],
  },
  {
    region: "Saudi Arabia",
    flag: " ",
    currency: "SAR",
    note: "Key Market",
    shipping: "5–8 days",
    minFree: "SAR 200",
    details: [
      "CITC compliant",
      "Aramex delivery",
      "KSA customs handled",
      "Halal certified packaging",
    ],
  },
  {
    region: "Qatar",
    flag: " ",
    currency: "QAR",
    note: "Gulf Market",
    shipping: "5–8 days",
    minFree: "QAR 180",
    details: [
      "Doha delivery available",
      "Gulf customs handled",
      "Express option",
      "Secure packaging",
    ],
  },
  {
    region: "Japan",
    flag: " ",
    currency: "JPY ¥",
    note: "Kodo Market",
    shipping: "7–12 days",
    minFree: "¥6000",
    details: [
      "EMS & DHL",
      "Japanese customs compliant",
      "CITES docs included",
      "Kodo-grade selection",
    ],
  },
  {
    region: "China",
    flag: " ",
    currency: "CNY ¥",
    note: "Emerging Market",
    shipping: "7–14 days",
    minFree: "¥300",
    details: [
      "DHL Express",
      "China customs handled",
      "CITES certified",
      "Mandarin support",
    ],
  },
  {
    region: "USA",
    flag: " ",
    currency: "USD $",
    note: "North America",
    shipping: "8–14 days",
    minFree: "$50",
    details: [
      "FedEx & USPS",
      "All US states",
      "CITES compliant",
      "No restrictions on our products",
    ],
  },
  {
    region: "Canada",
    flag: " ",
    currency: "USD $",
    note: "North America",
    shipping: "10–16 days",
    minFree: "$60",
    details: [
      "Canada Post & Fedex",
      "CBSA cleared",
      "All provinces",
      "Bilingual support",
    ],
  },
];
const GlobalStore = () => {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg} pt={24} minH="100vh">
      <Box
        bg="oud.900"
        py={16}
        bgImage="url('https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=1400')"
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        <Box position="absolute" inset={0} bg="rgba(30,21,3,0.85)" />
        <VStack position="relative" textAlign="center" spacing={4} px={6}>
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="xs"
            letterSpacing="0.35em"
            textTransform="uppercase"
            color="brand.400"
          >
            Worldwide Delivery
          </Text>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="300"
            color="white"
          >
            Global Store
          </Text>
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="sm"
            color="rgba(255,255,255,0.65)"
            maxW="480px"
          >
            India's finest agarwood and sandalwood delivered to 7+ countries
            with full compliance documentation.
          </Text>
        </VStack>
      </Box>
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 10 }} py={20}>
        {/* Shipping benefits */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={16}>
          {[
            {
              icon: FiTruck,
              title: "Free Shipping",
              body: "On qualifying orders per region",
            },
            {
              icon: FiPackage,
              title: "Gift Wrapping",
              body: "Premium packaging on request",
            },
            {
              icon: FiShield,
              title: "CITES Certified",
              body: "Full export documentation",
            },
            {
              icon: FiGlobe,
              title: "7+ Countries",
              body: "Growing global network",
            },
          ].map((item) => (
            <VStack
              key={item.title}
              spacing={3}
              p={6}
              bg="white"
              borderRadius="xl"
              border="1px solid"
              borderColor="brand.100"
              align="start"
            >
              <Box p={2} bg="brand.50" borderRadius="lg">
                <item.icon size={18} color="var(--chakra-colors-brand-500)" />
              </Box>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="sm"
                fontWeight="600"
                color="oud.800"
              >
                {item.title}
              </Text>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                color="oud.500"
              >
                {item.body}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
        <Text
          fontFamily="'Cormorant Garamond', serif"
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="300"
          color="oud.800"
          mb={10}
        >
          We Ship To
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {regions.map((r, i) => (
            <MotionBox
              key={r.region}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <Box
                p={6}
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="brand.100"
                h="full"
                _hover={{ borderColor: "brand.300", boxShadow: "sm" }}
                transition="all 0.2s"
              >
                <HStack justify="space-between" mb={4}>
                  <HStack spacing={3}>
                    <Text fontSize="2xl">{r.flag}</Text>
                    <Box>
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontWeight="600"
                        fontSize="sm"
                        color="oud.800"
                      >
                        {r.region}
                      </Text>
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="9px"
                        letterSpacing="0.1em"
                        color="brand.400"
                        textTransform="uppercase"
                      >
                        {r.note}
                      </Text>
                    </Box>
                  </HStack>
                  <Badge
                    bg="brand.50"
                    color="brand.600"
                    fontSize="9px"
                    fontFamily="'Jost', sans-serif"
                  >
                    {r.currency}
                  </Badge>
                </HStack>
                <Divider borderColor="brand.100" mb={4} />
                <VStack align="start" spacing={2} mb={4}>
                  <HStack>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="xs"
                      color="oud.500"
                    >
                      Delivery:
                    </Text>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="xs"
                      color="brand.500"
                      fontWeight="500"
                    >
                      {r.shipping}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="xs"
                      color="oud.500"
                    >
                      Free from:
                    </Text>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="xs"
                      color="brand.500"
                      fontWeight="500"
                    >
                      {r.minFree}
                    </Text>
                  </HStack>
                </VStack>
                <VStack align="start" spacing={1}>
                  {r.details.map((d) => (
                    <HStack key={d} spacing={2}>
                      <Box
                        w="4px"
                        h="4px"
                        borderRadius="full"
                        bg="brand.300"
                        flexShrink={0}
                      />
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="10px"
                        color="oud.500"
                      >
                        {d}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default GlobalStore;
