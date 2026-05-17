import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await auth.forgotPassword({ email });
      navigate(`/verify-forgot-otp?email=${email}`);
    } catch (err) {
      console.error("FORGOT ERROR:", err);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="ivory"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg="white" p={10} borderRadius="xl" w="400px">
        <VStack spacing={6}>
          <Text fontSize="2xl">Forgot Password</Text>

          <FormControl isInvalid={error}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>

          <Button
            variant="gold"
            w="full"
            onClick={handleSubmit}
            isLoading={auth.loadingForgot}
          >
            Send OTP
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
