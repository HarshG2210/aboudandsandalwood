import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <Box minH="100vh" bg="gray.900" color="white">
      <AdminNavbar />
      <Box>
        <Outlet />
      </Box>
      <AdminFooter />
    </Box>
  );
}
