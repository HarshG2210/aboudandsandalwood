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
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function VerifyForgotOtp() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  // TIMER
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // VERIFY OTP
  const handleVerify = async () => {
    console.log("VERIFY PAYLOAD:", { email, otp }); // ✅ ADD

    try {
      const res = await auth.verifyForgotOtp({
        email,
        otp,
      });

      console.log("VERIFY RESPONSE:", res); // ✅ ADD

      navigate(`/reset-password?email=${email}`);
    } catch (err) {
      console.error("OTP VERIFY ERROR:", err);
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
          <Text fontSize="2xl">Verify OTP</Text>

          <Text fontSize="sm">OTP sent to {email}</Text>

          <FormControl>
            <FormLabel>OTP</FormLabel>
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </FormControl>

          <Button
            w="full"
            onClick={handleVerify}
            isLoading={auth.loadingVerify}
          >
            Verify OTP
          </Button>

          <HStack>
            {timer > 0 ? (
              <Text fontSize="sm">Resend in {timer}s</Text>
            ) : (
              <Button size="sm" onClick={handleResend}>
                Resend OTP
              </Button>
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
