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

export default function ResetPassword() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [timer, setTimer] = useState(30);

  // ⏳ TIMER
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔐 RESET PASSWORD
  const handleReset = async () => {
    try {
      await auth.resetPassword({
        email,
        otp,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error("RESET ERROR:", err);
    }
  };

  // 🔁 RESEND OTP
  const handleResend = async () => {
    try {
      await auth.resendForgotOtp({ email });
      setTimer(30);
    } catch (err) {
      console.error("RESEND ERROR:", err);
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
          <Text fontSize="2xl">Reset Password</Text>

          <Text fontSize="sm" color="gray.500">
            OTP sent to {email}
          </Text>

          <FormControl>
            <FormLabel>OTP</FormLabel>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            variant="gold"
            w="full"
            onClick={handleReset}
            isLoading={auth.loadingReset}
          >
            Reset Password
          </Button>

          {/* 🔁 RESEND */}
          <HStack>
            <Text fontSize="sm">Didn’t receive OTP?</Text>

            {timer > 0 ? (
              <Text fontSize="sm" color="brand.400">
                Resend in {timer}s
              </Text>
            ) : (
              <Button
                size="sm"
                variant="outline_gold"
                onClick={handleResend}
                isLoading={auth.loadingResendForgotOtp}
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
