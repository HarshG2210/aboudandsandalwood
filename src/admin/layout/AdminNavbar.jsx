import { Button, Flex, Text } from "@chakra-ui/react";

import { adminLogoutAsync } from "../store/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(adminLogoutAsync()).unwrap();

      // ✅ only if success
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Flex
      bg="black"
      color="gold"
      px={6}
      py={4}
      justify="space-between"
      align="center"
    >
      <Text fontSize="xl" fontWeight="bold">
        AB Oud and Sandalwood
      </Text>

      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
}
