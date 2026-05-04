import {
  Box,
  Divider,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { FiStar } from "react-icons/fi";

const MotionBox = motion(Box);
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};
function AnimatedSection({ children, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

const testimonials = [
  {
    name: "Abdullah Al Rashidi",
    region: "Riyadh, KSA",
    text: "The dehn al oud is unlike anything available in the local souks. Rich, deep, authentic Hind oud. I reordered within a week.",
    rating: 5,
  },
  {
    name: "Tanaka Hiroshi",
    region: "Tokyo, Japan",
    text: "Exceptional sandalwood powder for our family's traditional ceremonies. The fragrance is exactly as described — pure Mysore.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    region: "Mumbai, India",
    text: "My agarwood mala has become part of my daily sadhana. The fragrance deepens every week. True quality.",
    rating: 5,
  },
];
export default function Testimonials() {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg}>
      {/* TESTIMONIALS */}
      <Box py={24} bg="oud.900">
        <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
          <AnimatedSection>
            <MotionBox variants={fadeUp} textAlign="center" mb={14}>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                letterSpacing="0.3em"
                textTransform="uppercase"
                color="brand.400"
                mb={3}
              >
                From Our Patrons
              </Text>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="300"
                color="white"
              >
                Trusted Across Continents
              </Text>
            </MotionBox>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {testimonials.map((t, i) => (
                <MotionBox key={t.name} variants={fadeUp}>
                  <Box
                    bg="oud.800"
                    p={8}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="oud.700"
                  >
                    <HStack mb={4}>
                      {[...Array(t.rating)].map((_, j) => (
                        <FiStar
                          key={j}
                          size={12}
                          fill="var(--chakra-colors-brand-400)"
                          color="var(--chakra-colors-brand-400)"
                        />
                      ))}
                    </HStack>
                    <Text
                      fontFamily="'Cormorant Garamond', serif"
                      fontSize="lg"
                      fontStyle="italic"
                      color="oud.200"
                      lineHeight="1.8"
                      mb={6}
                    >
                      "{t.text}"
                    </Text>
                    <Divider borderColor="oud.700" mb={4} />
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="sm"
                      fontWeight="500"
                      color="brand.300"
                    >
                      {t.name}
                    </Text>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="xs"
                      color="oud.500"
                    >
                      {t.region}
                    </Text>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </AnimatedSection>
        </Box>
      </Box>
    </Box>
  );
}
