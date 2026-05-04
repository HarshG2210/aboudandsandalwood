import {
  Badge,
  Box,
  Button,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function HeroSection() {
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg}>
      {/* HERO */}
      <Box
        position="relative"
        h={{ base: "92vh", md: "100vh" }}
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
          filter="brightness(0.45)"
        />
        {/* Gold gradient overlay */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-r, rgba(30,21,3,0.85) 0%, rgba(30,21,3,0.3) 60%, transparent 100%)"
        />
        <Box
          position="relative"
          maxW="1400px"
          mx="auto"
          px={{ base: 6, md: 16 }}
          w="full"
        >
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              fontFamily="'Jost', sans-serif"
              fontSize="9px"
              letterSpacing="0.3em"
              bg="transparent"
              border="1px solid"
              borderColor="brand.300"
              color="brand.300"
              px={3}
              py={1}
              mb={6}
              textTransform="uppercase"
            >
              India's First Agarwood Atelier
            </Badge>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "4xl", sm: "6xl", md: "8xl" }}
              fontWeight="300"
              color="white"
              lineHeight="0.95"
              letterSpacing="-0.01em"
              mb={6}
            >
              The Sacred
              <br />
              <Text as="span" fontStyle="italic" color="brand.300">
                Fragrance
              </Text>
              <br />
              of Ages
            </Text>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize={{ base: "sm", md: "md" }}
              color="rgba(255,255,255,0.72)"
              maxW="440px"
              lineHeight="1.8"
              mb={10}
              letterSpacing="0.02em"
            >
              Rare agarwood and Mysore sandalwood — crafted into malas, oils,
              bracelets, and bakhoor for spiritual seekers and fragrance
              connoisseurs worldwide.{" "}
            </Text>
            <HStack spacing={4} flexWrap="wrap">
              <Button
                as={Link}
                to="/products"
                variant="gold"
                size="lg"
                px={10}
                letterSpacing="0.15em"
                rightIcon={<FiArrowRight />}
              >
                Explore Collection
              </Button>
              <Button
                as={Link}
                to="/spiritual"
                size="lg"
                px={8}
                variant="outline"
                borderColor="rgba(255,255,255,0.4)"
                color="white"
                _hover={{ bg: "rgba(255,255,255,0.1)" }}
                fontFamily="'Jost', sans-serif"
                fontWeight="400"
                fontSize="xs"
                letterSpacing="0.15em"
                textTransform="uppercase"
              >
                Our Story
              </Button>
            </HStack>
          </MotionBox>
        </Box>
        {/* Scroll hint */}
        <Box
          position="absolute"
          bottom={8}
          left="50%"
          transform="translateX(-50%)"
          textAlign="center"
        >
          <MotionBox
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="9px"
              letterSpacing="0.3em"
              color="rgba(255,255,255,0.5)"
              textTransform="uppercase"
            >
              Scroll
            </Text>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}
