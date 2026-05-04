import {
  Box,
  Grid,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

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
const categories = [
  {
    title: "Agarwood Collection",
    subtitle: "Oud · Dehn Al Oud · Bakhoor",
    label: "agarwood",
    desc: "The world's most precious wood. Revered in Arabia, Japan, India.",
    image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=700",
    to: "/products?cat=agarwood",
  },
  {
    title: "Sandalwood Collection",
    subtitle: "Mysore · Karnataka Heritage",
    label: "sandalwood",
    desc: "Sacred since the Vedas. Pure Mysore sandalwood for ritual and luxury.",
    image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=700",
    to: "/products?cat=sandalwood",
  },
];

export default function Collection() {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg}>
      {/* TWO COLLECTIONS */}
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }} py={24}>
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
              Our Collections
            </Text>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="300"
              color="oud.800"
            >
              Two Ancient Traditions.
              <br />
              <Text as="span" fontStyle="italic">
                One Atelier.
              </Text>
            </Text>
          </MotionBox>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            {categories.map((cat, i) => (
              <MotionBox key={cat.label} variants={fadeUp}>
                <Link to={cat.to}>
                  <Box
                    position="relative"
                    h={{ base: "320px", md: "480px" }}
                    borderRadius="2xl"
                    overflow="hidden"
                    _hover={{ "& img": { transform: "scale(1.06)" } }}
                    role="group"
                  >
                    <Box
                      as="img"
                      src={cat.image}
                      alt={cat.title}
                      position="absolute"
                      inset={0}
                      w="full"
                      h="full"
                      objectFit="cover"
                      transition="transform 0.6s ease"
                      filter="brightness(0.6)"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bgGradient="linear(to-t, rgba(30,21,3,0.85) 0%, transparent 60%)"
                    />
                    <VStack
                      position="absolute"
                      bottom={8}
                      left={8}
                      align="start"
                      spacing={2}
                    >
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="9px"
                        letterSpacing="0.3em"
                        textTransform="uppercase"
                        color="brand.300"
                      >
                        {cat.subtitle}
                      </Text>
                      <Text
                        fontFamily="'Cormorant Garamond', serif"
                        fontSize={{ base: "2xl", md: "4xl" }}
                        fontWeight="300"
                        color="white"
                        lineHeight="1.1"
                      >
                        {cat.title}
                      </Text>
                      <Text
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        color="rgba(255,255,255,0.7)"
                        maxW="280px"
                      >
                        {cat.desc}
                      </Text>
                      <HStack pt={2}>
                        <Text
                          fontFamily="'Jost', sans-serif"
                          fontSize="xs"
                          letterSpacing="0.15em"
                          textTransform="uppercase"
                          color="brand.300"
                        >
                          Explore
                        </Text>
                        <FiArrowRight color="var(--chakra-colors-brand-300)" />
                      </HStack>
                    </VStack>
                  </Box>
                </Link>
              </MotionBox>
            ))}
          </Grid>
        </AnimatedSection>
      </Box>
    </Box>
  );
}
