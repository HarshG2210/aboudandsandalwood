import {
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";
import React, { useEffect, useMemo, useState } from "react";
import {
  fetchProducts,
  selectAllProducts,
} from "../../store/slices/productsSlice";
import { selectSortBy, setSortBy } from "../../store/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../components/ui/ProductCard";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const MotionBox = motion(Box);
const CATEGORIES = ["all", "agarwood", "sandalwood"];
const TYPES = ["bracelet", "mala", "oil", "chips", "powder"];
export default function ProductListing() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const sortBy = useSelector(selectSortBy);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState(searchParams.get("cat") || "all");
  const [activeTypes, setActiveTypes] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const filtered = useMemo(() => {
    let list = allProducts;
    if (activeCat !== "all")
      list = list.filter((p) => p.category === activeCat);
    if (activeTypes.length > 0)
      list = list.filter((p) => activeTypes.includes(p.type));
    if (search.trim())
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          p.type.toLowerCase().includes(search.toLowerCase())
      );
    if (sortBy === "price-asc")
      list = [...list].sort((a, b) => a.prices.INR - b.prices.INR);
    if (sortBy === "price-desc")
      list = [...list].sort((a, b) => b.prices.INR - a.prices.INR);
    if (sortBy === "rating")
      list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [allProducts, activeCat, activeTypes, search, sortBy]);
  const bg = useColorModeValue("ivory", "gray.900");
  const FilterPanel = () => (
    <VStack align="start" spacing={6} w="full">
      <Box w="full">
        <Text
          fontFamily="'Jost', sans-serif"
          fontSize="xs"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="brand.500"
          mb={3}
          fontWeight="600"
        >
          Collection
        </Text>
        <VStack align="start" spacing={2}>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="xs"
              variant="ghost"
              color={activeCat === cat ? "brand.500" : "oud.600"}
              fontFamily="'Jost', sans-serif"
              fontWeight={activeCat === cat ? "600" : "400"}
              fontSize="sm"
              letterSpacing="0.05em"
              textTransform="capitalize"
              onClick={() => setActiveCat(cat)}
              leftIcon={
                activeCat === cat ? (
                  <Box w="6px" h="6px" borderRadius="full" bg="brand.400" />
                ) : undefined
              }
            >
              {cat === "all"
                ? "All Products"
                : cat === "agarwood"
                ? "Agarwood (Oud)"
                : "Sandalwood"}
            </Button>
          ))}
        </VStack>
      </Box>
      <Divider borderColor="brand.100" />
      <Box w="full">
        <Text
          fontFamily="'Jost', sans-serif"
          fontSize="xs"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="brand.500"
          mb={3}
          fontWeight="600"
        >
          Product Type
        </Text>
        <CheckboxGroup value={activeTypes} onChange={setActiveTypes}>
          <Stack spacing={2}>
            {TYPES.map((type) => (
              <Checkbox key={type} value={type} colorScheme="orange" size="sm">
                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="sm"
                  textTransform="capitalize"
                  color="oud.700"
                >
                  {type === "chips" ? "Bakhoor Chips" : type}
                </Text>
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>
      {activeTypes.length > 0 && (
        <Button
          size="xs"
          variant="ghost"
          color="brand.400"
          onClick={() => setActiveTypes([])}
          leftIcon={<FiX />}
          fontFamily="'Jost', sans-serif"
        >
          Clear filters
        </Button>
      )}
    </VStack>
  );
  return (
    <Box bg={bg} pt={24} minH="100vh">
      {/* Header */}
      <Box
        bg="oud.900"
        py={16}
        mb={12}
        bgImage="url('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200')"
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        <Box position="absolute" inset={0} bg="rgba(30,21,3,0.82)" />
        <Box
          position="relative"
          maxW="1400px"
          mx="auto"
          px={{ base: 6, md: 12 }}
          textAlign="center"
        >
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="xs"
            letterSpacing="0.3em"
            textTransform="uppercase"
            color="brand.400"
            mb={3}
          >
            The Complete Catalogue
          </Text>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="300"
            color="white"
          >
            Our Collection
          </Text>
        </Box>
      </Box>
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }} pb={24}>
        {/* Search + Sort bar */}
        <Flex gap={4} mb={8} flexWrap="wrap" align="center">
          <InputGroup maxW="320px" flex={1}>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="var(--chakra-colors-brand-400)" />
            </InputLeftElement>{" "}
            <Input
              placeholder="Search agarwood, mala, oil..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fontFamily="'Jost', sans-serif"
              fontSize="sm"
              bg="white"
              border="1px solid"
              borderColor="brand.100"
              _focus={{ borderColor: "brand.400", boxShadow: "none" }}
            />
          </InputGroup>
          <Select
            maxW="200px"
            size="md"
            fontFamily="'Jost', sans-serif"
            fontSize="sm"
            bg="white"
            border="1px solid"
            borderColor="brand.100"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="featured">Sort: Featured</option>
            <option value="rating">Sort: Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </Select>
          <IconButton
            icon={<FiFilter />}
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            aria-label="Filters"
            variant="outline"
            borderColor="brand.200"
            color="brand.500"
          />
          <Text
            fontFamily="'Jost', sans-serif"
            fontSize="xs"
            color="oud.400"
            letterSpacing="0.1em"
            ml="auto"
          >
            {filtered.length} products
          </Text>
        </Flex>
        {/* Category pills (desktop quick filter) */}
        <HStack spacing={3} mb={8} flexWrap="wrap">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCat === cat ? "gold" : "outline_gold"}
              onClick={() => setActiveCat(cat)}
              textTransform="capitalize"
            >
              {cat === "all"
                ? "All"
                : cat === "agarwood"
                ? "Agarwood (Oud)"
                : "Sandalwood"}
            </Button>
          ))}
        </HStack>
        <Flex gap={8} align="start">
          {/* Sidebar — desktop */}
          <Box
            w="220px"
            flexShrink={0}
            display={{ base: "none", md: "block" }}
            position="sticky"
            top="100px"
            bg="white"
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor="brand.100"
          >
            <FilterPanel />
          </Box>
          {/* Grid */}
          <Box flex={1}>
            {filtered.length === 0 ? (
              <VStack py={24} spacing={4} color="oud.400">
                <Text fontFamily="'Cormorant Garamond', serif" fontSize="2xl">
                  No products found
                </Text>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setActiveCat("all");
                    setActiveTypes([]);
                  }}
                >
                  Clear all filters
                </Button>
              </VStack>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} spacing={6}>
                {filtered.map((product, i) => (
                  <MotionBox
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <ProductCard product={product} />
                  </MotionBox>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Flex>
      </Box>

      {/* Mobile Filter Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="ivory">
          <DrawerCloseButton />
          <DrawerHeader
            fontFamily="'Cormorant Garamond', serif"
            fontWeight="400"
            fontSize="xl"
            borderBottom="1px solid"
            borderColor="brand.100"
          >
            Filter
          </DrawerHeader>
          <DrawerBody pt={6}>
            <FilterPanel />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
