import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { FiArrowRight, FiStar } from "react-icons/fi";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

export default function MiddleEastSpotlight() {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg}>
      {/* FULL-BLEED MIDDLE EAST SPOTLIGHT */}
      <Box
        position="relative"
        h={{ base: "400px", md: "500px" }}
        overflow="hidden"
        my={8}
      >
        <Box
          position="absolute"
          inset={0}
          bgImage="url('https://images.unsplash.com/photo-1591981563701-81c0e7f4ad4f?w=1600')"
          bgSize="cover"
          bgPosition="center"
          filter="brightness(0.4)"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-r, rgba(30,21,3,0.9), rgba(30,21,3,0.4))"
        />
        <AnimatedSection
          position="relative"
          maxW="1400px"
          mx="auto"
          px={{ base: 6, md: 16 }}
          h="full"
          display="flex"
          alignItems="center"
        >
          <MotionBox variants={fadeUp} maxW="560px">
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="xs"
              letterSpacing="0.3em"
              textTransform="uppercase"
              color="brand.300"
              mb={4}
            >
              Prayer & Ritual
            </Text>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="300"
              color="white"
              lineHeight="1.1"
              mb={6}
            >
              {" "}
              Malas for Hindu Worship.
              <br />
              <Text as="span" fontStyle="italic" color="brand.300">
                Tasbih for Islamic Dhikr.
              </Text>
            </Text>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="sm"
              color="rgba(255,255,255,0.7)"
              lineHeight="1.9"
              mb={8}
            >
              Handstrung from Grade A agarwood and Mysore sandalwood. 108 beads
              for japa meditation. 99 beads for dhikr. Each mala carries the
              living fragrance of the sacred wood.
            </Text>
            <Button
              as={Link}
              to="/spiritual"
              variant="gold"
              size="lg"
              px={10}
              rightIcon={<FiArrowRight />}
            >
              Spiritual Collection
            </Button>
          </MotionBox>
        </AnimatedSection>
      </Box>
    </Box>
  );
}
