import {
  Badge,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Select,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiHeart,
  FiMenu,
  FiMoon,
  FiSearch,
  FiShoppingBag,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  fetchWishlist,
  selectWishlist,
} from "../../store/slices/wishlistSlice";
import { selectCartCount, toggleCart } from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import { CURRENCIES } from "../../hooks/useCurrency";
import { setRegion } from "../../store/slices/userSlice";

const navLinks = [
  { label: "Collection", to: "/products" },
  { label: "Spiritual", to: "/spiritual" },
  { label: "Global Store", to: "/global" },
  { label: "About", to: "/about" },
  { label: "Journal", to: "/blog" },
  { label: "Contact", to: "/contact" },
];
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const cartCount = useSelector(selectCartCount);
  const [scrolled, setScrolled] = useState(false);

  const wishlist = useSelector(selectWishlist);

  const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCurrency = (e) => {
    const found = CURRENCIES.find((c) => c.code === e.target.value);
    if (found)
      dispatch(setRegion({ region: found.region, currency: found.code }));
  };
  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      bg={
        scrolled
          ? colorMode === "dark"
            ? "gray.900"
            : "rgba(250,247,242,0.97)"
          : "transparent"
      }
      backdropFilter={scrolled ? "blur(10px)" : "none"}
      borderBottom={scrolled ? "1px solid" : "none"}
      borderColor="brand.100"
      transition="all 0.3s ease"
      boxShadow={scrolled ? "sm" : "none"}
    >
      <Flex
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={4}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Link to="/">
          <Box>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "lg", md: "2xl" }}
              fontWeight="300"
              letterSpacing="0.12em"
              color="oud.700"
              lineHeight="1"
            >
              AB
            </Text>
            <Text
              fontFamily="'Jost', sans-serif"
              fontSize="8px"
              letterSpacing="0.3em"
              color="brand.400"
              textTransform="uppercase"
              mt="-1px"
            >
              OUD & Sandalwood
            </Text>
          </Box>
        </Link>
        {/* Desktop Nav */}
        <HStack spacing={8} display={{ base: "none", lg: "flex" }}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                letterSpacing="0.15em"
                textTransform="uppercase"
                fontWeight="500"
                color="oud.600"
                _hover={{ color: "brand.500" }}
                transition="color 0.2s"
              >
                {link.label}
              </Text>
            </Link>
          ))}
        </HStack>
        {/* Actions */}
        <HStack spacing={2}>
          <Select
            size="xs"
            variant="unstyled"
            fontSize="xs"
            fontFamily="'Jost', sans-serif"
            w="90px"
            color="oud.600"
            cursor="pointer"
            onChange={handleCurrency}
            display={{ base: "none", md: "block" }}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </Select>
          <IconButton
            icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
            variant="ghost"
            size="sm"
            onClick={toggleColorMode}
            color="oud.600"
            _hover={{ color: "brand.500", bg: "brand.50" }}
            aria-label="Toggle theme"
          />
          <IconButton
            icon={<FiSearch />}
            variant="ghost"
            size="sm"
            color="oud.600"
            _hover={{ color: "brand.500", bg: "brand.50" }}
            onClick={() => navigate("/products")}
            aria-label="Search"
          />
          <Box position="relative">
            <IconButton
              icon={<FiHeart />}
              variant="ghost"
              size="sm"
              color="oud.600"
              _hover={{ color: "brand.500", bg: "brand.50" }}
              onClick={() => navigate("/wishlist")}
              aria-label="Wishlist"
            />

            {wishlistCount > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                bg="red.400"
                color="white"
                borderRadius="full"
                fontSize="9px"
                minW="16px"
                h="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {wishlistCount}
              </Badge>
            )}
          </Box>
          <IconButton
            icon={<FiUser />}
            variant="ghost"
            size="sm"
            color="oud.600"
            _hover={{ color: "brand.500", bg: "brand.50" }}
            onClick={() => navigate("/profile")}
            aria-label="Profile"
          />
          <Box position="relative">
            <IconButton
              icon={<FiShoppingBag />}
              variant="ghost"
              size="sm"
              color="oud.600"
              _hover={{ color: "brand.500", bg: "brand.50" }}
              onClick={() => dispatch(toggleCart())}
              aria-label="Cart"
            />
            {cartCount > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                bg="brand.400"
                color="white"
                borderRadius="full"
                fontSize="9px"
                minW="16px"
                h="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {cartCount}
              </Badge>
            )}
          </Box>
          <IconButton
            icon={<FiMenu />}
            variant="ghost"
            size="sm"
            display={{ base: "flex", lg: "none" }}
            onClick={onOpen}
            color="oud.600"
            aria-label="Menu"
          />
        </HStack>
      </Flex>
      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="ivory">
          <DrawerCloseButton />
          <DrawerBody pt={16}>
            <VStack align="start" spacing={6}>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="2xl"
                fontWeight="300"
              >
                Menu
              </Text>
              <Divider borderColor="brand.100" />
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={onClose}>
                  <Text
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    letterSpacing="0.15em"
                    textTransform="uppercase"
                    fontWeight="500"
                    color="oud.700"
                    _hover={{ color: "brand.500" }}
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
              <Divider borderColor="brand.100" />
              <Select
                size="sm"
                variant="outline"
                fontSize="xs"
                onChange={handleCurrency}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
