import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export default function ResetPassword() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const email = params.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    try {
      await auth.resetPassword({
        email,
        password,
        confirm_password: confirmPassword,
      });

      navigate("/login");
    } catch (err) {
      console.error("RESET ERROR:", err);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg="white" p={10} borderRadius="xl" w="400px">
        <VStack spacing={6}>
          <Text fontSize="2xl">Set New Password</Text>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button w="full" onClick={handleReset} isLoading={auth.loadingReset}>
            Reset Password
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
