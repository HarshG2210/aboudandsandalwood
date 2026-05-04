import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import {
  fetchProducts,
  selectAllProducts,
  selectFeaturedIds,
} from "../../store/slices/productsSlice";
import { motion, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";

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

export default function FeaturedProducts() {
  const allProducts = useSelector(selectAllProducts);
  const featuredIds = useSelector(selectFeaturedIds);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const featured = featuredIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean);
  const bg = useColorModeValue("ivory", "gray.900");
  return (
    <Box bg={bg}>
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
    </Box>
  );
}
