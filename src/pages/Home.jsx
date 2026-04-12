import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  Badge,
  SimpleGrid,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiGlobe,
  FiPackage,
  FiStar,
} from "react-icons/fi";
import ProductCard from "../components/ui/ProductCard";
import {
  selectAllProducts,
  selectFeaturedIds,
} from "../store/slices/productsSlice";
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
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
export default function Home() {
  const allProducts = useSelector(selectAllProducts);
  const featuredIds = useSelector(selectFeaturedIds);
  const featured = featuredIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean);
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
      {/* TICKER MARQUEE  */}
      <Box bg="oud.900" py={3} overflow="hidden">
        <MotionBox
          display="flex"
          gap={12}
          animate={{ x: [0, -800] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <HStack key={i} spacing={12} whiteSpace="nowrap">
              {[
                "Agarwood · Oud",
                "Mysore Sandalwood",
                "Grade A Certified",
                "CITES Compliant",
                "Ships Worldwide",
                "India's First Atelier",
              ].map((t) => (
                <HStack key={t} spacing={3}>
                  <Box w="4px" h="4px" borderRadius="full" bg="brand.400" />
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    color="brand.300"
                  >
                    {t}
                  </Text>
                </HStack>
              ))}
            </HStack>
          ))}
        </MotionBox>
      </Box>
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
      {/* FEATURED PRODUCTS */}
      <Box bg="white" py={24}>
        <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
          <AnimatedSection>
            <MotionBox variants={fadeUp} mb={14}>
              <Flex
                justify="space-between"
                align="flex-end"
                flexWrap="wrap"
                gap={4}
              >
                <Box>
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    letterSpacing="0.3em"
                    textTransform="uppercase"
                    color="brand.400"
                    mb={3}
                  >
                    Featured
                  </Text>
                  <Text
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="300"
                    color="oud.800"
                  >
                    Prized by Collectors
                  </Text>{" "}
                </Box>
                <Button
                  as={Link}
                  to="/products"
                  variant="outline_gold"
                  rightIcon={<FiArrowRight />}
                  size="sm"
                >
                  Full Collection
                </Button>
              </Flex>
            </MotionBox>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
              {featured.map((product) => (
                <MotionBox key={product.id} variants={fadeUp}>
                  <ProductCard product={product} />
                </MotionBox>
              ))}
            </SimpleGrid>
          </AnimatedSection>
        </Box>
      </Box>
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
