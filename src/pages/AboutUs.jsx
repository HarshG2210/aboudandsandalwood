import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Grid,
  Button,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
const MotionBox = motion(Box);
const milestones = [
  {
    year: "2018",
    title: "Founded",
    body: "Started as a passion project sourcing agarwood chips from Assam forests for personal use and close friends.",
  },
  {
    year: "2019",
    title: "First Export",
    body: "First international shipment to UAE customers who discovered us through social media.",
  },
  {
    year: "2021",
    title: "Product Range",
    body: "Expanded into prayer malas, sandalwood oil, and custom gifting for corporate clients.",
  },
  {
    year: "2022",
    title: "Certifications",
    body: "Obtained CITES certification and Karnataka forest license for sandalwood sourcing.",
  },
  {
    year: "2023",
    title: "Going Global",
    body: "Launched shipping to Japan, China, USA, and Canada. 7 countries served.",
  },
  {
    year: "2025",
    title: "India's First",
    body: "Recognised as India's first dedicated agarwood and sandalwood e-commerce brand.",
  },
];
const values = [
  {
    title: "Authenticity",
    body: "Every product carries a certificate of origin. No synthetic fragrance. No blending. Pure wood, pure resin, pure tradition.",
  },
  {
    title: "Sustainability",
    body: "CITES compliance is non-negotiable. We support forest regeneration programs in Assam and Karnataka's licensed estates.",
  },
  {
    title: "Craftsmanship",
    body: "Our artisans in Kannauj, Mysore, and Assam have trained for decades. Each mala is hand-strung, each oil slow-distilled.",
  },
  {
    title: "Heritage",
    body: "We are custodians of traditions that are thousands of years old. Our work is to bring them to the world with integrity.",
  },
];
export default function AboutUs() {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg} pt={24}>
      {/* Hero */}
      <Box
        position="relative"
        h={{ base: "60vh", md: "70vh" }}
        overflow="hidden"
        display="flex"
        alignItems="center"
      >
        <Box
          position="absolute"
          inset={0}
          bgImage="url('https://images.unsplash.com/photo-1609619385002-f40f1df3e3f6?w=1600')"
          bgSize="cover"
          bgPosition="center"
          filter="brightness(0.35)"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-r, rgba(30,21,3,0.9), transparent)"
        />
        <VStack
          position="relative"
          align="start"
          maxW="1400px"
          mx="auto"
          px={{ base: 6, md: 16 }}
          spacing={6}
        >
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="xs"
            letterSpacing="0.35em"
            textTransform="uppercase"
            color="brand.300"
          >
            Our Story
          </Text>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "4xl", md: "7xl" }}
            fontWeight="300"
            color="white"
            lineHeight="0.95"
          >
            Born From
            <br />
            <Text as="span" fontStyle="italic" color="brand.300">
              Obsession.
            </Text>
          </Text>
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="sm"
            color="rgba(255,255,255,0.7)"
            maxW="480px"
            lineHeight="2"
          >
            We are India's first dedicated agarwood and sandalwood atelier. We
            started because we could not find authentic, properly-graded oud
            anywhere online. So we sourced it ourselves.
          </Text>
        </VStack>
      </Box>
      {/* Mission */}
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 16 }} py={20}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={16}
          alignItems="center"
        >
          <VStack align="start" spacing={6}>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              letterSpacing="0.3em"
              textTransform="uppercase"
              color="brand.400"
            >
              Our Mission
            </Text>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="300"
              color="oud.900"
              lineHeight="1.1"
            >
              To bring India's most precious woods to the world — with complete
              integrity.
            </Text>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="sm"
              color="oud.600"
              lineHeight="2"
            >
              We source directly from CITES-licensed collectors in Assam and
              Karnataka's government-licensed sandalwood estates. Every product
              is hand-verified by our in-house graders. We sell only what we
              would use ourselves.
            </Text>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="sm"
              color="oud.600"
              lineHeight="2"
            >
              The name{" "}
              <Text
                as="span"
                fontStyle="italic"
                fontFamily="'Cormorant Garamond', serif"
                fontSize="md"
              >
                Aboud & Sandalwood
              </Text>{" "}
              combines "Aboud" — Arabic for "the worshiper" — with sandalwood,
              representing the meeting of Islamic and Hindu sacred fragrance
              traditions under one roof.
            </Text>
          </VStack>
          <Box
            h="480px"
            borderRadius="2xl"
            overflow="hidden"
            bgImage="url('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800')"
            bgSize="cover"
            bgPosition="center"
          />
        </Grid>
      </Box>
      {/* Values */}
      <Box bg="oud.900" py={20}>
        <Box maxW="1400px" mx="auto" px={{ base: 4, md: 10 }}>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="300"
            color="white"
            mb={12}
            textAlign="center"
          >
            What We Stand For
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
            {values.map((v, i) => (
              <MotionBox
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <VStack
                  align="start"
                  spacing={4}
                  p={8}
                  bg="oud.800"
                  borderRadius="xl"
                  h="full"
                >
                  <Text
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="2xl"
                    fontWeight="500"
                    color="brand.300"
                  >
                    {v.title}
                  </Text>
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    color="oud.400"
                    lineHeight="1.9"
                  >
                    {v.body}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      {/* Timeline */}
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 10 }} py={20}>
        <Text
          fontFamily="'Cormorant Garamond', serif"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="300"
          color="oud.800"
          mb={12}
          textAlign="center"
        >
          Our Journey
        </Text>
        <VStack spacing={0} maxW="640px" mx="auto">
          {milestones.map((m, i) => (
            <MotionBox
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              w="full"
            >
              <HStack align="start" spacing={6} pb={8}>
                <VStack spacing={0} align="center" w="60px" flexShrink={0}>
                  <Text
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="xl"
                    fontWeight="500"
                    color="brand.400"
                  >
                    {m.year}
                  </Text>
                  {i < milestones.length - 1 && (
                    <Box w="1px" h="full" bg="brand.200" mt={2} minH="40px" />
                  )}
                </VStack>
                <Box pb={4}>
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    fontWeight="600"
                    color="oud.800"
                    mb={1}
                  >
                    {m.title}
                  </Text>

                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    color="oud.500"
                    lineHeight="1.8"
                  >
                    {m.body}
                  </Text>
                </Box>
              </HStack>
            </MotionBox>
          ))}
        </VStack>
        <Box textAlign="center" mt={8}>
          <Button
            as={Link}
            to="/products"
            variant="gold"
            size="lg"
            px={10}
            rightIcon={<FiArrowRight />}
          >
            Shop the Collection
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
