import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const auth = useAuth();

  const bg = useColorModeValue("ivory", "gray.900");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= VALIDATION =================
  const validate = () => {
    const e = {};

    // email
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";

    // password
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Minimum 6 characters required";

    // confirm password
    if (!form.confirm) e.confirm = "Confirm your password";
    else if (form.confirm !== form.password)
      e.confirm = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ================= HANDLE =================

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await auth.signup({
        email: form.email,
        password: form.password,
        confirm_password: form.confirm,
      });

      // ✅ redirect to verify page with email
      navigate(`/verify?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      console.error("❌ REGISTER ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <Box
      minH="100vh"
      bg={bg}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="white"
        p={10}
        borderRadius="2xl"
        border="1px solid"
        borderColor="brand.100"
        w="full"
        maxW="420px"
        boxShadow="xl"
      >
        <VStack spacing={6}>
          {/* Heading */}
          <VStack spacing={1} textAlign="center">
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize="3xl"
              color="oud.900"
            >
              Create Account
            </Text>
            <Text fontSize="xs" color="oud.500">
              Join our luxury collection
            </Text>
          </VStack>

          {/* Email */}
          <FormControl isInvalid={errors.email}>
            <FormLabel fontSize="xs" textTransform="uppercase">
              Email
            </FormLabel>
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          {/* Password */}
          <FormControl isInvalid={errors.password}>
            <FormLabel fontSize="xs" textTransform="uppercase">
              Password
            </FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <InputRightElement>
                <IconButton
                  icon={show ? <FiEyeOff /> : <FiEye />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setShow(!show)}
                  aria-label="toggle password"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          {/* Confirm Password */}
          <FormControl isInvalid={errors.confirm}>
            <FormLabel fontSize="xs" textTransform="uppercase">
              Confirm Password
            </FormLabel>
            <Input
              type="password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
            <FormErrorMessage>{errors.confirm}</FormErrorMessage>
          </FormControl>

          {/* Submit */}
          <Button
            variant="gold"
            w="full"
            size="lg"
            onClick={handleSignup}
            isLoading={loading}
            loadingText="Creating..."
          >
            Create Account
          </Button>

          {/* Footer */}

          <Text fontSize="xs">
            Already have an account?{" "}
            <span
              style={{ color: "#B8882F", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
