import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
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

export default function CtaStrip() {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg}>
      {/* CTA STRIP */}
      <Box bg="brand.400" py={16} textAlign="center">
        <AnimatedSection>
          <MotionBox variants={fadeUp}>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="300"
              color="white"
              mb={4}
            >
              Begin Your Fragrance Journey
            </Text>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="sm"
              color="rgba(255,255,255,0.8)"
              mb={8}
              letterSpacing="0.05em"
            >
              Shipping to India · UAE · Saudi Arabia · Qatar · Japan · China ·
              USA
            </Text>
            <Button
              as={Link}
              to="/products"
              size="lg"
              px={12}
              bg="white"
              color="brand.500"
              fontFamily="'Jost', sans-serif"
              fontWeight="500"
              fontSize="xs"
              letterSpacing="0.15em"
              textTransform="uppercase"
              _hover={{ bg: "brand.50", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              rightIcon={<FiArrowRight />}
            >
              Shop Now
            </Button>
          </MotionBox>
        </AnimatedSection>
      </Box>
    </Box>
  );
}
