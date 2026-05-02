import { Box, Text } from "@chakra-ui/react";

export default function AdminFooter() {
  return (
    <Box textAlign="center" py={4} borderTop="1px solid #c9a84c">
      <Text fontSize="sm" color="gray.400">
        © {new Date().getFullYear()} Admin Panel
      </Text>
    </Box>
  );
}