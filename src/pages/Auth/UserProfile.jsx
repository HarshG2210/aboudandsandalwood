import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const auth = useAuth();
  const navigate = useNavigate();

  // ================= PROTECT ROUTE =================
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!auth.profile && !auth.loadingProfile) {
      auth.fetchProfile();
    }
  }, [auth.isAuthenticated, auth.profile, auth.loadingProfile, navigate]);

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirm) return;

    await auth.deleteAccount();
    navigate("/login");
  };

  // ================= LOADER =================
  if (auth.loadingProfile || (auth.isAuthenticated && !auth.profile)) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="brand.400" />
      </Center>
    );
  }

  if (!auth.isAuthenticated) return null;

  const user = auth.profile;

  return (
    <Box minH="100vh" bg="gray.50" py={10} px={4}>
      <Box
        maxW="500px"
        mx="auto"
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="xl"
      >
        <VStack spacing={6}>
          {/* PROFILE */}
          <Avatar
            size="xl"
            name={`${user.first_name} ${user.last_name}`}
            src={user.profile_picture}
          />

          <Text fontSize="2xl" fontWeight="bold">
            {user.first_name || "No Name"} {user.last_name}
          </Text>

          <Text fontSize="sm" color="gray.500">
            {user.email}
          </Text>

          <Text fontSize="sm">📞 {user.phone_number || "Not provided"}</Text>

          <Text fontSize="xs" color="gray.400">
            {user.profile_completed
              ? "Profile Completed ✅"
              : "Profile Incomplete ⚠️"}
          </Text>

          <Divider />

          {/* ADDRESS SECTION */}
          <VStack w="full" spacing={3}>
            <Text fontWeight="bold" alignSelf="flex-start">
              Addresses
            </Text>

            <HStack w="full">
              <Button
                colorScheme="purple"
                w="full"
                onClick={() => navigate("/addresses")}
              >
                Manage Addresses
              </Button>

              <Button
                variant="outline"
                w="full"
                onClick={() => navigate("/addresses")}
              >
                + Add Address
              </Button>
            </HStack>
          </VStack>

          <Divider />

          {/* ACTION BUTTONS */}
          <HStack spacing={4} pt={2}>
            <Button
              variant="outline"
              onClick={() => navigate("/complete-profile")}
            >
              Edit Profile
            </Button>

            <Button
              colorScheme="yellow"
              onClick={handleLogout}
              isLoading={auth.loadingLogout}
            >
              Logout
            </Button>

            <Button
              colorScheme="red"
              onClick={handleDelete}
              isLoading={auth.loadingDelete}
            >
              Delete
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
