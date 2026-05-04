import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiAward, FiGlobe, FiPackage, FiStar } from "react-icons/fi";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const trustPillars = [
  {
    icon: FiAward,
    title: "India's First",
    body: "Pioneer in premium agarwood products from India to the world.",
  },
  {
    icon: FiGlobe,
    title: "7+ Countries",
    body: "Delivering to UAE, Saudi Arabia, Qatar, Japan, China, USA, India.",
  },
  {
    icon: FiPackage,
    title: "CITES Certified",
    body: "Fully compliant sustainable sourcing — every shipment documented.",
  },
  {
    icon: FiStar,
    title: "Grade A Sourcing",
    body: "Direct from Assam forests and Karnataka's licensed sandalwood estates.",
  },
];

export default function TrustPillars() {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg}>
      {/* TRUST PILLARS */}
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }} py={24}>
        <AnimatedSection>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8}>
            {trustPillars.map((p, i) => (
              <MotionBox key={p.title} variants={fadeUp}>
                <VStack
                  align="start"
                  spacing={4}
                  p={8}
                  border="1px solid"
                  borderColor="brand.100"
                  borderRadius="xl"
                  bg="white"
                  h="full"
                  _hover={{
                    borderColor: "brand.300",
                    transform: "translateY(-2px)",
                    boxShadow: "sm",
                  }}
                  transition="all 0.2s"
                >
                  <Box p={3} bg="brand.50" borderRadius="lg">
                    <p.icon size={22} color="var(--chakra-colors-brand-500)" />
                  </Box>
                  <Text
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="xl"
                    fontWeight="500"
                    color="oud.800"
                  >
                    {p.title}
                  </Text>
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    color="oud.500"
                    lineHeight="1.8"
                  >
                    {p.body}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </AnimatedSection>
      </Box>
    </Box>
  );
}
