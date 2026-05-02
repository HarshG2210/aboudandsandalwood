import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyOTP() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  // ================= TIMER =================
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ================= VERIFY =================
  const handleVerify = async () => {
    try {
      await auth.verifySignup({
        email,
        otp,
      });

      navigate("/"); // or /profile
    } catch (err) {
      console.error("VERIFY ERROR:", err);
    }
  };

  // ================= RESEND =================
  const handleResend = async () => {
    try {
      await auth.resendSignupOtp({ email });

      setTimer(30); // reset timer
    } catch (err) {
      console.error("RESEND ERROR:", err);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="ivory"
    >
      <Box
        bg="white"
        p={10}
        borderRadius="2xl"
        w="full"
        maxW="400px"
        boxShadow="lg"
      >
        <VStack spacing={6}>
          <Text fontSize="2xl">Verify OTP</Text>

          <Text fontSize="sm" color="gray.500">
            OTP sent to {email}
          </Text>

          <FormControl>
            <FormLabel>Enter OTP</FormLabel>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </FormControl>

          <Button
            variant="gold"
            w="full"
            onClick={handleVerify}
            isLoading={auth.loadingVerify}
          >
            Verify
          </Button>

          {/* 🔥 RESEND SECTION */}
          <HStack>
            <Text fontSize="sm" color="gray.500">
              Didn’t receive OTP?
            </Text>

            {timer > 0 ? (
              <Text fontSize="sm" color="brand.400">
                Resend in {timer}s
              </Text>
            ) : (
              <Button
                size="sm"
                variant="outline_gold"
                onClick={handleResend}
                isLoading={auth.loadingResendOtp}
              >
                Resend OTP
              </Button>
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
