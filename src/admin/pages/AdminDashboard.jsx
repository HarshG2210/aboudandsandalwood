import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiBox,
  FiHome,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { path: "/admin/dashboard", label: "Dashboard", icon: FiHome },
    { path: "/admin/products", label: "Products", icon: FiBox },
    { path: "/admin/orders", label: "Orders", icon: FiShoppingCart },
    { path: "/admin/users", label: "Users", icon: FiUsers },
  ];

  return (
    <Flex h="100vh" bg="gray.100">
      {/* SIDEBAR */}
      <Box w="260px" bg="black" color="white" p={6}>
        <Text fontSize="2xl" mb={8} fontWeight="bold">
          Admin Panel
        </Text>

        <VStack align="stretch" spacing={3}>
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <HStack
                key={item.path}
                p={3}
                borderRadius="lg"
                cursor="pointer"
                bg={isActive ? "gold" : "transparent"}
                color={isActive ? "black" : "white"}
                _hover={{ bg: "gold", color: "black" }}
                onClick={() => navigate(item.path)}
              >
                <Icon as={item.icon} />
                <Text>{item.label}</Text>
              </HStack>
            );
          })}
        </VStack>
      </Box>

      {/* CONTENT */}
      <Box flex="1" p={8} overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
}