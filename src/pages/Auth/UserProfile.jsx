import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiEdit2,
  FiHome,
  FiLogOut,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import React, { useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const auth = useAuth();

  const navigate = useNavigate();

  // ==========================================
  // PROTECT ROUTE
  // ==========================================

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!auth.profile && !auth.loadingProfile) {
      auth.fetchProfile();
    }
  }, [auth.isAuthenticated, auth.profile, auth.loadingProfile, navigate]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  // ==========================================
  // DELETE ACCOUNT
  // ==========================================

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    await auth.deleteAccount();

    navigate("/login");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (auth.loadingProfile || (auth.isAuthenticated && !auth.profile)) {
    return (
      <Center minH="100vh" bg="ivory">
        <Spinner size="xl" color="brand.400" thickness="4px" />
      </Center>
    );
  }

  if (!auth.isAuthenticated) return null;

  const user = auth.profile;

  return (
    <Box bg="ivory" minH="100vh" pt={24} pb={20}>
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        {/* PAGE TITLE */}
        <Box mb={10}>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="500"
            color="oud.900"
          >
            My Profile
          </Text>

          <Text mt={2} color="gray.500" fontSize="sm" letterSpacing="0.03em">
            Manage your profile, addresses and orders
          </Text>
        </Box>

        <Grid
          templateColumns={{
            base: "1fr",
            lg: "320px 1fr",
          }}
          gap={8}
        >
          {/* LEFT SIDEBAR */}
          <GridItem>
            <Box
              bg="white"
              borderRadius="3xl"
              overflow="hidden"
              border="1px solid"
              borderColor="brand.100"
              boxShadow="sm"
            >
              {/* TOP */}
              <Box
                bgGradient="linear(to-r, brand.400, brand.500)"
                px={8}
                py={10}
                textAlign="center"
              >
                <Avatar
                  size="2xl"
                  name={`${user.first_name} ${user.last_name}`}
                  src={user.profile_picture}
                  border="4px solid white"
                  mb={5}
                />

                <Text color="white" fontSize="2xl" fontWeight="600">
                  {user.first_name || "Guest"} {user.last_name}
                </Text>

                <Text color="whiteAlpha.800" fontSize="sm" mt={1}>
                  {user.email}
                </Text>

                <Badge
                  mt={4}
                  colorScheme={user.profile_completed ? "green" : "orange"}
                  px={4}
                  py={1}
                  borderRadius="full"
                >
                  {user.profile_completed
                    ? "Profile Completed"
                    : "Profile Incomplete"}
                </Badge>
              </Box>

              {/* QUICK ACTIONS */}
              <VStack spacing={4} align="stretch" p={6}>
                <Button
                  leftIcon={<FiShoppingBag />}
                  justifyContent="flex-start"
                  variant="ghost"
                  size="lg"
                  onClick={() => navigate("/orders")}
                >
                  My Orders
                </Button>

                <Button
                  leftIcon={<FiMapPin />}
                  justifyContent="flex-start"
                  variant="ghost"
                  size="lg"
                  onClick={() => navigate("/addresses")}
                >
                  Manage Addresses
                </Button>

                <Button
                  leftIcon={<FiEdit2 />}
                  justifyContent="flex-start"
                  variant="ghost"
                  size="lg"
                  onClick={() => navigate("/complete-profile")}
                >
                  Edit Profile
                </Button>

                <Divider />

                <Button
                  leftIcon={<FiLogOut />}
                  colorScheme="yellow"
                  variant="solid"
                  size="lg"
                  onClick={handleLogout}
                  isLoading={auth.loadingLogout}
                >
                  Logout
                </Button>

                <Button
                  leftIcon={<FiTrash2 />}
                  colorScheme="red"
                  variant="outline"
                  size="lg"
                  onClick={handleDelete}
                  isLoading={auth.loadingDelete}
                >
                  Delete Account
                </Button>
              </VStack>
            </Box>
          </GridItem>

          {/* RIGHT CONTENT */}
          <GridItem>
            <VStack spacing={8} align="stretch">
              {/* PERSONAL DETAILS */}
              <Box
                bg="white"
                borderRadius="3xl"
                border="1px solid"
                borderColor="brand.100"
                p={{ base: 6, md: 8 }}
                boxShadow="sm"
              >
                <HStack justify="space-between" mb={8}>
                  <Box>
                    <Text
                      fontFamily="'Cormorant Garamond', serif"
                      fontSize="3xl"
                      fontWeight="500"
                      color="oud.900"
                    >
                      Personal Information
                    </Text>

                    <Text mt={1} color="gray.500">
                      Your account information
                    </Text>
                  </Box>

                  <Button
                    leftIcon={<FiEdit2 />}
                    variant="outline"
                    onClick={() => navigate("/complete-profile")}
                  >
                    Edit
                  </Button>
                </HStack>

                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                  }}
                  gap={6}
                >
                  {/* FIRST NAME */}
                  <Box bg="gray.50" p={5} borderRadius="2xl">
                    <HStack mb={3}>
                      <Icon as={FiUser} color="brand.400" />
                      <Text fontSize="sm" color="gray.500">
                        First Name
                      </Text>
                    </HStack>

                    <Text fontWeight="600" fontSize="lg" color="oud.900">
                      {user.first_name || "Not Provided"}
                    </Text>
                  </Box>

                  {/* LAST NAME */}
                  <Box bg="gray.50" p={5} borderRadius="2xl">
                    <HStack mb={3}>
                      <Icon as={FiUser} color="brand.400" />
                      <Text fontSize="sm" color="gray.500">
                        Last Name
                      </Text>
                    </HStack>

                    <Text fontWeight="600" fontSize="lg" color="oud.900">
                      {user.last_name || "Not Provided"}
                    </Text>
                  </Box>

                  {/* EMAIL */}
                  <Box bg="gray.50" p={5} borderRadius="2xl">
                    <HStack mb={3}>
                      <Icon as={FiUser} color="brand.400" />
                      <Text fontSize="sm" color="gray.500">
                        Email Address
                      </Text>
                    </HStack>

                    <Text fontWeight="600" fontSize="lg" color="oud.900">
                      {user.email}
                    </Text>
                  </Box>

                  {/* PHONE */}
                  <Box bg="gray.50" p={5} borderRadius="2xl">
                    <HStack mb={3}>
                      <Icon as={FiPhone} color="brand.400" />
                      <Text fontSize="sm" color="gray.500">
                        Phone Number
                      </Text>
                    </HStack>

                    <Text fontWeight="600" fontSize="lg" color="oud.900">
                      {user.phone_number || "Not Provided"}
                    </Text>
                  </Box>
                </Grid>
              </Box>

              {/* ACCOUNT STATUS */}
              <Box
                bg="white"
                borderRadius="3xl"
                border="1px solid"
                borderColor="brand.100"
                p={{ base: 6, md: 8 }}
                boxShadow="sm"
              >
                <Text
                  fontFamily="'Cormorant Garamond', serif"
                  fontSize="3xl"
                  fontWeight="500"
                  color="oud.900"
                  mb={8}
                >
                  Account Overview
                </Text>

                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={6}
                >
                  {/* STATUS */}
                  <Box bg="brand.50" borderRadius="2xl" p={6}>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      Profile Status
                    </Text>

                    <Text fontSize="xl" fontWeight="700" color="brand.500">
                      {user.profile_completed ? "Completed" : "Incomplete"}
                    </Text>
                  </Box>

                  {/* ADDRESSES */}
                  <Box bg="brand.50" borderRadius="2xl" p={6}>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      Saved Addresses
                    </Text>

                    <Text fontSize="xl" fontWeight="700" color="brand.500">
                      Available
                    </Text>
                  </Box>

                  {/* ORDERS */}
                  <Box bg="brand.50" borderRadius="2xl" p={6}>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      Orders
                    </Text>

                    <Text fontSize="xl" fontWeight="700" color="brand.500">
                      Active Account
                    </Text>
                  </Box>
                </Grid>
              </Box>

              {/* QUICK LINKS */}
              <Box
                bg="white"
                borderRadius="3xl"
                border="1px solid"
                borderColor="brand.100"
                p={{ base: 6, md: 8 }}
                boxShadow="sm"
              >
                <Text
                  fontFamily="'Cormorant Garamond', serif"
                  fontSize="3xl"
                  fontWeight="500"
                  color="oud.900"
                  mb={8}
                >
                  Quick Actions
                </Text>

                <Stack direction={{ base: "column", md: "row" }} spacing={5}>
                  <Button
                    flex={1}
                    size="lg"
                    variant="gold"
                    leftIcon={<FiShoppingBag />}
                    onClick={() => navigate("/orders")}
                  >
                    View Orders
                  </Button>

                  <Button
                    flex={1}
                    size="lg"
                    variant="outline"
                    leftIcon={<FiHome />}
                    onClick={() => navigate("/addresses")}
                  >
                    Manage Addresses
                  </Button>

                  <Button
                    flex={1}
                    size="lg"
                    variant="outline"
                    leftIcon={<FiEdit2 />}
                    onClick={() => navigate("/complete-profile")}
                  >
                    Edit Profile
                  </Button>
                </Stack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
