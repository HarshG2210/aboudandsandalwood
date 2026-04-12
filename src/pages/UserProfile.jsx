import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Input,
  Badge,
  Avatar,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  useToast,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import {
  FiUser,
  FiHeart,
  FiPackage,
  FiLogOut,
  FiEdit2,
  FiStar,
} from "react-icons/fi";
import { loginUser, logoutUser, selectUser } from "../store/slices/userSlice";
import { selectAllProducts } from "../store/slices/productsSlice";
export default function UserProfile() {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector(selectUser);
  const allProducts = useSelector(selectAllProducts);
  const wishlistIds = useSelector((s) => s.wishlist.items);
  const bg = useColorModeValue("ivory", "gray.900");
  const [loginForm, setLoginForm] = useState({ phone: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const handleSendOtp = () => {
    if (!loginForm.phone) {
      toast({
        title: "Enter phone number",
        status: "warning",
        position: "top",
      });
      return;
    }
    setOtpSent(true);
    toast({
      title: "OTP Sent (demo: 123456)",
      status: "info",
      duration: 3000,
      position: "top",
    });
  };
  const handleLogin = () => {
    if (loginForm.otp !== "123456") {
      toast({
        title: "Invalid OTP — use 123456 for demo",
        status: "error",
        position: "top",
      });
      return;
    }
    dispatch(
      loginUser({ name: "Valued Patron", phone: loginForm.phone, email: "" })
    );
    toast({ title: "Welcome back!", status: "success", position: "top" });
  };
  const wishlistProducts = wishlistIds
    .map((w) => allProducts.find((p) => p.id === w.id))
    .filter(Boolean);
  if (!user.isAuthenticated) {
    return (
      <Box bg={bg} pt={32} pb={24} minH="100vh">
        <Box maxW="400px" mx="auto" px={4}>
          <VStack
            spacing={8}
            bg="white"
            p={10}
            borderRadius="2xl"
            border="1px solid"
            borderColor="brand.100"
          >
            <VStack spacing={2} textAlign="center">
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="3xl"
                fontWeight="300"
                color="oud.900"
              >
                Sign In
              </Text>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                color="oud.500"
              >
                Login with your phone number via OTP
              </Text>
            </VStack>
            <VStack spacing={4} w="full">
              <FormControl>
                <FormLabel
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  color="oud.600"
                >
                  Phone Number
                </FormLabel>
                <HStack>
                  <Input
                    value={loginForm.phone}
                    onChange={(e) =>
                      setLoginForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+91 or international"
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    borderColor="brand.200"
                    _focus={{ borderColor: "brand.400", boxShadow: "none" }}
                  />
                  <Button
                    variant="outline_gold"
                    size="md"
                    onClick={handleSendOtp}
                    isDisabled={otpSent}
                    flexShrink={0}
                  >
                    {otpSent ? "Sent " : "OTP"}
                  </Button>
                </HStack>
              </FormControl>
              {otpSent && (
                <FormControl>
                  <FormLabel
                    fontFamily="'Jost', sans-serif"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    color="oud.600"
                  >
                    OTP
                  </FormLabel>
                  <Input
                    value={loginForm.otp}
                    onChange={(e) =>
                      setLoginForm((f) => ({ ...f, otp: e.target.value }))
                    }
                    placeholder="Enter 6-digit OTP"
                    fontFamily="'Jost', sans-serif"
                    fontSize="sm"
                    borderColor="brand.200"
                    _focus={{ borderColor: "brand.400", boxShadow: "none" }}
                    maxLength={6}
                  />
                </FormControl>
              )}
              {otpSent && (
                <Button variant="gold" w="full" size="lg" onClick={handleLogin}>
                  Verify & Sign In
                </Button>
              )}
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                color="oud.400"
                textAlign="center"
              >
                Demo OTP: 123456
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    );
  }
  return (
    <Box bg={bg} pt={24} pb={24} minH="100vh">
      <Box maxW="1100px" mx="auto" px={{ base: 4, md: 8 }}>
        {/* Profile Header */}
        <Box
          bg="oud.900"
          borderRadius="2xl"
          p={8}
          mb={8}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top={0}
            right={0}
            w="300px"
            h="300px"
            bgImage="url('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600')"
            bgSize="cover"
            bgPosition="center"
            opacity={0.1}
            borderRadius="2xl"
          />
          <HStack spacing={6} flexWrap="wrap" gap={4}>
            <Avatar
              size="xl"
              name={user.profile?.name}
              bg="brand.400"
              color="white"
              fontFamily="'Cormorant Garamond',
serif"
              fontSize="2xl"
            />
            <Box flex={1}>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="3xl"
                fontWeight="300"
                color="white"
              >
                {user.profile?.name}
              </Text>
              <Text
                fontFamily="'Jost', sans-serif"
                fontSize="sm"
                color="brand.300"
              >
                {user.profile?.phone}
              </Text>
              <HStack mt={3} spacing={4} flexWrap="wrap">
                <Badge
                  bg="brand.400"
                  color="white"
                  fontFamily="'Jost', sans-serif"
                  fontSize="9px"
                  letterSpacing="0.1em"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  Verified Customer
                </Badge>
                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  color="oud.400"
                >
                  {user.orders.length} orders
                </Text>
                <Text
                  fontFamily="'Jost', sans-serif"
                  fontSize="xs"
                  color="oud.400"
                >
                  {wishlistIds.length} in wishlist
                </Text>
              </HStack>
            </Box>
            <Button
              variant="outline_gold"
              size="sm"
              leftIcon={<FiLogOut />}
              onClick={() => dispatch(logoutUser())}
              color="oud.300"
              borderColor="oud.600"
            >
              Sign Out
            </Button>
          </HStack>
        </Box>
        <Tabs colorScheme="orange" variant="line">
          <TabList borderColor="brand.100">
            {[
              { label: "Orders", icon: FiPackage },
              { label: "Wishlist", icon: FiHeart },
              { label: "Profile", icon: FiUser },
            ].map((t) => (
              <Tab
                key={t.label}
                fontFamily="'Jost', sans-serif"
                fontSize="xs"
                letterSpacing="0.15em"
                textTransform="uppercase"
                _selected={{ color: "brand.500", borderColor: "brand.400" }}
              >
                <HStack spacing={2}>
                  <t.icon size={13} />
                  <Text>{t.label}</Text>
                </HStack>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {/* Orders */}
            <TabPanel px={0} py={8}>
              {user.orders.length === 0 ? (
                <VStack py={16} spacing={4} color="oud.400">
                  <FiPackage size={40} />
                  <Text fontFamily="'Cormorant Garamond', serif" fontSize="2xl">
                    No orders yet
                  </Text>
                  <Button as={Link} to="/products" variant="gold" size="sm">
                    Shop Now
                  </Button>
                </VStack>
              ) : (
                <VStack spacing={4}>
                  {user.orders.map((order) => (
                    <Box
                      key={order.id}
                      bg="white"
                      p={6}
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="brand.100"
                      w="full"
                    >
                      <HStack justify="space-between" flexWrap="wrap" gap={3}>
                        <Box>
                          <Text
                            fontFamily="'Jost', sans-serif"
                            fontWeight="600"
                            fontSize="sm"
                            color="oud.800"
                          >
                            {order.id}
                          </Text>
                          <Text
                            fontFamily="'Jost', sans-serif"
                            fontSize="xs"
                            color="oud.400"
                          >
                            {new Date(order.date).toLocaleDateString()}
                          </Text>
                        </Box>
                        <HStack spacing={3}>
                          <Text
                            fontFamily="'Cormorant Garamond', serif"
                            fontSize="xl"
                            fontWeight="500"
                            color="brand.500"
                          >
                            {order.total?.toLocaleString()}
                          </Text>
                          <Badge
                            bg="green.50"
                            color="green.600"
                            fontFamily="'Jost', sans-serif"
                            fontSize="9px"
                            letterSpacing="0.1em"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            {order.status}
                          </Badge>
                        </HStack>
                      </HStack>
                      <Divider my={3} borderColor="brand.100" />
                      <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3 }}
                        spacing={2}
                      >
                        {order.items?.map((item) => (
                          <Text
                            key={item.id}
                            fontFamily="'Jost', sans-serif"
                            fontSize="xs"
                            color="oud.500"
                          >
                            {item.name} × {item.quantity}
                          </Text>
                        ))}
                      </SimpleGrid>
                    </Box>
                  ))}
                </VStack>
              )}
            </TabPanel>
            {/* Wishlist */}
            <TabPanel px={0} py={8}>
              {wishlistProducts.length === 0 ? (
                <VStack py={16} spacing={4} color="oud.400">
                  <FiHeart size={40} />
                  <Text fontFamily="'Cormorant Garamond', serif" fontSize="2xl">
                    Your wishlist is empty
                  </Text>
                  <Button as={Link} to="/products" variant="gold" size="sm">
                    Explore Collection
                  </Button>
                </VStack>
              ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                  {wishlistProducts.map((p) => (
                    <Box
                      key={p.id}
                      bg="white"
                      borderRadius="xl"
                      overflow="hidden"
                      border="1px solid"
                      borderColor="brand.100"
                      as={Link}
                      to={`/products/${p.id}`}
                    >
                      <Box
                        h="160px"
                        bgImage={`url('${p.images[0]}')`}
                        bgSize="cover"
                        bgPosition="center"
                      />
                      <Box p={4}>
                        <Text
                          fontFamily="'Cormorant Garamond', serif"
                          fontSize="lg"
                          fontWeight="400"
                          color="oud.900"
                          noOfLines={1}
                        >
                          {p.name}
                        </Text>
                        <HStack justify="space-between" mt={2}>
                          <Text
                            fontFamily="'Cormorant Garamond', serif"
                            fontSize="lg"
                            color="brand.500"
                          >
                            {" "}
                            {p.prices.INR.toLocaleString()}
                          </Text>
                          <HStack spacing={1}>
                            <FiStar
                              size={11}
                              fill="var(--chakra-colors-brand-400)"
                              color="var(--chakra-colors-brand-400)"
                            />
                            <Text
                              fontFamily="'Jost', sans-serif"
                              fontSize="xs"
                              color="oud.500"
                            >
                              {p.rating}
                            </Text>
                          </HStack>
                        </HStack>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            {/* Profile edit */}
            <TabPanel px={0} py={8}>
              <Box
                bg="white"
                p={8}
                borderRadius="2xl"
                border="1px solid"
                borderColor="brand.100"
                maxW="600px"
              >
                <Text
                  fontFamily="'Cormorant Garamond', serif"
                  fontSize="2xl"
                  fontWeight="400"
                  color="oud.900"
                  mb={6}
                >
                  Account Details
                </Text>
                <VStack spacing={5}>
                  {[
                    ["Full Name", "name", user.profile?.name],
                    ["Phone", "phone", user.profile?.phone],
                    ["Email", "email", user.profile?.email || ""],
                  ].map(([label, key, val]) => (
                    <FormControl key={key}>
                      <FormLabel
                        fontFamily="'Jost', sans-serif"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="0.1em"
                        color="oud.600"
                      >
                        {label}
                      </FormLabel>
                      <Input
                        defaultValue={val}
                        fontFamily="'Jost', sans-serif"
                        fontSize="sm"
                        borderColor="brand.200"
                        _focus={{ borderColor: "brand.400", boxShadow: "none" }}
                      />
                    </FormControl>
                  ))}
                  <Button
                    variant="gold"
                    size="md"
                    leftIcon={<FiEdit2 />}
                    onClick={() =>
                      toast({
                        title: "Profile updated",
                        status: "success",
                        position: "top",
                        duration: 2000,
                      })
                    }
                  >
                    Save Changes
                  </Button>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
