import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import React from "react";
import { motion } from "framer-motion";
import { selectAllProducts } from "../../store/slices/productsSlice";
import { useSelector } from "react-redux";

const MotionBox = motion(Box);
const traditions = [
  {
    tradition: "Hindu Tradition",
    icon: " ",
    title: "The Sacred Wood of the Vedas",
    body: `Sandalwood (Chandana) and agarwood are central to Hindu ritual since the Rigveda. Chandan paste is
applied as tilak on the forehead of deities and devotees alike. The Japa mala — 108 beads — is the sacred
tool for mantra repetition. The number 108 represents the distance between Sun, Moon, and Earth in Vedic
cosmology. Agarwood smoke purifies the atmosphere during yagna and puja. Our malas are made for serious
sadhana.`,
    products: ["oud-mala-hindu-001", "sand-mala-hindu-001"],
    color: "orange.500",
    bg: "orange.50",
    image: "https://images.unsplash.com/photo-1609198093478-2e6bca3e3c75?w=800",
  },
  {
    tradition: "Islamic Tradition",
    icon: " ",
    title: "Oud in the Prophetic Tradition",
    body: `Agarwood (Oud / Aloes Wood) holds a sacred place in Islamic tradition. The Prophet Muhammad 
 is
reported to have used oud for its blessed properties. The Tasbih — 99 beads for the 99 names of Allah — is
the companion of every Muslim in dhikr. Our agarwood tasbih carries the natural fragrance of oud from India's
Assam region, the finest source in the world. Available in 33, 99, and 100 bead counts.`,
    products: ["oud-mala-muslim-001", "sand-mala-muslim-001"],
    color: "green.600",
    bg: "green.50",
    image: "https://images.unsplash.com/photo-1591981563701-81c0e7f4ad4f?w=800",
  },
  {
    tradition: "Japanese Tradition",
    icon: " ",
    title: "Kodo — The Way of Incense",
    body: `Japan's ancient art of Kodo ( ) — literally "the way of fragrance" — has elevated agarwood ( ,
Jinko) to one of the most revered materials in Japanese culture. Used in Buddhist temples, traditional tea
ceremonies, and as gifts between nobility for over 1,000 years. Our bakhoor-grade agarwood chips and pure
oils meet the highest standards expected by Japanese connoisseurs. Mysore sandalwood powder is also prized in
Japan for traditional skincare and ritual.`,
    products: ["oud-chips-001", "sand-powder-001"],
    color: "red.500",
    bg: "red.50",
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df3e3f6?w=800",
  },
];
const journeySteps = [
  {
    step: "01",
    title: "The Living Tree",
    body: "Aquilaria trees in Assam produce agarwood resin only when infected by a specific mold — creating resin-saturated heartwood over 15–200 years.",
  },
  {
    step: "02",
    title: "Ethical Harvest",
    body: "CITES-regulated harvest by licensed collectors. Each tree is assessed for resin content before selective harvesting. Forest regeneration is mandatory.",
  },
  {
    step: "03",
    title: "Grading",
    body: "Our master graders sort chips, powder, and heartwood by visual inspection and scent. Grade A indicates over 25% oleoresin content — the highest standard.",
  },
  {
    step: "04",
    title: "Artisan Craft",
    body: "Beads are hand-turned, mala threads are hand-strung, oils are distilled in small batches. No mass production.",
  },
  {
    step: "05",
    title: "To You",
    body: "Packed in recyclable materials with handwritten authenticity notes. Shipped globally with full CITES documentation for international orders.",
  },

];
export default function SpiritualExperience() {
  const allProducts = useSelector(selectAllProducts);
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg} pt={24}>
      {/* Hero */}
      <Box
        position="relative"
        h="60vh"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          position="absolute"
          inset={0}
          bgImage="url('https://images.unsplash.com/photo-1609198093478-2e6bca3e3c75?w=1600')"
          bgSize="cover"
          bgPosition="center"
          filter="brightness(0.35)"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, transparent 40%, rgba(250,247,242,1) 100%)"
        />
        <VStack position="relative" textAlign="center" spacing={4} px={6}>
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="xs"
            letterSpacing="0.35em"
            textTransform="uppercase"
            color="brand.300"
          >
            Sacred Traditions
          </Text>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
            fontWeight="300"
            color="white"
            lineHeight="0.95"
          >
            The Spiritual
            <br />
            <Text as="span" fontStyle="italic" color="brand.300">
              Experience
            </Text>
          </Text>
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="sm"
            color="rgba(255,255,255,0.7)"
            maxW="500px"
            lineHeight="1.9"
          >
            For thousands of years, agarwood and sandalwood have been humanity's
            bridge between the earthly and the divine.
          </Text>
        </VStack>
      </Box>
      {/* Three Traditions */}
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 10 }} py={20}>
        <VStack spacing={24}>
          {traditions.map((trad, i) => {
            const tradProducts = trad.products
              .map((id) => allProducts.find((p) => p.id === id))
              .filter(Boolean);
            return (
              <MotionBox
                key={trad.tradition}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                w="full"
              >
                <Grid
                  templateColumns={{
                    base: "1fr",
                    lg: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                  }}
                  gap={12}
                  alignItems="center"
                >
                  <Box order={{ base: 0, lg: i % 2 === 0 ? 0 : 1 }}>
                    <Box
                      h={{ base: "280px", md: "420px" }}
                      borderRadius="2xl"
                      overflow="hidden"
                      bgImage={`url('${trad.image}')`}
                      bgSize="cover"
                      bgPosition="center"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        inset={0}
                        bg={`rgba(0,0,0,0.25)`}
                      />
                      <Box
                        position="absolute"
                        top={6}
                        left={6}
                        bg={trad.bg}
                        borderRadius="xl"
                        px={4}
                        py={2}
                      >
                        <HStack spacing={2}>
                          <Text fontSize="lg">{trad.icon}</Text>
                          <Text
                            fontFamily="'Jost', sans-serif"
                            fontSize="xs"
                            letterSpacing="0.15em"
                            textTransform="uppercase"
                            color={trad.color}
                            fontWeight="600"
                          >
                            {trad.tradition}
                          </Text>
                        </HStack>
                      </Box>
                    </Box>
                  </Box>
                  <VStack
                    align="start"
                    spacing={6}
                    order={{ base: 1, lg: i % 2 === 0 ? 1 : 0 }}
                  >
                    <Text
                      fontFamily="'Cormorant Garamond', serif"
                      fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                      fontWeight="300"
                      color="oud.900"
                      lineHeight="1.15"
                    >
                      {trad.title}
                    </Text>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="sm"
                      color="oud.600"
                      lineHeight="2"
                    >
                      {trad.body}
                    </Text>
                    {tradProducts.length > 0 && (
                      <Box w="full">
                        <Text
                          fontFamily="'Jost', sans-serif"
                          fontSize="xs"
                          letterSpacing="0.2em"
                          textTransform="uppercase"
                          color="brand.400"
                          mb={4}
                        >
                          Related Products
                        </Text>
                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                          {tradProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                          ))}
                        </SimpleGrid>
                      </Box>
                    )}
                  </VStack>
                </Grid>
                <Divider mt={12} borderColor="brand.100" />
              </MotionBox>
            );
          })}
        </VStack>
      </Box>
      {/* Journey from forest to you */}
      <Box bg="oud.900" py={20}>
        <Box maxW="1400px" mx="auto" px={{ base: 4, md: 10 }}>
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                letterSpacing="0.3em"
                textTransform="uppercase"
                color="brand.400"
              >
                Provenance
              </Text>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="300"
                color="white"
              >
                From Forest to Your Hands
              </Text>
            </VStack>
            <SimpleGrid
              columns={{ base: 1, sm: 2, lg: 5 }}
              spacing={6}
              w="full"
            >
              {journeySteps.map((step, i) => (
                <MotionBox
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <VStack
                    align="start"
                    spacing={4}
                    p={6}
                    bg="oud.800"
                    borderRadius="xl"
                    h="full"
                  >
                    <Text
                      fontFamily="'Cormorant Garamond', serif"
                      fontSize="4xl"
                      fontWeight="300"
                      color="brand.400"
                    >
                      {step.step}
                    </Text>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="sm"
                      fontWeight="600"
                      color="brand.200"
                      letterSpacing="0.05em"
                    >
                      {step.title}
                    </Text>
                    <Text
                      fontFamily="'Jost', sans-serif"
                      fontSize="xs"
                      color="oud.400"
                      lineHeight="1.9"
                    >
                      {step.body}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
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
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
